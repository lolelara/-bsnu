// --- Appwrite Setup ---
const { Client, Databases, ID } = Appwrite;
let client, databases;
let appwriteConfig = {
    endpoint: '',
    projectId: '',
    databaseId: '',
    collectionId: ''
};

// --- Data Section ---
let currentTopic = null;
let currentLeafletContent = "";
let currentLeafletData = null;
let audioPlayer = new Audio();

const students = [
    { serial: 1, name: "ابتسام أحمد محمود علي", seatNo: "233001" },
    { serial: 2, name: "احمد سالم ابراهيم محمد سالم", seatNo: "220038" },
    { serial: 3, name: "احمد صابر عشري عبد المولى", seatNo: "223006" },
    { serial: 4, name: "احمد طارق محمد عبد الوهاب", seatNo: "223007" },
    { serial: 5, name: "احمد محسن احمد عبد الرحمن", seatNo: "223010" },
    { serial: 145, name: "آية سمير أحمد طه", seatNo: "230124" },
    // ... Add more students here
];

const groups = [
    { group: 1, start: 1, end: 35 },
    { group: 2, start: 36, end: 70 },
    { group: 3, start: 71, end: 105 },
    { group: 4, start: 106, end: 140 },
    { group: 5, start: 141, end: 175 },
    { group: 6, start: 176, end: 210 },
    { group: 7, start: 211, end: 245 },
    { group: 8, start: 246, end: 280 },
    { group: 9, start: 281, end: 315 },
    { group: 10, start: 316, end: 350 },
    { group: 11, start: 351, end: 385 },
    { group: 12, start: 386, end: 420 },
    { group: 13, start: 421, end: 455 },
    { group: 14, start: 456, end: 490 },
    { group: 15, start: 491, end: 525 },
    { group: 16, start: 526, end: 560 },
    { group: 17, start: 561, end: 595 },
    { group: 18, start: 596, end: 630 },
    { group: 19, start: 631, end: 644 }
];

const topics = {
    1: { 
        title: "Antenatal Care", 
        focus: "What Every Mother Should Know", 
        image_prompt: "High-quality photo of a smiling, professional female doctor of Middle Eastern descent talking to a pregnant woman in a bright, modern, and clean clinic.", 
        icon_prompt: "A simple, minimalist, flat icon of a pregnant woman's silhouette inside a heart. Single calm blue color on a transparent background. Vector style.", 
        system_prompt: "You are a medical content writer. Create structured HTML content for a 3-column leaflet about Antenatal Care. Column 1 (Inner Flap): Start with <h3>What is Antenatal Care?</h3>, followed by a <p> explaining its definition and relevance to PHC. Column 2 (Back Panel): Use <h3>Key Aspects of Your Care</h3>, then list 3-4 points using <h4>subheadings</h4> and <p> for explanations (e.g., 'Regular Check-ups', 'Nutrition Counseling'). Column 3 (Front Panel): Use <h3>Antenatal Care in Egypt</h3>, describe PHC examples in a <p>, and end with a <h4>What Should You Do?</h4> subheading and a final <p> call to action. Use simple, clear English." 
    },
    2: { 
        title: "Danger Signs in Pregnancy", 
        focus: "When to Seek Help", 
        image_prompt: "High-quality illustration of a concerned pregnant woman looking at a checklist, with a helpful nurse pointing to it. Warm, supportive, and clear style.", 
        icon_prompt: "A simple, minimalist, flat icon of a warning sign with a heart inside. Single calm blue color on a transparent background. Vector style.", 
        system_prompt: "You are a medical content writer. Create structured HTML content for a 3-column leaflet about Danger Signs in Pregnancy. Column 1 (Inner Flap): Start with <h3>Why is this Important?</h3>, followed by a <p> on relevance to PHC. Column 2 (Back Panel): Use <h3>Recognize These Signs</h3>, then a <ul> with <li> for each key danger sign. Column 3 (Front Panel): Use <h3>Immediate Help in Egypt</h3>, describe PHC examples in a <p>, and end with a <h4>When to Seek Help</h4> subheading and a final <p> call to action. Use simple, clear English." 
    },
    3: { 
        title: "Physical Activity Promotion in PHC", 
        focus: "Your Guide to a Healthier Lifestyle", 
        image_prompt: "A vibrant, high-quality photo of a diverse group of people (all ages, genders) joyfully exercising outdoors in a sunny park.", 
        icon_prompt: "A simple, minimalist, flat icon of a running shoe with a small heart. Single calm blue color on a transparent background. Vector style.", 
        system_prompt: "You are a medical writer. Create structured HTML for a 3-fold leaflet. Column 1 (Inner flap): Use <h3>What is Physical Activity?</h3> and a <p> defining it and its PHC importance. Column 2 (Back panel): Use <h3>Benefits & Types</h3>, then two <h4> sections for 'Health Benefits' and 'Types of Exercise' with <p> or <ul>. Column 3 (Front panel): Use <h3>Activity Programs in Egypt</h3>, a <p> with examples, and a <h4>Get Started Today!</h4> call to action. Use simple English." 
    }
};

// --- Appwrite Functions ---
function initializeAppwrite() {
    const savedConfig = localStorage.getItem('appwriteConfig');
    if (savedConfig) {
        appwriteConfig = JSON.parse(savedConfig);
        document.getElementById('appwriteEndpoint').value = appwriteConfig.endpoint;
        document.getElementById('appwriteProject').value = appwriteConfig.projectId;
        document.getElementById('appwriteDatabase').value = appwriteConfig.databaseId;
        document.getElementById('appwriteCollection').value = appwriteConfig.collectionId;
        
        if (appwriteConfig.projectId) {
            client = new Client()
                .setEndpoint(appwriteConfig.endpoint)
                .setProject(appwriteConfig.projectId);
            
            databases = new Databases(client);
            showMessage('config-message', '✅ تم تحميل إعدادات Appwrite المحفوظة', 'success');
            document.getElementById('saved-leaflets').classList.remove('hidden');
        }
    }
}

function saveAppwriteConfig() {
    appwriteConfig.endpoint = document.getElementById('appwriteEndpoint').value.trim();
    appwriteConfig.projectId = document.getElementById('appwriteProject').value.trim();
    appwriteConfig.databaseId = document.getElementById('appwriteDatabase').value.trim();
    appwriteConfig.collectionId = document.getElementById('appwriteCollection').value.trim();
    
    if (!appwriteConfig.projectId || !appwriteConfig.databaseId || !appwriteConfig.collectionId) {
        showMessage('config-message', '❌ الرجاء ملء جميع الحقول', 'error');
        return;
    }
    
    localStorage.setItem('appwriteConfig', JSON.stringify(appwriteConfig));
    
    client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);
    
    databases = new Databases(client);
    
    showMessage('config-message', '✅ تم حفظ الإعدادات بنجاح!', 'success');
    document.getElementById('saved-leaflets').classList.remove('hidden');
}

async function saveLeafletToAppwrite() {
    if (!databases) {
        showMessage('save-message', '❌ يرجى إعداد Appwrite أولاً', 'error');
        return;
    }
    
    if (!currentLeafletData) {
        showMessage('save-message', '❌ لا توجد مطوية لحفظها', 'error');
        return;
    }
    
    try {
        showMessage('save-message', '⏳ جاري الحفظ...', 'info');
        
        const document = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            ID.unique(),
            {
                studentSerial: currentLeafletData.serial,
                studentName: currentLeafletData.studentName,
                studentSeatNo: currentLeafletData.seatNo,
                topicTitle: currentLeafletData.topicTitle,
                topicGroup: currentLeafletData.group,
                content: JSON.stringify(currentLeafletData.content),
                theme: currentLeafletData.theme || 'theme-1',
                createdAt: new Date().toISOString()
            }
        );
        
        showMessage('save-message', '✅ تم حفظ المطوية في Appwrite بنجاح!', 'success');
    } catch (error) {
        console.error('Error saving to Appwrite:', error);
        showMessage('save-message', `❌ خطأ في الحفظ: ${error.message}`, 'error');
    }
}

async function loadSavedLeaflets() {
    if (!databases) {
        showMessage('save-message', '❌ يرجى إعداد Appwrite أولاً', 'error');
        return;
    }
    
    try {
        const savedList = document.getElementById('saved-list');
        savedList.innerHTML = '<div class="loader mx-auto"></div>';
        
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId
        );
        
        savedList.innerHTML = '';
        
        if (response.documents.length === 0) {
            savedList.innerHTML = '<p class="text-gray-500 text-center">لا توجد مطويات محفوظة</p>';
            return;
        }
        
        response.documents.forEach(doc => {
            const item = document.createElement('div');
            item.className = 'saved-item';
            item.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-sky-800">${doc.topicTitle}</h4>
                        <p class="text-sm text-gray-600">${doc.studentName} - الرقم التسلسلي: ${doc.studentSerial}</p>
                        <p class="text-xs text-gray-400">${new Date(doc.createdAt).toLocaleString('ar-EG')}</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="loadLeaflet('${doc.$id}')" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            📂 تحميل
                        </button>
                        <button onclick="deleteLeaflet('${doc.$id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            🗑️ حذف
                        </button>
                    </div>
                </div>
            `;
            savedList.appendChild(item);
        });
        
    } catch (error) {
        console.error('Error loading leaflets:', error);
        document.getElementById('saved-list').innerHTML = 
            `<p class="text-red-500 text-center">❌ خطأ في التحميل: ${error.message}</p>`;
    }
}

async function loadLeaflet(documentId) {
    if (!databases) return;
    
    try {
        const doc = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            documentId
        );
        
        const content = JSON.parse(doc.content);
        
        // Recreate the leaflet
        const leafletHTML = `
            <div class="leaflet-container max-w-7xl mx-auto border border-gray-200 rounded-lg">
                <div class="leaflet-content-wrapper p-4">
                    <div class="text-center pb-4 border-b-2 border-gray-100 mb-4">
                        <h2 class="text-2xl font-bold text-sky-800">${doc.topicTitle}</h2>
                        <p class="text-md text-gray-600">${topics[doc.topicGroup]?.focus || ''}</p>
                    </div>
                    <div class="flex flex-wrap justify-between items-center text-sm bg-gray-50 p-3 rounded-md mb-4 text-gray-700 gap-2">
                        <span><strong>الطالب:</strong> ${doc.studentName}</span>
                        <span><strong>الرقم التسلسلي:</strong> ${doc.studentSerial}</span>
                        <span><strong>رقم الجلوس:</strong> ${doc.studentSeatNo}</span>
                        <span><strong>المجموعة:</strong> ${doc.topicGroup}</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 leaflet-content">
                        <div id="content-col-3" class="leaflet-section">${content.col3}</div>
                        <div class="leaflet-section">
                            <div id="image-container" class="mb-4 rounded-lg overflow-hidden">
                                ${content.image ? `<img src="${content.image}" alt="${doc.topicTitle}" class="w-full h-auto object-cover rounded-md shadow-md">` : '<p class="text-gray-400">لا توجد صورة</p>'}
                            </div>
                            <div id="content-col-2">${content.col2}</div>
                        </div>
                        <div id="content-col-1" class="leaflet-section">${content.col1}</div>
                    </div>
                </div>
            </div>`;
        
        const leafletOutput = document.getElementById('leafletOutput');
        leafletOutput.innerHTML = leafletHTML;
        leafletOutput.className = doc.theme || 'theme-1';
        leafletOutput.classList.remove('hidden');
        
        document.getElementById('print-controls').classList.remove('hidden');
        document.getElementById('ai-tools-container').classList.remove('hidden');
        document.getElementById('theme-selector-container').classList.remove('hidden');
        
        // Update current data
        currentLeafletData = {
            serial: doc.studentSerial,
            studentName: doc.studentName,
            seatNo: doc.studentSeatNo,
            topicTitle: doc.topicTitle,
            group: doc.topicGroup,
            content: content,
            theme: doc.theme
        };
        
        showMessage('save-message', '✅ تم تحميل المطوية بنجاح!', 'success');
        
        // Scroll to leaflet
        leafletOutput.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading leaflet:', error);
        showMessage('save-message', `❌ خطأ في التحميل: ${error.message}`, 'error');
    }
}

async function deleteLeaflet(documentId) {
    if (!databases) return;
    
    if (!confirm('هل أنت متأكد من حذف هذه المطوية؟')) {
        return;
    }
    
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            documentId
        );
        
        loadSavedLeaflets();
        showMessage('save-message', '✅ تم حذف المطوية بنجاح!', 'success');
    } catch (error) {
        console.error('Error deleting leaflet:', error);
        showMessage('save-message', `❌ خطأ في الحذف: ${error.message}`, 'error');
    }
}

// --- Helper Functions ---
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    const className = type === 'success' ? 'success-message' : 
                     type === 'error' ? 'text-red-500 mt-4 text-center font-semibold' : 
                     'text-blue-500 mt-4 text-center font-semibold';
    element.className = className;
    element.textContent = message;
    
    if (type === 'success') {
        setTimeout(() => {
            element.textContent = '';
            element.className = '';
        }, 5000);
    }
}

function findStudent(serial) {
    return students.find(s => s.serial == serial) || null;
}

function findGroupAndTopic(serial) {
    const groupInfo = groups.find(g => serial >= g.start && serial <= g.end);
    if (!groupInfo) return null;
    currentTopic = topics[groupInfo.group] || topics[1];
    return { group: groupInfo.group, topic: currentTopic };
}

function setLoading(isLoading, text = 'جاري التوليد...') {
    const generateButton = document.getElementById('generateButton');
    generateButton.disabled = isLoading;
    document.getElementById('button-text').textContent = isLoading ? text : 'توليد المطوية';
    document.getElementById('button-spinner').classList.toggle('hidden', !isLoading);
}

// --- Gemini API Functions ---
async function callGeminiAPI(payload, model = 'gemini-2.5-flash-preview-05-20') {
    const apiKey = ""; // Add your Gemini API key here
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            console.error("API Error:", response.status, await response.text());
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}

async function generateTextContent(topic) {
    const payload = {
        contents: [{
            parts: [{ text: `Generate leaflet content for the topic: ${topic.title}` }]
        }],
        systemInstruction: {
            parts: [{ text: topic.system_prompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    col1: { type: "STRING" },
                    col2: { type: "STRING" },
                    col3: { type: "STRING" }
                },
                required: ["col1", "col2", "col3"]
            }
        }
    };
    
    const result = await callGeminiAPI(payload);
    const resultText = result?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    
    try {
        const parsedResult = JSON.parse(resultText);
        currentLeafletContent = `Title: ${topic.title}\n\n${parsedResult.col1}\n\n${parsedResult.col2}\n\n${parsedResult.col3}`;
        return parsedResult;
    } catch (e) {
        console.error("Error parsing LLM response:", e);
        return {
            col1: "<p>Error loading content.</p>",
            col2: "<p>Please try again.</p>",
            col3: ""
        };
    }
}

async function generateImage(prompt) {
    try {
        const apiKey = ""; // Add your Gemini API key here
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
        const payload = {
            instances: [{ prompt: prompt }],
            parameters: { "sampleCount": 1 }
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            console.error("API Error:", response.status, await response.text());
            return null;
        }
        
        const result = await response.json();
        return result.predictions && result.predictions[0]?.bytesBase64Encoded 
            ? `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}` 
            : null;
    } catch (error) {
        console.error("Failed to generate image:", error);
        return null;
    }
}

// --- Theme Setup ---
function setupThemeSelector() {
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.innerHTML = '';
    
    const themeColors = {
        'theme-1': 'linear-gradient(135deg, #e0f2fe, #f0fdf4)',
        'theme-2': '#fffbeb',
        'theme-3': '#f9fafb',
        'theme-4': '#f0fdf4',
        'theme-5': '#1f2937'
    };
    
    for (let i = 1; i <= 5; i++) {
        const themeId = `theme-${i}`;
        const button = document.createElement('button');
        button.className = 'theme-preview';
        if (i === 1) button.classList.add('active');
        button.dataset.theme = themeId;
        button.style.background = themeColors[themeId];
        themeSelector.appendChild(button);
    }
}

// --- Main Generation Function ---
async function generateLeaflet() {
    const leafletOutput = document.getElementById('leafletOutput');
    const printControls = document.getElementById('print-controls');
    const aiToolsContainer = document.getElementById('ai-tools-container');
    const errorMessage = document.getElementById('error-message');
    const themeSelectorContainer = document.getElementById('theme-selector-container');
    
    leafletOutput.innerHTML = '';
    leafletOutput.classList.add('hidden');
    printControls.classList.add('hidden');
    aiToolsContainer.classList.add('hidden');
    errorMessage.textContent = '';
    themeSelectorContainer.classList.add('hidden');
    
    const serial = parseInt(document.getElementById('serialNumber').value, 10);
    if (isNaN(serial) || serial < 1 || serial > 644) {
        errorMessage.textContent = 'الرجاء إدخال رقم تسلسلي صحيح بين 1 و 644.';
        return;
    }
    
    setLoading(true);
    
    const student = findStudent(serial);
    if (!student) {
        errorMessage.textContent = 'لم يتم العثور على طالب بهذا الرقم التسلسلي.';
        setLoading(false);
        return;
    }
    
    const assignment = findGroupAndTopic(serial);
    if (!assignment) {
        errorMessage.textContent = 'لا يمكن العثور على مجموعة لهذا الرقم التسلسلي.';
        setLoading(false);
        return;
    }
    
    const { title, focus, image_prompt, icon_prompt } = assignment.topic;
    
    leafletOutput.className = 'theme-1';
    const leafletHTML = `
        <div class="leaflet-container max-w-7xl mx-auto border border-gray-200 rounded-lg">
            <div class="leaflet-content-wrapper p-4">
                <div class="text-center pb-4 border-b-2 border-gray-100 mb-4">
                    <h2 class="text-2xl font-bold text-sky-800">${title}</h2>
                    <p class="text-md text-gray-600">${focus}</p>
                </div>
                <div class="flex flex-wrap justify-between items-center text-sm bg-gray-50 p-3 rounded-md mb-4 text-gray-700 gap-2">
                    <span><strong>الطالب:</strong> ${student.name}</span>
                    <span><strong>الرقم التسلسلي:</strong> ${serial}</span>
                    <span><strong>رقم الجلوس:</strong> ${student.seatNo}</span>
                    <span><strong>المجموعة:</strong> ${assignment.group}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 leaflet-content">
                    <div id="content-col-3" class="leaflet-section placeholder"><div class="loader"></div></div>
                    <div class="leaflet-section">
                        <div id="image-container" class="mb-4 rounded-lg overflow-hidden placeholder"><div class="loader"></div></div>
                        <div id="content-col-2"><div class="loader mx-auto"></div></div>
                    </div>
                    <div id="content-col-1" class="leaflet-section placeholder"><div class="loader"></div></div>
                </div>
            </div>
        </div>`;
    
    leafletOutput.innerHTML = leafletHTML;
    leafletOutput.classList.remove('hidden');
    
    const [textContent, imageUrl, iconUrl] = await Promise.all([
        generateTextContent(assignment.topic),
        generateImage(image_prompt),
        generateImage(icon_prompt)
    ]);
    
    updateTextContent(textContent);
    updateImage(imageUrl, title);
    updateIcons(iconUrl, title);
    
    // Store current leaflet data
    currentLeafletData = {
        serial: serial,
        studentName: student.name,
        seatNo: student.seatNo,
        topicTitle: title,
        group: assignment.group,
        content: {
            col1: textContent.col1,
            col2: textContent.col2,
            col3: textContent.col3,
            image: imageUrl
        },
        theme: 'theme-1'
    };
    
    document.querySelectorAll('.theme-preview').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.theme-preview[data-theme="theme-1"]')?.classList.add('active');
    
    printControls.classList.remove('hidden');
    aiToolsContainer.classList.remove('hidden');
    themeSelectorContainer.classList.remove('hidden');
    setLoading(false);
}

function updateTextContent(content) {
    const col1 = document.getElementById('content-col-1');
    const col2 = document.getElementById('content-col-2');
    const col3 = document.getElementById('content-col-3');
    
    col1.innerHTML = content.col1;
    col2.innerHTML = content.col2;
    col3.innerHTML = content.col3;
    
    col1.classList.remove('placeholder');
    col3.classList.remove('placeholder');
}

function updateImage(url, title) {
    const imageContainer = document.getElementById('image-container');
    if (url) {
        imageContainer.innerHTML = `<img src="${url}" alt="${title}" class="w-full h-auto object-cover rounded-md shadow-md">`;
        imageContainer.classList.remove('placeholder');
    } else {
        imageContainer.innerHTML = `<p class="text-red-500 text-center p-4">لا يمكن تحميل الصورة.</p>`;
    }
}

function updateIcons(url, title) {
    const headerIcon = document.getElementById('header-icon-container');
    const aiToolsIcon = document.getElementById('ai-tools-icon-container');
    
    if (url) {
        const iconHTML = `<img src="${url}" alt="${title} icon" class="w-full h-full object-contain">`;
        headerIcon.innerHTML = iconHTML;
        aiToolsIcon.innerHTML = iconHTML;
    } else {
        const loaderHTML = `<div class="loader loader-sm"></div>`;
        headerIcon.innerHTML = loaderHTML;
        aiToolsIcon.innerHTML = loaderHTML;
    }
}

// --- PDF Download Function ---
function downloadPDF() {
    const element = document.querySelector('#leafletOutput .leaflet-container');
    const student = students.find(s => s.serial == document.getElementById('serialNumber').value);
    const studentName = student?.name || 'student';
    const filename = `${currentTopic.title.replace(/ /g, '_')}_${studentName.replace(/ /g, '_')}.pdf`;
    
    const opt = {
        margin: 0.5,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().from(element).set(opt).save();
}

// --- Audio Functions ---
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const pcmToWav = (pcmData, sampleRate) => {
    const numChannels = 1;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmData.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    
    view.setUint32(0, 0x52494646, false);
    view.setUint32(4, 36 + dataSize, true);
    view.setUint32(8, 0x57415645, false);
    view.setUint32(12, 0x666d7420, false);
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    view.setUint32(36, 0x64617461, false);
    view.setUint32(40, dataSize, true);
    
    const pcm16 = new Int16Array(pcmData);
    for (let i = 0; i < pcm16.length; i++) {
        view.setInt16(44 + i * 2, pcm16[i], true);
    }
    
    return new Blob([view], { type: "audio/wav" });
};

function setListenButtonState(state) {
    const listenBtn = document.getElementById('listenBtn');
    const listenSpinner = document.getElementById('listen-spinner');
    const listenBtnText = document.getElementById('listen-btn-text');
    
    listenBtn.disabled = (state === 'loading' || state === 'playing');
    listenSpinner.classList.toggle('hidden', state !== 'loading');
    
    switch(state) {
        case 'playing':
            listenBtnText.textContent = 'جاري التشغيل...';
            break;
        case 'loading':
            listenBtnText.textContent = 'جاري التوليد...';
            break;
        case 'error':
            listenBtnText.textContent = 'خطأ';
            break;
        default:
            listenBtnText.textContent = 'الاستماع للمطوية';
            break;
    }
}

async function playLeafletAudio() {
    if (audioPlayer.paused === false) {
        audioPlayer.pause();
        return;
    }
    
    setListenButtonState('loading');
    
    const fullText = [
        document.getElementById('content-col-1').innerText,
        document.getElementById('content-col-2').innerText,
        document.getElementById('content-col-3').innerText
    ].join('\n\n');
    
    const payload = {
        contents: [{
            parts: [{ text: `Read the following health information clearly and warmly: ${fullText}` }]
        }],
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        voiceName: "Puck"
                    }
                }
            }
        }
    };
    
    const result = await callGeminiAPI(payload, 'gemini-2.5-flash-preview-tts');
    const part = result?.candidates?.[0]?.content?.parts?.[0];
    const audioData = part?.inlineData?.data;
    const mimeType = part?.inlineData?.mimeType;
    
    if (audioData && mimeType?.startsWith("audio/")) {
        const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
        const pcmData = base64ToArrayBuffer(audioData);
        const pcm16 = new Int16Array(pcmData);
        const wavBlob = pcmToWav(pcm16, sampleRate);
        const audioUrl = URL.createObjectURL(wavBlob);
        
        audioPlayer.src = audioUrl;
        audioPlayer.play();
        setListenButtonState('playing');
    } else {
        console.error("TTS Error: No audio data received", result);
        setListenButtonState('error');
        setTimeout(() => setListenButtonState('idle'), 2000);
    }
}

// --- AI Tools ---
async function runAiTool(prompt, title) {
    const modal = document.getElementById('ai-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = '<div class="loader mx-auto"></div>';
    modal.classList.remove('hidden');
    
    const payload = {
        contents: [{
            parts: [{ text: `${prompt}:\n\n${currentLeafletContent}` }]
        }]
    };
    
    const result = await callGeminiAPI(payload);
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
        modalBody.innerHTML = text.replace(/\n/g, '<br>');
    } else {
        modalBody.textContent = "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.";
    }
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', function() {
    initializeAppwrite();
    setupThemeSelector();
    
    // Appwrite Config
    document.getElementById('saveConfigBtn').addEventListener('click', saveAppwriteConfig);
    
    // Generate Leaflet
    document.getElementById('generateButton').addEventListener('click', generateLeaflet);
    document.getElementById('serialNumber').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') generateLeaflet();
    });
    
    // Save to Appwrite
    document.getElementById('saveToAppwriteBtn').addEventListener('click', saveLeafletToAppwrite);
    
    // Load Saved Leaflets
    document.getElementById('loadSavedBtn').addEventListener('click', loadSavedLeaflets);
    
    // Regenerate Content
    document.getElementById('regenerateContentBtn').addEventListener('click', async () => {
        const cols = ['content-col-1', 'content-col-2', 'content-col-3'];
        cols.forEach(id => {
            const el = document.getElementById(id);
            el.innerHTML = id === 'content-col-2' ? '<div class="loader mx-auto"></div>' : '<div class="loader"></div>';
            if (id !== 'content-col-2') el.classList.add('placeholder');
        });
        
        const newContent = await generateTextContent(currentTopic);
        updateTextContent(newContent);
        
        // Update current data
        if (currentLeafletData) {
            currentLeafletData.content.col1 = newContent.col1;
            currentLeafletData.content.col2 = newContent.col2;
            currentLeafletData.content.col3 = newContent.col3;
        }
    });
    
    // Regenerate Image
    document.getElementById('regenerateImageBtn').addEventListener('click', async () => {
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '<div class="loader"></div>';
        imageContainer.classList.add('placeholder');
        
        const newUrl = await generateImage(currentTopic.image_prompt);
        updateImage(newUrl, currentTopic.title);
        
        // Update current data
        if (currentLeafletData) {
            currentLeafletData.content.image = newUrl;
        }
    });
    
    // AI Tools
    document.getElementById('simplifyContentBtn').addEventListener('click', () => {
        runAiTool(
            "Simplify the following medical text for a general audience without a medical background. Keep the core information accurate. Respond in clear, simple paragraphs.",
            "المحتوى المبسط"
        );
    });
    
    document.getElementById('generatePointsBtn').addEventListener('click', () => {
        runAiTool(
            "Summarize the following text into 3-4 key bullet points for a health leaflet. Start each point with a *. Be concise and impactful.",
            "النقاط الرئيسية"
        );
    });
    
    document.getElementById('listenBtn').addEventListener('click', playLeafletAudio);
    
    // Audio Player Events
    audioPlayer.addEventListener('ended', () => setListenButtonState('idle'));
    audioPlayer.addEventListener('pause', () => {
        audioPlayer.currentTime = 0;
        setListenButtonState('idle');
    });
    
    // Theme Selector
    document.getElementById('theme-selector').addEventListener('click', (e) => {
        const themeButton = e.target.closest('[data-theme]');
        if (themeButton) {
            const theme = themeButton.dataset.theme;
            const leafletWrapper = document.getElementById('leafletOutput');
            leafletWrapper.className = leafletWrapper.className.replace(/\btheme-\S+/g, '');
            leafletWrapper.classList.add(theme);
            
            document.querySelectorAll('.theme-preview').forEach(btn => btn.classList.remove('active'));
            themeButton.classList.add('active');
            
            // Update current data
            if (currentLeafletData) {
                currentLeafletData.theme = theme;
            }
        }
    });
    
    // Download PDF
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
    
    // Modal
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('ai-modal').classList.add('hidden');
    });
    
    document.getElementById('ai-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('ai-modal')) {
            document.getElementById('ai-modal').classList.add('hidden');
        }
    });
});

// Make functions globally accessible
window.loadLeaflet = loadLeaflet;
window.deleteLeaflet = deleteLeaflet;


// ============================================
// PHC LEAFLET GENERATOR - MAIN APPLICATION
// BSNU 3rd Year - AI-Powered Leaflet System
// ============================================

// Global State
let appState = {
    geminiApiKey: '',
    appwriteClient: null,
    appwriteDb: null,
    appwriteConfig: {
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: '',
        databaseId: '',
        collectionId: ''
    },
    currentTemplate: 1,
    currentStudent: null,
    currentTopic: null,
    currentLeafletData: null,
    generatedContent: '',
    generatedImage: ''
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadSavedConfiguration();
    initializeEventListeners();
});

function loadSavedConfiguration() {
    const saved = localStorage.getItem('phc_config');
    if (saved) {
        const config = JSON.parse(saved);
        appState.geminiApiKey = config.geminiApiKey || '';
        appState.appwriteConfig = { ...appState.appwriteConfig, ...config.appwrite };
        
        // Populate form fields
        document.getElementById('geminiApiKey').value = appState.geminiApiKey;
        document.getElementById('appwriteEndpoint').value = appState.appwriteConfig.endpoint;
        document.getElementById('appwriteProject').value = appState.appwriteConfig.projectId;
        document.getElementById('appwriteDatabase').value = appState.appwriteConfig.databaseId;
        document.getElementById('appwriteCollection').value = appState.appwriteConfig.collectionId;
        
        // Initialize Appwrite if config exists
        if (appState.appwriteConfig.projectId) {
            initializeAppwrite();
        }
        
        showMessage('config-message', 'Configuration loaded from previous session', 'success');
    }
}

function saveConfiguration() {
    const apiKey = document.getElementById('geminiApiKey').value.trim();
    const endpoint = document.getElementById('appwriteEndpoint').value.trim();
    const projectId = document.getElementById('appwriteProject').value.trim();
    const databaseId = document.getElementById('appwriteDatabase').value.trim();
    const collectionId = document.getElementById('appwriteCollection').value.trim();
    
    if (!apiKey) {
        showMessage('config-message', 'Please enter Gemini API key', 'error');
        return;
    }
    
    appState.geminiApiKey = apiKey;
    appState.appwriteConfig = {
        endpoint,
        projectId,
        databaseId,
        collectionId
    };
    
    const config = {
        geminiApiKey: apiKey,
        appwrite: {
            endpoint,
            projectId,
            databaseId,
            collectionId
        }
    };
    
    localStorage.setItem('phc_config', JSON.stringify(config));
    
    if (projectId) {
        initializeAppwrite();
        document.getElementById('savedLeafletsSection').classList.remove('hidden');
    }
    
    showMessage('config-message', 'Configuration saved successfully!', 'success');
}

function initializeAppwrite() {
    const { Client, Databases } = Appwrite;
    appState.appwriteClient = new Client()
        .setEndpoint(appState.appwriteConfig.endpoint)
        .setProject(appState.appwriteConfig.projectId);
    
    appState.appwriteDb = new Databases(appState.appwriteClient);
}

function initializeEventListeners() {
    document.getElementById('studentSerial').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadStudentInfo();
        }
    });
}

// ============================================
// STUDENT DATA MANAGEMENT
// ============================================

function loadStudentInfo() {
    const serial = parseInt(document.getElementById('studentSerial').value);
    
    if (!serial || serial < 1 || serial > 644) {
        showError('Please enter a valid serial number between 1 and 644');
        return;
    }
    
    // Find student
    let student = studentsData.find(s => s.serial === serial);
    if (!student) {
        // Generate placeholder if student not in database
        const groupInfo = findGroupForSerial(serial);
        student = {
            serial: serial,
            name: `Student ${serial}`,
            seatNo: `23${3000 + serial}`,
            group: groupInfo.group
        };
    }
    
    // Find group and topic
    const groupInfo = findGroupForSerial(serial);
    const topic = topics[groupInfo.topic];
    
    // Update state
    appState.currentStudent = student;
    appState.currentTopic = topic;
    
    // Update form fields
    document.getElementById('studentName').value = student.name;
    document.getElementById('seatNumber').value = student.seatNo;
    document.getElementById('groupNumber').value = groupInfo.group;
    document.getElementById('topicTitle').value = topic.title;
    
    // Clear error if any
    hideError();
}

function findGroupForSerial(serial) {
    for (const range of groupRanges) {
        if (serial >= range.start && serial <= range.end) {
            return range;
        }
    }
    return groupRanges[0]; // Default fallback
}

// ============================================
// TEMPLATE SELECTION
// ============================================

function selectTemplate(templateNum) {
    appState.currentTemplate = templateNum;
    
    // Update UI
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-template="${templateNum}"]`).classList.add('active');
}

// ============================================
// GEMINI API INTEGRATION
// ============================================

async function callGeminiAPI(prompt, systemPrompt = '', model = 'gemini-1.5-flash') {
    if (!appState.geminiApiKey) {
        throw new Error('Gemini API key not configured');
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${appState.geminiApiKey}`;
    
    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };
    
    if (systemPrompt) {
        payload.systemInstruction = {
            parts: [{ text: systemPrompt }]
        };
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

async function generateTextContent(topic, focusPoints = '') {
    let prompt = topic.contentPrompt;
    
    if (focusPoints) {
        prompt += `\n\nIMPORTANT: Please emphasize and focus on these specific aspects: ${focusPoints}`;
    }
    
    const systemPrompt = `You are a medical content writer specializing in Primary Health Care education. 
Create clear, evidence-based, patient-friendly content for health leaflets. 
Use proper HTML formatting with headings (h3, h4), paragraphs (p), lists (ul/ol), and emphasis where appropriate.
Keep content concise but comprehensive. Use simple English that non-medical audiences can understand.`;
    
    const content = await callGeminiAPI(prompt, systemPrompt);
    appState.generatedContent = content;
    return content;
}

async function generateImage(imagePrompt) {
    // Note: Gemini Image generation (Imagen) requires different API endpoint and may have different availability
    // For now, we'll use a placeholder. In production, integrate with actual image generation API
    
    // Attempt to use Imagen API
    try {
        if (!appState.geminiApiKey) {
            throw new Error('API key not configured');
        }
        
        // Placeholder - actual Imagen integration would go here
        // For demonstration, we'll use a text-to-image description prompt with Gemini
        const prompt = `Generate a detailed description for a medical illustration: ${imagePrompt}. Make it vivid and detailed.`;
        const description = await callGeminiAPI(prompt);
        
        // In production, pass this to Imagen or another image generation service
        // For now, return a placeholder
        return createPlaceholderImage(imagePrompt);
        
    } catch (error) {
        console.error('Image generation error:', error);
        return createPlaceholderImage(imagePrompt);
    }
}

function createPlaceholderImage(prompt) {
    // Create SVG placeholder
    const svg = `
        <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="800" height="500" fill="url(#grad)"/>
            <text x="400" y="230" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">
                ${prompt.substring(0, 80)}
            </text>
            <text x="400" y="270" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" opacity="0.8">
                AI-Generated Medical Illustration
            </text>
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ============================================
// LEAFLET GENERATION
// ============================================

async function generateLeaflet() {
    if (!appState.geminiApiKey) {
        showError('Please configure your Gemini API key first');
        return;
    }
    
    if (!appState.currentStudent || !appState.currentTopic) {
        showError('Please enter a valid student serial number first');
        return;
    }
    
    setGenerating(true);
    hideError();
    
    try {
        // Generate content and image in parallel
        const [content, imageUrl] = await Promise.all([
            generateTextContent(appState.currentTopic),
            generateImage(appState.currentTopic.imagePrompt)
        ]);
        
        appState.generatedImage = imageUrl;
        appState.currentLeafletData = {
            student: appState.currentStudent,
            topic: appState.currentTopic,
            content: content,
            image: imageUrl,
            template: appState.currentTemplate,
            generatedAt: new Date().toISOString()
        };
        
        renderLeaflet();
        
    } catch (error) {
        console.error('Generation error:', error);
        showError('Failed to generate leaflet: ' + error.message);
    } finally {
        setGenerating(false);
    }
}

function renderLeaflet() {
    const data = appState.currentLeafletData;
    const container = document.getElementById('leafletContainer');
    
    const html = `
        <div class="leaflet-header">
            <h2>${data.topic.title}</h2>
            <p class="subtitle">${data.topic.subtitle}</p>
        </div>
        
        <div class="student-info">
            <div class="student-info-item">
                <i class="fas fa-user"></i>
                <span><strong>Student:</strong> ${data.student.name}</span>
            </div>
            <div class="student-info-item">
                <i class="fas fa-hashtag"></i>
                <span><strong>Serial:</strong> ${data.student.serial}</span>
            </div>
            <div class="student-info-item">
                <i class="fas fa-chair"></i>
                <span><strong>Seat No:</strong> ${data.student.seatNo}</span>
            </div>
            <div class="student-info-item">
                <i class="fas fa-users"></i>
                <span><strong>Group:</strong> ${data.student.group}</span>
            </div>
        </div>
        
        <img src="${data.image}" alt="${data.topic.title}" class="leaflet-image" />
        
        <div class="leaflet-content">
            ${data.content}
        </div>
    `;
    
    container.innerHTML = html;
    container.className = `leaflet-container template-${data.template}`;
    
    document.getElementById('leafletOutput').classList.add('show');
    
    // Scroll to leaflet
    setTimeout(() => {
        document.getElementById('leafletOutput').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// ============================================
// REGENERATION FEATURES
// ============================================

async function regenerateContent() {
    if (!appState.currentLeafletData) return;
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Regenerating...';
    btn.disabled = true;
    
    try {
        const content = await generateTextContent(appState.currentTopic);
        appState.currentLeafletData.content = content;
        renderLeaflet();
    } catch (error) {
        showError('Failed to regenerate content: ' + error.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function regenerateImage() {
    if (!appState.currentLeafletData) return;
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Regenerating...';
    btn.disabled = true;
    
    try {
        const imageUrl = await generateImage(appState.currentTopic.imagePrompt);
        appState.currentLeafletData.image = imageUrl;
        renderLeaflet();
    } catch (error) {
        showError('Failed to regenerate image: ' + error.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function showFocusOptions() {
    document.getElementById('focusModal').classList.add('show');
}

function closeFocusModal() {
    document.getElementById('focusModal').classList.remove('show');
}

async function regenerateWithFocus() {
    const focusPoints = document.getElementById('focusInput').value.trim();
    
    if (!focusPoints) {
        alert('Please specify what aspects to emphasize');
        return;
    }
    
    closeFocusModal();
    
    const modal = document.getElementById('focusModal');
    modal.classList.remove('show');
    
    setGenerating(true);
    
    try {
        const content = await generateTextContent(appState.currentTopic, focusPoints);
        appState.currentLeafletData.content = content;
        renderLeaflet();
        document.getElementById('focusInput').value = '';
    } catch (error) {
        showError('Failed to regenerate with focus: ' + error.message);
    } finally {
        setGenerating(false);
    }
}

// ============================================
// PDF EXPORT
// ============================================

function downloadPDF() {
    const element = document.getElementById('leafletContainer');
    const data = appState.currentLeafletData;
    
    const filename = `${data.topic.title.replace(/\s+/g, '_')}_${data.student.name.replace(/\s+/g, '_')}_${data.student.serial}.pdf`;
    
    const opt = {
        margin: [0.5, 0.5],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    
    html2pdf().set(opt).from(element).save();
}

// ============================================
// APPWRITE INTEGRATION
// ============================================

async function saveToAppwrite() {
    if (!appState.appwriteDb) {
        showMessage('save-message', 'Please configure Appwrite settings first', 'error');
        return;
    }
    
    if (!appState.currentLeafletData) {
        showMessage('save-message', 'No leaflet to save', 'error');
        return;
    }
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;
    
    try {
        const { ID } = Appwrite;
        const data = appState.currentLeafletData;
        
        const document = await appState.appwriteDb.createDocument(
            appState.appwriteConfig.databaseId,
            appState.appwriteConfig.collectionId,
            ID.unique(),
            {
                studentSerial: data.student.serial,
                studentName: data.student.name,
                studentSeatNo: data.student.seatNo,
                studentGroup: data.student.group,
                topicTitle: data.topic.title,
                topicSubtitle: data.topic.subtitle,
                content: data.content,
                imageUrl: data.image,
                templateNumber: data.template,
                generatedAt: data.generatedAt
            }
        );
        
        showMessage('save-message', 'Leaflet saved successfully to Appwrite!', 'success');
    } catch (error) {
        console.error('Appwrite save error:', error);
        showMessage('save-message', 'Failed to save: ' + error.message, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function loadSavedLeaflets() {
    if (!appState.appwriteDb) {
        showMessage('save-message', 'Please configure Appwrite settings first', 'error');
        return;
    }
    
    const listContainer = document.getElementById('saved-leaflets-list');
    listContainer.innerHTML = '<div style="text-align: center;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #667eea;"></i></div>';
    
    try {
        const { Query } = Appwrite;
        const documents = await appState.appwriteDb.listDocuments(
            appState.appwriteConfig.databaseId,
            appState.appwriteConfig.collectionId,
            [Query.orderDesc('generatedAt'), Query.limit(50)]
        );
        
        if (documents.documents.length === 0) {
            listContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">No saved leaflets found</p>';
            return;
        }
        
        const html = documents.documents.map(doc => `
            <div style="border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 15px; background: white;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3 style="color: #1f2937; font-weight: 600; margin-bottom: 5px;">${doc.topicTitle}</h3>
                        <p style="color: #6b7280; margin-bottom: 10px;">${doc.topicSubtitle}</p>
                        <p style="color: #374151; font-size: 0.9rem;">
                            <strong>Student:</strong> ${doc.studentName} (Serial: ${doc.studentSerial})<br>
                            <strong>Group:</strong> ${doc.studentGroup} | <strong>Template:</strong> ${doc.templateNumber}<br>
                            <strong>Generated:</strong> ${new Date(doc.generatedAt).toLocaleString()}
                        </p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-info" style="padding: 10px 20px;" onclick="loadLeafletFromAppwrite('${doc.$id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-danger" style="padding: 10px 20px;" onclick="deleteLeafletFromAppwrite('${doc.$id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        listContainer.innerHTML = html;
        
    } catch (error) {
        console.error('Load error:', error);
        listContainer.innerHTML = `<p style="text-align: center; color: #ef4444;">Failed to load: ${error.message}</p>`;
    }
}

async function loadLeafletFromAppwrite(documentId) {
    try {
        const doc = await appState.appwriteDb.getDocument(
            appState.appwriteConfig.databaseId,
            appState.appwriteConfig.collectionId,
            documentId
        );
        
        // Reconstruct leaflet data
        appState.currentStudent = {
            serial: doc.studentSerial,
            name: doc.studentName,
            seatNo: doc.studentSeatNo,
            group: doc.studentGroup
        };
        
        // Find topic
        const groupInfo = findGroupForSerial(doc.studentSerial);
        appState.currentTopic = topics[groupInfo.topic];
        
        appState.currentLeafletData = {
            student: appState.currentStudent,
            topic: {
                title: doc.topicTitle,
                subtitle: doc.topicSubtitle
            },
            content: doc.content,
            image: doc.imageUrl,
            template: doc.templateNumber,
            generatedAt: doc.generatedAt
        };
        
        selectTemplate(doc.templateNumber);
        renderLeaflet();
        
        showMessage('save-message', 'Leaflet loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Load error:', error);
        showMessage('save-message', 'Failed to load: ' + error.message, 'error');
    }
}

async function deleteLeafletFromAppwrite(documentId) {
    if (!confirm('Are you sure you want to delete this leaflet?')) {
        return;
    }
    
    try {
        await appState.appwriteDb.deleteDocument(
            appState.appwriteConfig.databaseId,
            appState.appwriteConfig.collectionId,
            documentId
        );
        
        showMessage('save-message', 'Leaflet deleted successfully!', 'success');
        loadSavedLeaflets();
        
    } catch (error) {
        console.error('Delete error:', error);
        showMessage('save-message', 'Failed to delete: ' + error.message, 'error');
    }
}

// ============================================
// UI HELPERS
// ============================================

function setGenerating(isGenerating) {
    const btn = document.getElementById('generateBtn');
    const text = document.getElementById('generate-text');
    const spinner = document.getElementById('generate-spinner');
    
    btn.disabled = isGenerating;
    text.textContent = isGenerating ? 'Generating...' : 'Generate AI-Powered Leaflet';
    
    if (isGenerating) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.className = `alert alert-${type}`;
    element.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    element.classList.remove('hidden');
    
    if (type === 'success') {
        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    errorText.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error-message').classList.add('hidden');
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================

window.saveConfiguration = saveConfiguration;
window.loadStudentInfo = loadStudentInfo;
window.selectTemplate = selectTemplate;
window.generateLeaflet = generateLeaflet;
window.regenerateContent = regenerateContent;
window.regenerateImage = regenerateImage;
window.showFocusOptions = showFocusOptions;
window.closeFocusModal = closeFocusModal;
window.regenerateWithFocus = regenerateWithFocus;
window.downloadPDF = downloadPDF;
window.saveToAppwrite = saveToAppwrite;
window.loadSavedLeaflets = loadSavedLeaflets;
window.loadLeafletFromAppwrite = loadLeafletFromAppwrite;
window.deleteLeafletFromAppwrite = deleteLeafletFromAppwrite;


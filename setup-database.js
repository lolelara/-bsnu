#!/usr/bin/env node

/**
 * PHC Leaflet Generator - Appwrite Database Setup Script
 * Run this script locally using Node.js to create database and collection
 */

const https = require('https');

// Configuration - Pre-filled with your credentials
const CONFIG = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '68eeea7c0008fe656dc0',
    apiKey: 'standard_4254c26eb3d99887769c3de02274c654696968aa2bad1f354ed00e968b945cc17e299bc1f554752812c6d00606ea45975d8b6c2d8be796cb9ce69da37214fbaa87373343a9d899432f28d72b20de3aa7f007121b78e9b0dfc911023570f0db22f9fbd5f0b3fbd29d74007429c4f99888509b5eeaf9e75e9eb2230f9d23998c2c'
};

let databaseId = null;
let collectionId = null;

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    let color = colors.reset;
    let icon = 'ℹ';
    
    switch(type) {
        case 'success':
            color = colors.green;
            icon = '✓';
            break;
        case 'error':
            color = colors.red;
            icon = '✗';
            break;
        case 'warning':
            color = colors.yellow;
            icon = '⚠';
            break;
        case 'info':
            color = colors.cyan;
            icon = 'ℹ';
            break;
    }
    
    console.log(`${color}${icon} ${message}${colors.reset}`);
}

function apiCall(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(CONFIG.endpoint + path);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': CONFIG.projectId,
                'X-Appwrite-Key': CONFIG.apiKey
            }
        };
        
        if (body) {
            const bodyString = JSON.stringify(body);
            options.headers['Content-Length'] = Buffer.byteLength(bodyString);
        }
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(json);
                    } else {
                        reject({
                            code: res.statusCode,
                            message: json.message || 'API Error',
                            type: json.type
                        });
                    }
                } catch (error) {
                    reject({ message: 'Failed to parse response', data });
                }
            });
        });
        
        req.on('error', (error) => {
            reject({ message: error.message });
        });
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        
        req.end();
    });
}

function generateUniqueId() {
    return 'unique_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function createDatabase() {
    log('Creating database "leaflets_db"...', 'info');
    
    try {
        const dbId = generateUniqueId();
        const database = await apiCall('/databases', 'POST', {
            databaseId: dbId,
            name: 'leaflets_db'
        });
        
        databaseId = database.$id;
        log(`Database created: ${databaseId}`, 'success');
        return true;
    } catch (error) {
        if (error.code === 409 || error.type === 'document_already_exists') {
            log('Database already exists, fetching existing...', 'warning');
            
            try {
                const dbList = await apiCall('/databases');
                const existing = dbList.databases.find(db => db.name === 'leaflets_db');
                
                if (existing) {
                    databaseId = existing.$id;
                    log(`Using existing database: ${databaseId}`, 'success');
                    return true;
                } else {
                    log('Could not find existing database', 'error');
                    return false;
                }
            } catch (err) {
                log(`Error fetching databases: ${err.message}`, 'error');
                return false;
            }
        } else {
            log(`Error creating database: ${error.message}`, 'error');
            return false;
        }
    }
}

async function createCollection() {
    log('Creating collection "leaflets"...', 'info');
    
    try {
        const collId = generateUniqueId();
        const collection = await apiCall(`/databases/${databaseId}/collections`, 'POST', {
            collectionId: collId,
            name: 'leaflets',
            permissions: [
                'read("any")',
                'create("any")',
                'update("any")',
                'delete("any")'
            ],
            documentSecurity: false
        });
        
        collectionId = collection.$id;
        log(`Collection created: ${collectionId}`, 'success');
        return true;
    } catch (error) {
        if (error.code === 409 || error.type === 'document_already_exists') {
            log('Collection already exists, fetching existing...', 'warning');
            
            try {
                const collList = await apiCall(`/databases/${databaseId}/collections`);
                const existing = collList.collections.find(c => c.name === 'leaflets');
                
                if (existing) {
                    collectionId = existing.$id;
                    log(`Using existing collection: ${collectionId}`, 'success');
                    return true;
                } else {
                    log('Could not find existing collection', 'error');
                    return false;
                }
            } catch (err) {
                log(`Error fetching collections: ${err.message}`, 'error');
                return false;
            }
        } else {
            log(`Error creating collection: ${error.message}`, 'error');
            return false;
        }
    }
}

async function createAttributes() {
    log('Creating attributes...', 'info');
    
    const attributes = [
        { key: 'studentSerial', type: 'integer', required: true },
        { key: 'studentName', type: 'string', size: 255, required: true },
        { key: 'studentSeatNo', type: 'string', size: 50, required: true },
        { key: 'studentGroup', type: 'integer', required: true },
        { key: 'topicTitle', type: 'string', size: 255, required: true },
        { key: 'topicSubtitle', type: 'string', size: 255, required: true },
        { key: 'content', type: 'string', size: 65535, required: true },
        { key: 'imageUrl', type: 'string', size: 2048, required: false },
        { key: 'templateNumber', type: 'integer', required: true },
        { key: 'generatedAt', type: 'string', size: 50, required: true }
    ];
    
    let created = 0;
    let skipped = 0;
    
    for (const attr of attributes) {
        try {
            const endpoint = `/databases/${databaseId}/collections/${collectionId}/attributes/${attr.type}`;
            const body = {
                key: attr.key,
                required: attr.required
            };
            
            if (attr.type === 'string') {
                body.size = attr.size;
            }
            
            await apiCall(endpoint, 'POST', body);
            log(`  ✓ Created attribute: ${attr.key}`, 'success');
            created++;
            
            // Wait between requests
            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            if (error.code === 409 || error.type === 'attribute_already_exists') {
                log(`  ~ Attribute ${attr.key} already exists`, 'warning');
                skipped++;
            } else {
                log(`  ✗ Error creating ${attr.key}: ${error.message}`, 'error');
            }
        }
    }
    
    log(`Attributes: ${created} created, ${skipped} skipped`, 'info');
    return true;
}

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log(colors.bright + colors.cyan + '  PHC Leaflet Generator - Database Setup' + colors.reset);
    console.log('='.repeat(60) + '\n');
    
    log('Starting Appwrite database setup...', 'info');
    log(`Project ID: ${CONFIG.projectId}`, 'info');
    console.log('');
    
    // Step 1: Create Database
    const dbSuccess = await createDatabase();
    if (!dbSuccess) {
        log('Failed to create database. Exiting.', 'error');
        process.exit(1);
    }
    console.log('');
    
    // Step 2: Create Collection
    const collSuccess = await createCollection();
    if (!collSuccess) {
        log('Failed to create collection. Exiting.', 'error');
        process.exit(1);
    }
    console.log('');
    
    // Step 3: Create Attributes
    log('This may take 30-60 seconds...', 'info');
    const attrSuccess = await createAttributes();
    console.log('');
    
    // Display results
    console.log('\n' + '='.repeat(60));
    console.log(colors.bright + colors.green + '  ✓ Setup Complete!' + colors.reset);
    console.log('='.repeat(60) + '\n');
    
    console.log(colors.bright + 'Configuration IDs:' + colors.reset);
    console.log(colors.cyan + 'Database ID:   ' + colors.reset + databaseId);
    console.log(colors.cyan + 'Collection ID: ' + colors.reset + collectionId);
    console.log('');
    
    console.log(colors.yellow + '⚠ IMPORTANT: Update config-preset.js with these IDs!' + colors.reset);
    console.log('');
    console.log('Open config-preset.js and update:');
    console.log(colors.green + `  databaseId: '${databaseId}',` + colors.reset);
    console.log(colors.green + `  collectionId: '${collectionId}'` + colors.reset);
    console.log('');
    console.log('='.repeat(60) + '\n');
}

// Run the script
main().catch(error => {
    console.error('\n' + colors.red + '✗ Fatal Error:' + colors.reset, error.message);
    process.exit(1);
});


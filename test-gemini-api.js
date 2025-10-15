#!/usr/bin/env node

/**
 * Gemini API Test Script
 * Tests if the API key and model name work correctly
 */

const https = require('https');

// Your Gemini API Key
const API_KEY = 'AIzaSyD_oeBjDd-X6dMv2fhT7j0tsYc0BFXiaqs';

// Test different model names
const MODELS_TO_TEST = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro',
    'gemini-pro',
    'gemini-1.5-flash-001'
];

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
};

function log(message, type = 'info') {
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

function testGeminiAPI(modelName) {
    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
        const parsedUrl = new URL(url);
        
        const payload = JSON.stringify({
            contents: [{
                parts: [{ text: 'Say hello in one word' }]
            }]
        });
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 443,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({
                            success: true,
                            model: modelName,
                            response: json,
                            statusCode: res.statusCode
                        });
                    } else {
                        resolve({
                            success: false,
                            model: modelName,
                            error: json,
                            statusCode: res.statusCode
                        });
                    }
                } catch (error) {
                    resolve({
                        success: false,
                        model: modelName,
                        error: { message: 'Failed to parse response', data },
                        statusCode: res.statusCode
                    });
                }
            });
        });
        
        req.on('error', (error) => {
            resolve({
                success: false,
                model: modelName,
                error: { message: error.message }
            });
        });
        
        req.write(payload);
        req.end();
    });
}

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log(colors.cyan + '  Testing Gemini API Models' + colors.reset);
    console.log('='.repeat(60) + '\n');
    
    log('API Key: ' + API_KEY.substring(0, 20) + '...', 'info');
    log('Testing ' + MODELS_TO_TEST.length + ' different models...', 'info');
    console.log('');
    
    for (const modelName of MODELS_TO_TEST) {
        log(`Testing: ${modelName}...`, 'info');
        
        const result = await testGeminiAPI(modelName);
        
        if (result.success) {
            log(`✓ ${modelName} - WORKS! (Status: ${result.statusCode})`, 'success');
            if (result.response && result.response.candidates && result.response.candidates[0]) {
                const text = result.response.candidates[0].content.parts[0].text;
                console.log(`  Response: "${text.trim()}"`);
            }
        } else {
            log(`✗ ${modelName} - FAILED (Status: ${result.statusCode})`, 'error');
            if (result.error && result.error.error) {
                console.log(`  Error: ${result.error.error.message}`);
            }
        }
        
        console.log('');
        
        // Wait a bit between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('='.repeat(60));
    console.log(colors.green + '  Test Complete!' + colors.reset);
    console.log('='.repeat(60) + '\n');
}

main().catch(error => {
    console.error('\n' + colors.red + '✗ Fatal Error:' + colors.reset, error.message);
    process.exit(1);
});


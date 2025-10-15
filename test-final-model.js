#!/usr/bin/env node

/**
 * Test the corrected model name
 */

const https = require('https');

const API_KEY = 'AIzaSyD_oeBjDd-X6dMv2fhT7j0tsYc0BFXiaqs';
const MODEL = 'gemini-2.5-flash';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    cyan: '\x1b[36m'
};

function testModel() {
    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
        const parsedUrl = new URL(url);
        
        const payload = JSON.stringify({
            contents: [{
                parts: [{ text: 'Write a one-sentence health tip about drinking water.' }]
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
                resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(payload);
        req.end();
    });
}

async function main() {
    console.log('\n' + '='.repeat(70));
    console.log(colors.cyan + '  Testing Corrected Gemini Model' + colors.reset);
    console.log('='.repeat(70) + '\n');
    
    console.log(`Model: ${colors.green}${MODEL}${colors.reset}`);
    console.log(`API Key: ${API_KEY.substring(0, 20)}...\n`);
    
    console.log('Testing...\n');
    
    try {
        const result = await testModel();
        
        if (result.statusCode === 200) {
            console.log(colors.green + '✓ SUCCESS! Model works perfectly!' + colors.reset);
            console.log('\nResponse:');
            const text = result.data.candidates[0].content.parts[0].text;
            console.log(`"${text.trim()}"`);
        } else {
            console.log('✗ Failed with status:', result.statusCode);
            console.log(JSON.stringify(result.data, null, 2));
        }
    } catch (error) {
        console.error('✗ Error:', error.message);
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
}

main();


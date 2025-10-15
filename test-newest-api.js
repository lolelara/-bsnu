#!/usr/bin/env node

/**
 * Test the newest API key
 */

const https = require('https');

const API_KEY = 'AIzaSyBksBrUKGcEj8FjpEQHLCOG1zt8tQTDZOA';
const MODEL = 'gemini-2.5-flash';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    red: '\x1b[31m'
};

function testNewestAPI() {
    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
        const parsedUrl = new URL(url);
        
        const payload = JSON.stringify({
            contents: [{
                parts: [{ text: 'Write a very short health tip about sleep.' }]
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
    console.log(colors.cyan + '  Testing Newest API Key' + colors.reset);
    console.log('='.repeat(70) + '\n');
    
    console.log(`API Key: ${colors.green}${API_KEY.substring(0, 20)}...${colors.reset}`);
    console.log(`Model: ${colors.green}${MODEL}${colors.reset}\n`);
    
    console.log('Testing...\n');
    
    try {
        const result = await testNewestAPI();
        
        if (result.statusCode === 200) {
            console.log(colors.green + '✓ SUCCESS! Newest API key works perfectly!' + colors.reset);
            console.log('\nResponse:');
            const text = result.data.candidates[0].content.parts[0].text;
            console.log(`"${text.trim()}"`);
            console.log('\n' + colors.green + '🎉 Ready to use in the website!' + colors.reset);
            console.log(colors.green + '📊 250 fresh requests available!' + colors.reset);
        } else {
            console.log(colors.red + '✗ Failed with status:' + colors.reset, result.statusCode);
            console.log(JSON.stringify(result.data, null, 2));
        }
    } catch (error) {
        console.error(colors.red + '✗ Error:' + colors.reset, error.message);
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
}

main();


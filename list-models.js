#!/usr/bin/env node

/**
 * List Available Gemini Models
 */

const https = require('https');

const API_KEY = 'AIzaSyD_oeBjDd-X6dMv2fhT7j0tsYc0BFXiaqs';

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m'
};

function listModels() {
    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || 443,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET'
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (error) {
                    reject(error);
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.end();
    });
}

async function main() {
    console.log('\n' + '='.repeat(70));
    console.log(colors.cyan + '  Available Gemini Models' + colors.reset);
    console.log('='.repeat(70) + '\n');
    
    try {
        const result = await listModels();
        
        if (result.models && result.models.length > 0) {
            console.log(colors.green + `Found ${result.models.length} models:` + colors.reset + '\n');
            
            result.models.forEach((model, index) => {
                console.log(`${colors.yellow}${index + 1}.${colors.reset} ${colors.cyan}${model.name}${colors.reset}`);
                console.log(`   Display Name: ${model.displayName || 'N/A'}`);
                console.log(`   Description: ${model.description || 'N/A'}`);
                
                if (model.supportedGenerationMethods) {
                    console.log(`   Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
                }
                
                console.log('');
            });
            
            // Find models that support generateContent
            const contentGenModels = result.models.filter(m => 
                m.supportedGenerationMethods && 
                m.supportedGenerationMethods.includes('generateContent')
            );
            
            console.log('='.repeat(70));
            console.log(colors.green + `Models that support generateContent (${contentGenModels.length}):` + colors.reset + '\n');
            
            contentGenModels.forEach(model => {
                console.log(`  ${colors.green}✓${colors.reset} ${model.name}`);
            });
            
        } else {
            console.log(colors.yellow + 'No models found or API error' + colors.reset);
            console.log(JSON.stringify(result, null, 2));
        }
        
    } catch (error) {
        console.error(colors.red + '✗ Error:' + colors.reset, error.message);
    }
    
    console.log('\n' + '='.repeat(70) + '\n');
}

main();


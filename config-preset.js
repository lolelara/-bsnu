// Pre-configured settings for PHC Leaflet Generator
// This file contains the configuration that will be automatically loaded

const presetConfig = {
    geminiApiKey: 'AIzaSyBksBrUKGcEj8FjpEQHLCOG1zt8tQTDZOA',
    appwrite: {
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: '68eeea7c0008fe656dc0',
        databaseId: 'unique_1760489195767_fsjxx1sj8',
        collectionId: 'unique_1760489196568_vxgj9w8yi'
    }
};

// Auto-load and SAVE configuration on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        // Wait a moment for the page to fully load
        setTimeout(function() {
            // Check if we're on the main application page
            const geminiInput = document.getElementById('geminiApiKey');
            if (geminiInput) {
                // Load preset configuration into fields
                geminiInput.value = presetConfig.geminiApiKey;
                
                const endpointInput = document.getElementById('appwriteEndpoint');
                if (endpointInput) endpointInput.value = presetConfig.appwrite.endpoint;
                
                const projectInput = document.getElementById('appwriteProject');
                if (projectInput) projectInput.value = presetConfig.appwrite.projectId;
                
                const dbInput = document.getElementById('appwriteDatabase');
                if (dbInput && presetConfig.appwrite.databaseId) {
                    dbInput.value = presetConfig.appwrite.databaseId;
                }
                
                const collInput = document.getElementById('appwriteCollection');
                if (collInput && presetConfig.appwrite.collectionId) {
                    collInput.value = presetConfig.appwrite.collectionId;
                }
                
                // Auto-save configuration immediately
                if (typeof saveConfiguration === 'function') {
                    saveConfiguration();
                }
            }
        }, 1000); // Wait 1 second for everything to load
    });
}


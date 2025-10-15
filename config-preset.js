// Pre-configured settings for PHC Leaflet Generator
// This file contains the configuration that will be automatically loaded

const presetConfig = {
    geminiApiKey: 'AIzaSyD_oeBjDd-X6dMv2fhT7j0tsYc0BFXiaqs',
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
            if (document.getElementById('geminiApiKey')) {
                // Load preset configuration into fields
                document.getElementById('geminiApiKey').value = presetConfig.geminiApiKey;
                document.getElementById('appwriteEndpoint').value = presetConfig.appwrite.endpoint;
                document.getElementById('appwriteProject').value = presetConfig.appwrite.projectId;
                
                if (presetConfig.appwrite.databaseId) {
                    document.getElementById('appwriteDatabase').value = presetConfig.appwrite.databaseId;
                }
                
                if (presetConfig.appwrite.collectionId) {
                    document.getElementById('appwriteCollection').value = presetConfig.appwrite.collectionId;
                }
                
                // Auto-save configuration immediately
                if (typeof saveConfiguration === 'function') {
                    saveConfiguration();
                }
            }
        }, 500); // Wait 500ms for everything to load
    });
}


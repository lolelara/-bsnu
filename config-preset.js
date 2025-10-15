// Pre-configured settings for PHC Leaflet Generator
// This file contains the configuration that will be automatically loaded

const presetConfig = {
    geminiApiKey: 'AIzaSyD_oeBjDd-X6dMv2fhT7j0tsYc0BFXiaqs',
    appwrite: {
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: '68eeea7c0008fe656dc0',
        // Note: Database and Collection IDs will be generated when you run setup-appwrite.html
        // After running setup, update these values:
        databaseId: '', // Add your Database ID here after setup
        collectionId: '' // Add your Collection ID here after setup
    }
};

// Auto-load configuration on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        // Check if we're on the main application page
        if (document.getElementById('geminiApiKey')) {
            // Load preset configuration
            document.getElementById('geminiApiKey').value = presetConfig.geminiApiKey;
            document.getElementById('appwriteEndpoint').value = presetConfig.appwrite.endpoint;
            document.getElementById('appwriteProject').value = presetConfig.appwrite.projectId;
            
            if (presetConfig.appwrite.databaseId) {
                document.getElementById('appwriteDatabase').value = presetConfig.appwrite.databaseId;
            }
            
            if (presetConfig.appwrite.collectionId) {
                document.getElementById('appwriteCollection').value = presetConfig.appwrite.collectionId;
            }
            
            // Show message
            const configMessage = document.getElementById('config-message');
            if (configMessage) {
                configMessage.className = 'alert alert-info';
                configMessage.innerHTML = '<i class="fas fa-info-circle"></i> Pre-configured settings loaded. Click "Save Configuration" to apply.';
                configMessage.classList.remove('hidden');
            }
        }
    });
}


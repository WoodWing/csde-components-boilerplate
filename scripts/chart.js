(async function(window) {
    async function loadChartProviderModule() {
        try {
            const infogramModule = await import('https://cdn.jifo.co/embeddable-editor/plugin.js');

            // Return the functions instead of assigning them to window
            return {
                createChart: infogramModule.createInfogramProject,
                editChart: infogramModule.editInfogramProject,
            };

        } catch (error) {
            console.error('Error loading Infogram module:', error);
            throw error;
        }
    }

    // Provide function in window to load module
    window.parent.loadCharProviderModule = loadChartProviderModule;

})(window);

/* Adds module to use chart provider API functions */
(function(window){

    async function loadChartProviderModule() {
        try {
            const infogramModule = await import('https://cdn.jifo.co/embeddable-editor/plugin.js');

            return {
                createChart: infogramModule.createInfogramProject,
                editChart: infogramModule.editInfogramProject,
            };

        } catch (error) {
            console.error('Error loading Infogram module:', error);
            throw error;
        }
    }

    // Provide function in window to load module manually
    window.parent.loadCharProviderModule = loadChartProviderModule;

})(window);

window.customDirectiveFactory = function(customDirectiveApi) {
    console.log('sheet id', xlsxSheetId());

    function renderXlsx(objectId) {
        console.log('download xlsl data');
        fetch(`http://localhost.woodwing.net/StudioServer/fileindex.php?objectid=${objectId}&rendition=native&areas=Workflow&ww-app=Content+Station`, {
            mode: 'cors',
            credentials: 'include', // include cookie with Studio server ticket!
        }).then((response) => {
            console.log('read xlsx new', response);
            if (!response.ok) {
                console.error('could not read data');
                return;
            }
    
            console.log('read data as text');
            response.arrayBuffer().then((data) => {
                console.log('result data: ', data);
    
                const workBook = XLSX.read(data, {type:"array"});
                console.log('sheet names: ', workBook.SheetNames);
                const workSheet = workBook.Sheets[workBook.SheetNames[0]];
                console.log('workbook: ', workBook, ', workSheet: ',workSheet);
            
                // customDirectiveApi.render will replace the html content of the directive html element
                customDirectiveApi.render(XLSX.utils.sheet_to_html(workSheet, {editable: false}));
            });
        });
    }

    function xlsxSheetId() {
        // Read a property value from the component (matching as defined in components-definition.json)
        return customDirectiveApi.getPropertyValue('sheet-id');
    }

    renderXlsx(xlsxSheetId());

    // Return api for our instance
    return {
        // Called by editor any changes in component data (may be a called a lot)
        onChanges: () => {
            renderXlsx(xlsxSheetId());
        }
    };
}


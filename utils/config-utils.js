function exportConfig() {
    let inputs = document.querySelectorAll('.basesetting-container');
    let outputObject = { settings: {} };
    for (let input of inputs) {
        let configType = input.getAttribute('config');
        let number = input.getAttribute('id');

        let settings = input.querySelectorAll('.input-group');
        for (let setting of settings) {
            let key = setting.getAttribute('inputid'), value;
            let isSelect = setting.querySelector('select') != null;
            if (isSelect) {
                let select = setting.querySelector('select');
                // console.log(select, select.querySelector('select'));
                value = setting.querySelector('select').value;
            } else {
                let isMultiInput = setting.querySelectorAll('input').length > 1;
                // console.log(setting.querySelector('input'))
                let isColourInput = configType == 'colour';

                if (isMultiInput) {
                    let multiInputs = setting.querySelectorAll('input');
                    let inputs = [];
                    for (multiInput of multiInputs) {
                        inputs.push(multiInput.value);
                    }
                    value = inputs.join(',');
                    if (value == ',') { value = ''; }
                } else if (isColourInput) {
                    key = `${key}${number}`;
                    let colourElements = setting.querySelectorAll('[type="range"]');
                    let colourArray = [];
                    for (let colourElement of colourElements) {
                        colourArray.push(colourElement.value);
                    }
                    value = colourArray.join(',');
                } else {
                    value = setting.querySelector('input').value;
                }
            }
            switch (configType) {
                case "base":
                    outputObject.settings[key] = value;
                    break;
                case "font":
                    if (!(`font${number}` in outputObject)) { outputObject[`font${number}`] = {}; }
                    outputObject[`font${number}`][key] = value;
                    break;
                /*case "effects":
                    outputObject['effect'][key] = value;
                    break;
                case "profile":
                    outputObject.settings[key] = value;
                    break;
                    */
                case "colour":
                    console.log(key)
                    if (!(`colour${number}` in outputObject)) { outputObject[`colour${number}`] = []; }
                    let colourObject = {};
                    colourObject[key] = value;
                    outputObject[`colour${number}`].push(colourObject);
                    break;

            }
        }
    }
    console.log(outputObject);
    convertToINIAndServe(outputObject);
}

function convertToINIAndServe(ini) {
    let fileText = '';
    for (let setting in ini) {
        
        if (setting == 'settings') {
            fileText += '[settings] \n';

            for (let settingElement in ini[setting]) {
                let key = settingElement, value = ini[setting][settingElement];
                fileText += `${key} = ${value} \n`;
                console.log(key, value);
            }
        }
        let fileSegment = ini[setting];
    }

    console.log(fileText);
}
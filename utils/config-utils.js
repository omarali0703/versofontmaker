function exportConfig() {
    let inputs = document.querySelectorAll('.basesetting-container');
    let outputObject = { settings: {} };
    let error = false;
    parentloop:
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
                    if (value == ',') { value = ''; error = true; break parentloop; }
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
                    if (value == null || value == '') {
                        error = true; break parentloop;
                    }
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
                    if (!(`colour${number}` in outputObject)) { outputObject[`colour${number}`] = {}; }
                    let colourObject = {};
                    // colourObject[key] = value;
                    outputObject[`colour${number}`][key] = value;
                    break;

            }
        }

    }
    console.log(outputObject);

    if (error) {
        toastr.warning('Some fields are still blank.');
    } else {
        convertToINIAndServe(outputObject);
    }
}

function convertToINIAndServe(ini) {

    let fileText = '';
    let addedEffectsHeader = false;
    for (let setting in ini) {

        if (setting == 'settings') {
            fileText += '[settings] \n';

            for (let settingElement in ini[setting]) {
                let key = settingElement, value = ini[setting][settingElement];
                fileText += `${key} = ${value} \n`;
            }
            fileText += '\n';

        } else if (setting.includes('font')) {
            let number = setting.split('font')[1];
            fileText += `[font${number}] \n`;

            for (let settingElement in ini[setting]) {
                let key = settingElement, value = ini[setting][settingElement];
                value = value.replaceAll(' ', '_');
                fileText += `${key} = ${value} \n`;
            }
            fileText += '\n';

        }
        if (setting.includes('colour')) {
            if (addedEffectsHeader == false) {
                fileText += '[effects] \n';
                addedEffectsHeader = true;
            }
            let number = setting.split('colour')[1];

            for (let settingElement in ini[setting]) {
                let key = settingElement, value = ini[setting][settingElement];
                fileText += `${key}${number} = ${value} \n`;
            }

            fileText += '\n';
        }
        let fileSegment = ini[setting];
    }
    download('config.ini', fileText);
    console.log(fileText);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
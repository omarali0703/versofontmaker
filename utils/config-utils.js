function exportConfig() {
    let inputs = document.querySelectorAll('.basesetting-container');
    let outputObject = { settings: {} };
    let error = false;
    let presets = document.querySelectorAll('.preset-container');
    let presetStr = '', presetCounter = 1;
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
                    */
                case "profile":
                    if (!(`profile${number}` in outputObject)) { outputObject[`profile${number}`] = {}; }
                    outputObject[`profile${number}`][key] = value;
                    break;

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

    for (let preset of presets) {
        let colourSelect = preset.querySelector('#colour-selector').value;
        let profileSelect = preset.querySelector('#profile-selector').value;
        let fontSelect = preset.querySelector('#font-selector').value;

        presetStr += `preset${presetCounter} = ${colourSelect},${profileSelect},${fontSelect}\n`;
        presetCounter += 1;

    }

    outputObject['presets'] = presetStr;

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

        } else if (setting == 'presets') {
            fileText += ini.presets;
        } else if (setting.includes('profile')) {
            let number = setting.split('profile')[1];
            for (let settingElement in ini[setting]) {
                let key = settingElement, value = ini[setting][settingElement];
                value = value.replaceAll(' ', '_');
                fileText += `${key}${number} = ${value} \n`;
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

function parseINIString(data) {
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function (line) {
        if (regex.comment.test(line)) {
            return;
        } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
                value[section][match[1]] = match[2];
            } else {
                value[match[1]] = match[2];
            }
        } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        } else if (line.length == 0 && section) {
            section = null;
        };
    });
    return value;
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
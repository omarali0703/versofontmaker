window.addEventListener('load', function () {
    var importButton = document.querySelector('.btn-import');
    var exportButton = document.querySelector('.btn-export');
    var shareButton = document.querySelector('.btn-share');
    var createNewConfig = document.querySelector('.btn-new');
    var createNewFont = document.querySelector('.btn-import-font');
    importButton.onclick = function () { openModal('Import Config', 'import'); }
    exportButton.onclick = function () { openModal('Export Config', 'export'); }
    shareButton.onclick = function () { openModal('Share Config', 'share'); }
    createNewConfig.onclick = function () { openModal('Create New Config', 'create'); }
    createNewFont.onclick = function () { openModal('Create A New Font', 'create-font'); }
    initialisePage();
});
const baseSettings = [
    { type: 'select', id: 'blade_type', name: "Blade Type", description:'The lighting setup for your build. TriCree setups use a single tricree or singlecree LED in the hilt of the saber. NeoPixel builds use a strip of LEDS that are installed inside the blade tube.', options: [{ name: "pixel", description: 'NeoPixel' }, { name: "tricree", description: 'TriCree/Cree LED' }] },
    { type: 'select', id: 'strip_type', name: "Strip Type", description:'The type of LED strip inside of the blade tube. Consult your LED strip documentation to find out what standard your LED strip uses.', options: [{ name: 'ws2812', description: 'WS2812' }, { name: 'apa102', description: 'APA102' }] },
    { type: 'input', id: 'pixel_count', name: "Blade Pixel Count", state: "HIDDEN" },
    { type: 'input', id: 'crossguard_pixel_count', name: "Cross Guard Pixel Count", state: "HIDDEN" },
    { type: 'input', id: 'crossguard_delay', name: "Cross Guard Delay", state: "HIDDEN" },
    { type: 'input', id: 'stand_by_after', name: 'Stand By After' },
    { type: 'input', id: 'mute_mode_after', name: 'Mute Mode After' },
    { type: 'input', id: 'retraction_after', name: 'Retraction After' },
    { type: 'input', id: 'double_click_time', name: 'Double-Click Time' },
    { type: 'input', id: 'blaster_after', name: 'Blaster After' },
    { type: 'input', id: 'master_volume', name: 'Master Volume' },
    { type: 'multi-input-2', id: 'button_blink', name: 'Button Blink' },
    { type: 'input', id: 'button_count', name: 'Button Count' },
    { type: 'input', id: 'clash_sensitivity', name: 'Clash Sensitivity' },
]

const fontSettings = [
    { type: 'text-input', id: 'fontName', name: 'Font Name' },
    { type: 'select', id: 'fontType', name: 'Font Type', options: [{ name: "smooth", description: 'Smoothswing' }, { name: "mono", description: 'Monophonic' }, { name: "poly", description: 'Polyphonic' }] },
    { type: 'text-input', id: 'sampFreq', name: 'Sampling Frequency' },
    { type: 'text-input', id: 'ssTresh', name: 'SmoothSwing Threshold' },
    { type: 'text-input', id: 'ssSens', name: 'SmoothSwing Sensitivity' },
    { type: 'text-input', id: 'ssShar', name: 'SmoothSwing Sharpness' },
    { type: 'text-input', id: 'ssHum', name: 'SmoothSwing Humducking' },
    { type: 'text-input', id: 'ssMax', name: 'SmoothSwing Max Volume' },
    { type: 'text-input', id: 'ssTrans1', name: 'SmoothSwing Transition 1' },
    { type: 'text-input', id: 'ssTrans2', name: 'SmoothSwing Transition 2' },
    { type: 'text-input', id: 'aHigh', name: 'AccentSwing High Threshold' },
    { type: 'text-input', id: 'aLow', name: 'AccentSwing Low Threshold' },
    { type: 'text-input', id: 'humgain', name: 'Hum Gain' }
];

const effectSettings = [
    { type: 'text-input', id: 'ignitiontime', name: 'Ignition Time' },
    { type: 'text-input', id: 'retrationtime', name: 'Retration Time' },
    { type: 'text-input', id: 'transitiontime', name: 'Transition Time' }
];

const colourSettings = [
    { type: 'colour', id: 'bladecolour', name: 'Blade Colour' },
    { type: 'colour', id: 'bladecolour', name: 'Clash Colour' },
    { type: 'colour', id: 'bladecolour', name: 'Lockup Colour' },
    { type: 'colour', id: 'bladecolour', name: 'Blaster Colour' },
];

function createSetting(title, baseSettings, configType, insertNext, deletable) {
    let baseSettingsContainer = document.createElement('div');
    baseSettingsContainer.classList = 'basesetting-container';
    baseSettingsContainer.setAttribute('config', configType);
    if (deletable) {
        let closeDelete = document.createElement('div');
        let closeDeleteIcon = document.createElement('i');
        closeDeleteIcon.classList = 'modal-close fas fa-times-circle';

        closeDeleteIcon.addEventListener('click', function () {
            baseSettingsContainer.remove();
        })
        baseSettingsContainer.appendChild(closeDeleteIcon);
    }
    let containerTitle = document.createElement('div');
    containerTitle.classList = 'container-title';
    containerTitle.textContent = title;
    baseSettingsContainer.appendChild(containerTitle);
    for (let setting of baseSettings) {
        let elementType = setting.type;
        let typeToUse = '';
        switch (elementType) {
            case 'input':
                typeToUse = 'input';
                break;
            case 'text-input':
                typeToUse = 'input';
                break;
            case 'colour':
                typeToUse = 'div';
                break;
            case 'select':
                typeToUse = 'select';
                break;
            default:
                typeToUse = 'div';
                break;
        }
        let inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');
        inputGroup.setAttribute('config', configType);
        inputGroup.setAttribute('inputID', setting.id);
        let label = document.createElement('label');
        label.setAttribute('for', setting.id);
        label.innerHTML = setting.name;

        let field = document.createElement(typeToUse);

        if (configType == 'font') { baseSettingsContainer.setAttribute('font-id', 1); }
        if (configType == 'colour') { baseSettingsContainer.setAttribute('colour-id', 1); }
        if (configType == 'effects') { baseSettingsContainer.setAttribute('effect-id', 1); }

        if (elementType == 'colour') {
            let colourPicker = generateColourPicker(field);
        }

        if (elementType == 'multi-input-2') {
            let input1 = document.createElement('input');
            let input2 = document.createElement('input');
            field.appendChild(input1);
            field.appendChild(input2);
            inputGroup.style.borderBottom = 'unset';
            field.classList.add('double-input');
        }


        if (elementType == 'select') {
            for (let option of setting.options) {
                let optionElement = document.createElement('option');
                optionElement.setAttribute('value', option.name);
                optionElement.innerHTML = option.description;
                field.appendChild(optionElement);
            }
        }

        let info = document.createElement('span');
        let infoIcon = document.createElement('i');
        infoIcon.classList = 'fas fa-info-circle icon-right click';
        info.appendChild(infoIcon);

        info.addEventListener('click', function() {
            openModal('Information', 'info');
            document.querySelector('.modal-inner').textContent = setting.description;
        });

        label.appendChild(info);

        inputGroup.appendChild(label);
        inputGroup.appendChild(field);

        baseSettingsContainer.appendChild(inputGroup);
    }
    if (insertNext) {
        let parent = document.querySelector('.main-container');

        parent.insertBefore(baseSettingsContainer, insertNext);
    } else {
        document.querySelector('.main-container').appendChild(baseSettingsContainer);
    }
}

function initialisePage() {
    createSetting("Main Saber Settings", baseSettings, 'base', false);
    createSetting("Font Settings", fontSettings, 'font');
    insertAdd('fonts');
    createSetting("Effects Settings", effectSettings, 'effects', false);
    insertAdd('effects');
    createSetting("Colour Settings", colourSettings, 'colour', false);
    insertAdd('colour');
}

function insertAdd(type) {
    let addElement = document.createElement('div');
    addElement.classList = "add-element icon-green";
    let addElementButton = document.createElement('div');
    let addElementText = document.createElement('span');
    addElementText.textContent = "Add New";
    let icon = document.createElement('i');
    icon.classList = 'fas fa-plus-square icon-right';


    addElement.appendChild(addElementButton);

    addElementButton.appendChild(addElementText);
    addElementButton.appendChild(icon);
    document.querySelector('.main-container').appendChild(addElement);
    switch (type) {
        case 'fonts':
            tippy(addElementButton, {
                content: "Add a new font configuration",
            });
            icon.addEventListener('click', function () {
                createSetting('New Font', fontSettings, 'font', addElement, true);
            });
            break;
        case 'effects':
            tippy(addElementButton, {
                content: "Add a new effects configuration",
            });

            icon.addEventListener('click', function () {
                createSetting('New Effect', effectSettings, 'effects', addElement, true);
            });
            break;
        case 'colour':
            tippy(addElementButton, {
                content: "Add a new colour configuration",
            });
            icon.addEventListener('click', function () {
                createSetting('New Colour', colourSettings, 'colour', addElement, true);
            });
            break;
    }
}

function changeColour(uid) {
    let element = document.querySelector(`[id="${uid}"]`);
    let currR = document.querySelector(`[name="red"][uid="${uid}"]`).value;
    let currG = document.querySelector(`[name="green"][uid="${uid}"]`).value;
    let currB = document.querySelector(`[name="blue"][uid="${uid}"]`).value;
    console.log(currB);

    element.style.backgroundColor = `rgb(${currR},${currG},${currB})`;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateColourPicker(parent) {
    // toastr.warning('TEST');
    // let red = 255, green = 255, blue = 0;
    let colourContainer = document.createElement('div');
    colourContainer.classList = 'colour-container';
    let controllerContainer = document.createElement('div');
    controllerContainer.classList = 'colour-controller';
    let controllerR = document.createElement('input');
    let controllerG = document.createElement('input');
    let controllerB = document.createElement('input');
    let uniqueID = uuidv4();
    controllerR.setAttribute('type', 'range');
    controllerR.setAttribute('min', 0);
    controllerR.setAttribute('max', 255);
    controllerR.setAttribute('name', 'red');
    controllerR.setAttribute('uid', uniqueID);
    controllerR.value = 255;
    controllerR.setAttribute('oninput', `changeColour('${uniqueID}')`);
    controllerR.setAttribute('onchange', `changeColour('${uniqueID}')`);

    controllerG.setAttribute('type', 'range');
    controllerG.setAttribute('min', 0);
    controllerG.setAttribute('max', 255);
    controllerG.setAttribute('name', 'green');
    controllerG.setAttribute('uid', uniqueID);
    controllerG.value = 255;
    controllerG.setAttribute('oninput', `changeColour('${uniqueID}')`);
    controllerG.setAttribute('onchange', `changeColour('${uniqueID}')`);

    controllerB.setAttribute('type', 'range');
    controllerB.setAttribute('min', 0);
    controllerB.setAttribute('max', 255);
    controllerB.setAttribute('name', 'blue');
    controllerB.setAttribute('uid', uniqueID);
    controllerB.value = 0;
    controllerB.setAttribute('oninput', `changeColour('${uniqueID}' )`);
    controllerB.setAttribute('onchange', `changeColour('${uniqueID}')`);

    controllerContainer.appendChild(controllerR);
    controllerContainer.appendChild(controllerG);
    controllerContainer.appendChild(controllerB);

    let blend = document.createElement('div');
    blend.classList = 'blend';
    blend.setAttribute('redValue', 255);
    blend.setAttribute('greenValue', 255);
    blend.setAttribute('blueValue', 0);
    blend.style.backgroundColor = 'rgb(255,255,0)';
    blend.setAttribute('id', uniqueID);
    colourContainer.appendChild(controllerContainer);

    colourContainer.appendChild(blend);

    parent.appendChild(colourContainer);
}


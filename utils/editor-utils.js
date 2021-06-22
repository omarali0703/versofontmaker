const baseSettings = [
    { type: 'select', id: 'blade_type', name: "Blade Type", description: 'The lighting setup for your build. TriCree setups use a single tricree or singlecree LED in the hilt of the saber. NeoPixel builds use a strip of LEDS that are installed inside the blade tube.', options: [{ name: "pixel", description: 'NeoPixel' }, { name: "tricree", description: 'TriCree/Cree LED' }] },
    { type: 'select', id: 'strip_type', name: "Strip Type", description: 'The type of LED strip inside of the blade tube. Consult your LED strip documentation to find out what standard your LED strip uses.', options: [{ name: 'ws2812', description: 'WS2812' }, { name: 'apa102', description: 'APA102' }] },
    { type: 'input', id: 'pixel_count', name: "Blade Pixel Count", state: "HIDDEN", default: 132 },
    { type: 'input', id: 'crossguard_pixel_count', name: "Cross Guard Pixel Count", state: "HIDDEN", default: 0 },
    { type: 'input', id: 'crossguard_delay', name: "Cross Guard Delay", state: "HIDDEN", default: 0 },
    { type: 'input', id: 'stand_by_after', name: 'Stand By After', default: 30 },
    { type: 'input', id: 'mute_mode_after', name: 'Mute Mode After', default: 1000 },
    { type: 'input', id: 'retraction_after', name: 'Retraction After', default: 500 },
    { type: 'input', id: 'double_click_time', name: 'Double-Click Time', default: 250 },
    { type: 'input', id: 'blaster_after', name: 'Blaster After', default: 200 },
    { type: 'input', id: 'master_volume', name: 'Master Volume', default: 1.6 },
    { type: 'multi-input-2', id: 'button_blink', name: 'Button Blink', default: [1000, 1] },
    { type: 'input', id: 'button_count', name: 'Button Count', default: 2 },
    { type: 'input', id: 'clash_sensitivity', name: 'Clash Sensitivity', default: 300 },
]

const fontSettings = [
    { type: 'text-input', id: 'font_name', name: 'Font Name', default: 'New Font' },
    { type: 'select', id: 'font_type', name: 'Font Type', options: [{ name: "smoothswing", description: 'Smoothswing' }, { name: "monophonic", description: 'Monophonic' }, { name: "polyphonic", description: 'Polyphonic' }] },
    { type: 'text-input', id: 'sampling_frequency', name: 'Sampling Frequency', default: 44100 },
    { type: 'text-input', id: 'smoothswing_threshold', name: 'SmoothSwing Threshold', default: 20 },
    { type: 'text-input', id: 'smoothswing_sensitivity', name: 'SmoothSwing Sensitivity', default: 300 },
    { type: 'text-input', id: 'smoothswing_sharpness', name: 'SmoothSwing Sharpness', default: 1.5 },
    { type: 'text-input', id: 'smoothswing_hum_ducking', name: 'SmoothSwing Humducking', default: 75 },
    { type: 'text-input', id: 'smoothswing_max_volume', name: 'SmoothSwing Max Volume', default: 0.95 },
    { type: 'text-input', id: 'smoothswing_transition1', name: 'SmoothSwing Transition 1', default: 60 },
    { type: 'text-input', id: 'smoothswing_transition2', name: 'SmoothSwing Transition 2', default: 180 },
    { type: 'text-input', id: 'accentswing_high_threshold', name: 'AccentSwing High Threshold', default: 300 },
    { type: 'text-input', id: 'accentswing_low_threshold', name: 'AccentSwing Low Threshold', default: 200 },
    { type: 'text-input', id: 'hum_gain', name: 'Hum Gain', default: 100.0 }
];

const effectSettings = [
    { type: 'text-input', id: 'ignition_time', name: 'Ignition Time', default: 250 },
    { type: 'text-input', id: 'retraction_time', name: 'Retration Time', default: 350 },
    { type: 'text-input', id: 'transition_time', name: 'Transition Time', default: 250 }
];

const colourSettings = [
    { type: 'colour', id: 'blade_color', name: 'Blade Colour' },
    { type: 'colour', id: 'clash_color', name: 'Clash Colour' },
    { type: 'colour', id: 'lockup_color', name: 'Lockup Colour' },
    { type: 'colour', id: 'blaster_color', name: 'Blaster Colour' },
];

const profileSettings = [
    { type: 'select', id: 'flicker_type', name: 'Flicker Type', options: [{ name: "random", description: 'Random Flicker' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'multi-input-2', id: 'flicker_range', name: 'Flicker Range', default: [100, 100] },
    { type: 'text-input', id: 'flicker_frequency', name: 'Flicker Frequency', default: 1 },
    { type: 'select', id: 'clash_type', name: 'Clash Type', options: [{ name: "random", description: 'Random Flicker' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'clash_duration', name: 'Clash Duration', default: 25 },
    { type: 'text-input', id: 'clash_frequency', name: 'Clash Frequency', default: 100 },
    { type: 'select', id: 'lockup_type', name: 'Lockup Type', options: [{ name: "static", description: 'Static Lockup' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'lockup_frequency', name: 'Lockup Frequency', default: 100 },
    { type: 'text-input', id: 'lockup_percent', name: 'Lockup Percent', default: 100 },
    { type: 'text-input', id: 'lockup_centre', name: 'Lockup Centre', default: 100 },
    { type: 'select', id: 'blaster_type4', name: 'Blaster Type', options: [{ name: "static", description: 'Static Lockup' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'blaster_duration', name: 'Blaster Duration', default: 30 },
    { type: 'text-input', id: 'blaster_frequency', name: 'Blaster Frequency', default: 100 },
    { type: 'text-input', id: 'blaster_percent', name: 'Blaster Percent', default: 100 },
    { type: 'text-input', id: 'blaster_centre', name: 'Blaster Centre', default: 100 },
    { type: 'text-input', id: 'blaster_delay', name: 'Blaster Delay', default: 100 }

];

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

function generatePresetMaker(parent) {
    let newPresetButton = document.createElement('div');
    newPresetButton.classList = 'btn new-preset';

    let newPresetIcon = document.createElement('i');
    newPresetIcon.classList = 'fas fa-plus-circle icon-left';
    newPresetButton.appendChild(newPresetIcon);
    newPresetButton.innerHTML += '<span>Create New Preset</span>';
    parent.appendChild(newPresetButton);
    newPresetButton.addEventListener('click', function () {
        generatePresetContainer(parent);
    });
}

function generatePresetContainer(parent) {
    let presetContainer = document.createElement('div');
    presetContainer.classList = 'preset-container';

    let presetContainerTitle = document.createElement('span');
    presetContainerTitle.classList = 'preset-title';
    presetContainerTitle.textContent = 'New Preset';
    let presetTop = document.createElement('div');
    presetTop.classList = 'preset-top';
    let presetDelete = document.createElement('div');
    presetDelete.classList = 'preset-delete';
    let deleteIcon = document.createElement('i');
    deleteIcon.classList = 'fas fa-times-circle modal-close';
    presetDelete.appendChild(deleteIcon);

    presetDelete.addEventListener('click', function () {
        presetContainer.remove();
    });

    let presetBody = document.createElement('div');
    presetBody.classList = 'preset-body';

    let selectorContainer = document.createElement('div');
    selectorContainer.classList = 'preset-selector-container';

    let colourSelector = document.createElement('select');
    let profileSelector = document.createElement('select');
    let fontSelector = document.createElement('select');

    let colourSelectorLabel = document.createElement('label');
    let profileSelectorLabel = document.createElement('label');
    let fontSelectorLabel = document.createElement('label');

    colourSelector.setAttribute('id', 'colour-selector')
    profileSelector.setAttribute('id', 'profile-selector')
    fontSelector.setAttribute('id', 'font-selector')

    generatePresetSelect('colour', colourSelector);
    generatePresetSelect('profile', profileSelector);
    generatePresetSelect('font', fontSelector);

    colourSelectorLabel.setAttribute('for', '#colour-selector');
    profileSelectorLabel.setAttribute('for', '#profile-selector');
    fontSelectorLabel.setAttribute('for', '#font-selector');

    colourSelectorLabel.textContent = "Preset Colour";
    profileSelectorLabel.textContent = "Preset Profile";
    fontSelectorLabel.textContent = "Preset Font";

    selectorContainer.appendChild(colourSelectorLabel);
    selectorContainer.appendChild(colourSelector);
    presetBody.appendChild(selectorContainer);

    selectorContainer = document.createElement('div');
    selectorContainer.classList = 'preset-selector-container';
    selectorContainer.appendChild(profileSelectorLabel);
    selectorContainer.appendChild(profileSelector);
    presetBody.appendChild(selectorContainer);

    selectorContainer = document.createElement('div');
    selectorContainer.classList = 'preset-selector-container';
    selectorContainer.appendChild(fontSelectorLabel);
    selectorContainer.appendChild(fontSelector);
    presetBody.appendChild(selectorContainer);


    // color, profile, font

    presetTop.appendChild(presetContainerTitle);
    presetTop.appendChild(presetDelete);
    presetContainer.appendChild(presetTop);
    presetContainer.appendChild(presetBody);
    parent.appendChild(presetContainer);

}

function getAll(type) {
    let all = document.querySelectorAll(`.basesetting-container[config='${type}']`);
    let allElementsToReturn = [];
    for (let element of all) {
        let id = element.getAttribute('id');
        allElementsToReturn.push(id);
    }

    return { type: type, elements: allElementsToReturn };
}

function generatePresetSelect(typeToGenerate, parent) {
    let options = [];
    options = getAll(typeToGenerate);
    let optionTitle = `Unset`;
    let optionElement = document.createElement('option');
    optionElement.classList = 'preset-dropdown-option';
    optionElement.textContent = optionTitle;
    parent.appendChild(optionElement);
    for (let option of options.elements) {
        optionTitle = `${typeToGenerate} ${option}`;
        optionElement = document.createElement('option');
        optionElement.innerHTML = optionTitle;
        optionElement.setAttribute('value', option);
        parent.appendChild(optionElement);
    }
}

function updatePresetDropdowns(typeToUpdate, triggerModal) {
    if (typeToUpdate == 'base' || typeToUpdate == 'effects') { return; }
    if(doNoShowAgainPresets == false && triggerModal) {
        console.log('hi');
        openModal('Deleting Preset Elements', 'no-show-again', 'You appeared to have deleted an option that is currently being used by a preset. Deleting this option will reset any preset dropdown that is assigned to this option. The rest of the dropdowns will not be affected.', function() {
            console.log(typeToUpdate);
            let previousOptions = currentOptions[typeToUpdate];
            let newOptions = getAll(typeToUpdate).elements;
            console.log(newOptions, previousOptions);
            if (newOptions.length < previousOptions.length) {
                let optionsToReset = document.querySelectorAll(`#${typeToUpdate}-selector`);
                console.log(`#${typeToUpdate}-selector`);
                for (let option of optionsToReset) {
                    option.innerHTML = '';
                    generatePresetSelect(typeToUpdate, option);
                }
            }
        })
    }
    
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function removeElement(element, arr) {
    console.log(element, arr);
    array = arr.filter(function (value, index, a) {
        return value != element;
    });

    console.log(element, array);


    return array;
}
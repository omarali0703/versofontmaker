const baseSettings = [
    { type: 'select', id: 'blade_type', name: "Blade Type", description: 'The lighting setup for your build. TriCree setups use a single tricree or singlecree LED in the hilt of the saber. NeoPixel builds use a strip of LEDS that are installed inside the blade tube.', options: [{ name: "pixel", description: 'NeoPixel' }, { name: "tricree", description: 'TriCree/Cree LED' }] },
    { type: 'select', id: 'strip_type', name: "Strip Type", description: 'The type of LED strip inside of the blade tube. Consult your LED strip documentation to find out what standard your LED strip uses.', options: [{ name: 'ws2812', description: 'WS2812' }, { name: 'apa102', description: 'APA102' }] },
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

const profileSettings = [
    { type: 'select', id: 'flicker_type', name: 'Flicker Type', options: [{ name: "random", description: 'Random Flicker' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'multi-input-2', id: 'flicker_range', name: 'Transition Time' },
    { type: 'text-input', id: 'flicker_frequency', name: 'Flicker Frequency' },
    { type: 'select', id: 'clash_type', name: 'Clash Type', options: [{ name: "random", description: 'Random Flicker' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'clash_duration', name: 'Clash Duration' },
    { type: 'text-input', id: 'clash_frequency', name: 'Clash Frequency' },
    { type: 'select', id: 'lockup_type', name: 'Lockup Type', options: [{ name: "static", description: 'Static Lockup' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'lockup_frequency', name: 'Lockup Frequency' },
    { type: 'text-input', id: 'lockup_percent', name: 'Lockup Percent' },
    { type: 'text-input', id: 'lockup_centre', name: 'Lockup Centre' },
    { type: 'select', id: 'blaster_type4', name: 'Blaster Type', options: [{ name: "static", description: 'Static Lockup' }, { name: "flash", description: 'Flashing Flicker' }, { name: "fire", description: 'Fire' }] },
    { type: 'text-input', id: 'blaster_duration', name: 'Blaster Duration' },
    { type: 'text-input', id: 'blaster_frequency', name: 'Blaster Frequency' },
    { type: 'text-input', id: 'blaster_percent', name: 'Blaster Percent' },
    { type: 'text-input', id: 'blaster_centre', name: 'Blaster Centre' },
    { type: 'text-input', id: 'blaster_delay', name: 'Blaster Delay' }

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


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
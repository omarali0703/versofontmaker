const about = `This software is offered for free and through good-will. Maintainence is nondeterministic as this is just a passion project. The work is presented as it, with permission from KRSabers to host this to the community. If you have found an issue or a bug, please email: <a href='mailto:omar.ali0703@gmail.com?subject=Bug Report'>me</a> and I will try and get back to you ASAP.
<br>
<br>
Happy Sabesmithing!
<br>
Omar Ali, 2021`;

var currentOptions = {
    colour: [],
    font: [],
    profile: []
};

var doNoShowAgainPresets = true;

window.addEventListener('load', function () {
    var importButton = document.querySelector('.btn-import');
    var exportButton = document.querySelector('.btn-export');
    var shareButton = document.querySelector('.btn-share');
    var createNewConfig = document.querySelector('.btn-new');
    var createNewFont = document.querySelector('.btn-import-font');
    var aboutPopup = document.querySelector('.btn-about');

    importButton.onclick = function () {
        openModal({
            title: 'Import Config', type: 'import', body: `<form class="dropzone" action="/uploadIgnore.php" id="my-awesome-dropzone"></form>`
        });
        var dropzone = new Dropzone("#my-awesome-dropzone", {
            acceptedFiles: '.ini',
            autoProcessQueue: false,
            addRemoveLinks: false
        });

        dropzone.on('error', function (err) {
            toastr.error('Error uploading file.');

        });

        dropzone.on("addedfile", function (file) {
            console.log(file);

            const reader = new FileReader();

            reader.onload = () => {
                toastr.success('File successfully uploaded');
                const fileAsBinaryString = reader.result;
                console.log(fileAsBinaryString);
                processFile(fileAsBinaryString);
            };

            reader.onabort = () => {
                toastr.error('File upload aborted.');
            };

            reader.onerror = () => {
                toastr.error('Error uploading file.');
            }

            reader.readAsBinaryString(file);
            /* Maybe display some more file information on your page */
        });
    }
    exportButton.onclick = function () { /*openModal('Export Config', 'export', '');*/ exportConfig(); }
    shareButton.onclick = function () { openModal({ title: 'Share Config', type: 'share', body: '' }); }
    createNewConfig.onclick = function () {
        openModal({
            title: 'Create New Config', type: 'question', body: 'Are you sure you want to start a new config file?', questionYesEvent: function () {
                initialisePage();
            }
        });
    }
    createNewFont.onclick = function () { openModal({ title: 'Create A New Font', type: 'create-font', body: 'This feature has not yet been implemented.' }); }
    aboutPopup.onclick = function () { openModal({ title: 'About', type: 'about', body: about }); }

    // Toolbox
    let newFont = document.querySelector('.create-font');
    let newEffect = document.querySelector('.create-effect');
    let newColour = document.querySelector('.create-colour');
    let newProfile = document.querySelector('.create-profile');

    initialisePage();

    newFont.addEventListener('click', function () {
        let newestFontElements = document.querySelectorAll('.basesetting-container[config="font"]');
        console.log(newestFontElements);
        newestFontElements = newestFontElements[newestFontElements.length - 1];
        createSetting(`New Font`, fontSettings, 'font', newestFontElements, true);
    });
    /* newEffect.addEventListener('click', function () {
        let newestEffectElements = document.querySelectorAll('.basesetting-container[config="effects"]');
    newestEffectElements = newestEffectElements[newestEffectElements.length-1];
    createSetting('New Effect', effectSettings, 'effects', newestEffectElements, true);
    });*/
    newColour.addEventListener('click', function () {
        let newestColourElements = document.querySelectorAll('.basesetting-container[config="colour"]');
        newestColourElements = newestColourElements[newestColourElements.length - 1];
        createSetting(`New Colour`, colourSettings, 'colour', newestColourElements, true);
    });
    newProfile.addEventListener('click', function () {
        let newestProfileElements = document.querySelectorAll('.basesetting-container[config="profile"]');
        newestProfileElements = newestProfileElements[newestProfileElements.length - 1];
        createSetting(`New Profile`, profileSettings, 'profile', newestProfileElements, true);
    });
});


function createSetting(title, baseSettings, configType, insertNext, deletable) {

    let baseSettingsContainer = document.createElement('div');
    baseSettingsContainer.classList = 'basesetting-container';
    baseSettingsContainer.setAttribute('config', configType);
    baseSettingsContainer.setAttribute('id', 1);

    if (deletable) {
        toastr.success('Successfully added.');

        let currentFontCount = document.querySelectorAll('.basesetting-container[config="font"]').length;
        let currentColourCount = document.querySelectorAll('.basesetting-container[config="colour"]').length;
        let currentEffectCount = document.querySelectorAll('.basesetting-container[config="effects"]').length;
        let currentProfileCount = document.querySelectorAll('.basesetting-container[config="profile"]').length;

        if (configType == 'font') { baseSettingsContainer.setAttribute('id', currentFontCount + 1); }
        if (configType == 'colour') { baseSettingsContainer.setAttribute('id', currentColourCount + 1); }
        if (configType == 'effects') { baseSettingsContainer.setAttribute('id', currentEffectCount + 1); }
        if (configType == 'profile') { baseSettingsContainer.setAttribute('id', currentProfileCount + 1); }

        let closeDeleteIcon = document.createElement('i');
        closeDeleteIcon.classList = 'modal-close fas fa-times-circle';
        let id = baseSettingsContainer.getAttribute('id');
        console.log(id);
        closeDeleteIcon.addEventListener('click', function () {
            openModal({
                title: "Are you sure?", type: 'question', body: 'This process cannot be undone.',
                questionYesEvent: function () {

                    baseSettingsContainer.remove();

                    switch (configType) {
                        case 'font':
                            currentOptions.font = removeElement(id, currentOptions.font);
                            break;
                        case 'profile':
                            currentOptions.profiles = removeElement(id, currentOptions.profile);
                            break;
                        case 'colour':
                            currentOptions.colours = removeElement(id, currentOptions.colour);
                            break;
                    }
                    toastr.success(`Successfully removed ${configType} ${id}.`);

                },

                afterClose: function () {
                    updatePresetDropdowns(configType, true);
                }
            });
        })
        baseSettingsContainer.appendChild(closeDeleteIcon);


    }

    let count = baseSettingsContainer.getAttribute('id');
    console.log(count);
    if (configType != 'base' && configType != 'effects') {
        title += ` (${count})`;
    }


    let containerTitle = document.createElement('div');
    containerTitle.classList = 'container-title';
    containerTitle.textContent = title;
    baseSettingsContainer.appendChild(containerTitle);
    for (let setting of baseSettings) {
        let elementType = setting.type;
        let defaults = setting.default;
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



        if (elementType == 'input' || elementType == 'text-input') { field.value = defaults; }

        if (elementType == 'colour') {
            let colourPicker = generateColourPicker(field);
        }

        if (elementType == 'multi-input-2') {

            let input1 = document.createElement('input');
            let input2 = document.createElement('input');
            if (defaults) {
                input1.value = defaults[0];
                input2.value = defaults[1];
            }
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
        info.style.float = 'right';
        let infoIcon = document.createElement('i');
        infoIcon.classList = 'fas fa-info-circle icon-right icon-blue click';
        info.appendChild(infoIcon);

        info.addEventListener('click', function () {
            openModal({ title: 'Information', type: 'info', body: '' });
            document.querySelector('.modal-inner').textContent = setting.description;
        });

        label.appendChild(info);

        inputGroup.appendChild(label);
        inputGroup.appendChild(field);
        // Add extra mini-editors for effects (and other sections too)


        baseSettingsContainer.appendChild(inputGroup);
    }
    if (configType != 'base' && configType != 'effects') {
        console.log(configType);
        currentOptions[configType].push(count);
    }

    switch (configType) {
        case 'effects':
            generatePresetMaker(baseSettingsContainer);
            break;
    }


    if (insertNext) {
        let parent = document.querySelector('.main-container');

        insertAfter(baseSettingsContainer, insertNext);
    } else {
        document.querySelector('.main-container').appendChild(baseSettingsContainer);
    }

    updatePresetDropdowns(configType, false);

}

function processFile(data) {
    openModal({
        title: 'Import Config', type: 'question', body: 'Are you sure you want to override your current changes with the imported config?', questionYesEvent: function () {
            readFileAndLoadSettings(data);
        }
    });
}

function readFileAndLoadSettings(data) {
    let iniFileData = parseINIString(data);

    console.log(iniFileData);
    initialisePage(iniFileData);
}

function initialisePage(iniFileData = null) {
    document.querySelector('.main-container').innerHTML = '';

    createSetting("Main Saber Settings", baseSettings, 'base', false);
    createSetting("Effects Settings", effectSettings, 'effects', false);
    createSetting("Font", fontSettings, 'font');
    // insertAdd('fonts');
    // insertAdd('effects');
    createSetting("Colour", colourSettings, 'colour', false);
    // insertAdd('colour');
    createSetting("Profile", profileSettings, 'profile', false);
    // insertAdd('profile');

    doNoShowAgainPresets = false;
}

/*function insertAdd(type)
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

}*/



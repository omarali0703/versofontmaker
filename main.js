const about = `This software is offered for free and through good-will. Maintainence is nondeterministic as this is just a passion project. The work is presented as it, with permission from KRSabers to host this to the community. If you have found an issue or a bug, please email: <a href='mailto:omar.ali0703@gmail.com?subject=Bug Report'>me</a> and I will try and get back to you ASAP.
<br>
<br>
Happy Sabesmithing!
<br>
Omar Ali, 2021`;

window.addEventListener('load', function () {
    var importButton = document.querySelector('.btn-import');
    var exportButton = document.querySelector('.btn-export');
    var shareButton = document.querySelector('.btn-share');
    var createNewConfig = document.querySelector('.btn-new');
    var createNewFont = document.querySelector('.btn-import-font');
    var aboutPopup = document.querySelector('.btn-about');

    importButton.onclick = function () { openModal('Import Config', 'import', ''); }
    exportButton.onclick = function () { openModal('Export Config', 'export', ''); }
    shareButton.onclick = function () { openModal('Share Config', 'share', ''); }
    createNewConfig.onclick = function () { openModal('Create New Config', 'create', ''); }
    createNewFont.onclick = function () { openModal('Create A New Font', 'create-font', ''); }
    aboutPopup.onclick = function () { openModal('About', 'about', about); }

    // Toolbox
    let newFont = document.querySelector('.create-font');
    let newEffect = document.querySelector('.create-effect');
    let newColour = document.querySelector('.create-colour');
    let newProfile = document.querySelector('.create-profile');

    initialisePage();

    let newestFontElements = document.querySelectorAll('.basesetting-container[config="font"]');
    console.log(newestFontElements);
    newestFontElements = newestFontElements[newestFontElements.length - 1];
    let newestEffectElements = document.querySelectorAll('.basesetting-container[config="effects"]');
    newestEffectElements = newestEffectElements[newestEffectElements.length - 1];
    let newestColourElements = document.querySelectorAll('.basesetting-container[config="colour"]');
    newestColourElements = newestColourElements[newestColourElements.length - 1];
    let newestProfileElements = document.querySelectorAll('.basesetting-container[config="profile"]');
    newestProfileElements = newestProfileElements[newestProfileElements.length - 1];
    newFont.addEventListener('click', function () {
        createSetting('New Font', fontSettings, 'font', newestFontElements, true);
    });
    newEffect.addEventListener('click', function () {
        createSetting('New Effect', effectSettings, 'effects', newestEffectElements, true);
    });
    newColour.addEventListener('click', function () {
        createSetting('New Colour', colourSettings, 'colour', newestColourElements, true);
    });
    newProfile.addEventListener('click', function () {
        createSetting('New Profile', profileSettings, 'profile', newestProfileElements, true);
    });
});


function createSetting(title, baseSettings, configType, insertNext, deletable) {
    let baseSettingsContainer = document.createElement('div');
    baseSettingsContainer.classList = 'basesetting-container';
    baseSettingsContainer.setAttribute('config', configType);
    if (deletable) {
        let closeDelete = document.createElement('div');
        let closeDeleteIcon = document.createElement('i');
        closeDeleteIcon.classList = 'modal-close fas fa-times-circle';

        closeDeleteIcon.addEventListener('click', function () {
            openModal("Are you sure?", 'question', 'This process cannot be undone.', function () {
                baseSettingsContainer.remove();
                toastr.success('Successfully removed.');

            });
        })
        baseSettingsContainer.appendChild(closeDeleteIcon);
        toastr.success('Successfully added.');

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
        baseSettingsContainer.setAttribute('id', 1);

        if (deletable) {
            let currentFontCount = document.querySelectorAll('.basesetting-container[config="font"]').length;
            let currentColourCount = document.querySelectorAll('.basesetting-container[config="colour"]').length;
            let currentEffectCount = document.querySelectorAll('.basesetting-container[config="effects"]').length;
            let currentProfileCount = document.querySelectorAll('.basesetting-container[config="profile"]').length;

            if (configType == 'font') { baseSettingsContainer.setAttribute('id', currentFontCount + 1); }
            if (configType == 'colour') { baseSettingsContainer.setAttribute('id', currentColourCount + 1); }
            if (configType == 'effects') { baseSettingsContainer.setAttribute('id', currentEffectCount + 1); }
            if (configType == 'profile') { baseSettingsContainer.setAttribute('id', currentProfileCount + 1); }
        }

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
        info.style.float = 'right';
        let infoIcon = document.createElement('i');
        infoIcon.classList = 'fas fa-info-circle icon-right icon-blue click';
        info.appendChild(infoIcon);

        info.addEventListener('click', function () {
            openModal('Information', 'info', '');
            document.querySelector('.modal-inner').textContent = setting.description;
        });

        label.appendChild(info);

        inputGroup.appendChild(label);
        inputGroup.appendChild(field);

        baseSettingsContainer.appendChild(inputGroup);
    }
    if (insertNext) {
        let parent = document.querySelector('.main-container');

        insertAfter(baseSettingsContainer, insertNext);
    } else {
        document.querySelector('.main-container').appendChild(baseSettingsContainer);
    }
}

function initialisePage() {
    createSetting("Main Saber Settings", baseSettings, 'base', false);
    createSetting("Font Settings", fontSettings, 'font');
    // insertAdd('fonts');
    createSetting("Effects Settings", effectSettings, 'effects', false);
    // insertAdd('effects');
    createSetting("Colour Settings", colourSettings, 'colour', false);
    // insertAdd('colour');
    createSetting("Profile Settings", profileSettings, 'profile', false);
    // insertAdd('profile');
}

/*function insertAdd(type) {
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



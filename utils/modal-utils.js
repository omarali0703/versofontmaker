window.addEventListener('load', function () {
    var modal = document.querySelector('.modal');
    var closeBtn = document.querySelector('.modal-close');


    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

});



function openModal(title, type, body = '', questionYesEvent) {
    var modalDescription = document.querySelector('.modal-inner');
    var modalBottom = document.querySelector('.modal-bottom');
    var bottomButtons = modalBottom.querySelector('div.modal-btn-group');
    bottomButtons.innerHTML = "";
    modalDescription.innerHTML = "";
    var modalTitle = document.querySelector('.modal-title')
    var modal = document.querySelector('.modal');
    if (body) {
        modalDescription.innerHTML = body;
    }
    if (type == 'question') {
        let yesButton = createModalButton(bottomButtons, 'Yes', 'fas fa-check-circle', function () {
            questionYesEvent();
            modal.style.display = 'none';
        });
        let noButton = createModalButton(bottomButtons, 'No', 'fas fa-times-circle', function () {
            modal.style.display = 'none';
        });
    }
    modalTitle.textContent = title;
    // switch (type) {
    //     case "export":
    //         break;
    // }

    modal.style.display = 'block';
}

function createModalButton(parent, name, iconClass, clickEvent) {
    let button = document.createElement('div');
    let buttonText = document.createElement('div');
    buttonText.textContent = name;
    button.classList = 'modal-btn';

    if (iconClass) {
        let icon = document.createElement('i');
        let iconSpan = document.createElement('span');
        iconClass += ' icon-right';
        icon.classList = iconClass;
        iconSpan.appendChild(icon);
        buttonText.appendChild(iconSpan);
    }
    button.appendChild(buttonText);


    button.addEventListener('click', clickEvent);
    parent.appendChild(button);
}
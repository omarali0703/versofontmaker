window.addEventListener('load', function () {
    var modal = document.querySelector('.modal');
    var closeBtn = document.querySelector('.modal-close');
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }
});

var modalQueue = [];

function openModal(params) {
    console.log(params)

    modalQueue.push(params);
    let close = true;

    let current = modalQueue.pop();
    if ('close' in current) {
        close = current.close;
    }
    let title = current.title;
    let type = current.type;
    let body = current.body;
    let questionYesEvent = current.questionYesEvent;
    let afterClose = current.afterClose;
    var modalDescription = document.querySelector('.modal-inner');
    var modalBottom = document.querySelector('.modal-bottom');
    var bottomButtons = modalBottom.querySelector('div.modal-btn-group');
    bottomButtons.innerHTML = "";
    modalDescription.innerHTML = "";
    var modalTitle = document.querySelector('.modal-title')
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';

    if (body) {
        modalDescription.innerHTML = body;
    }
    if (type == 'question') {
        let yesButton = createModalButton(bottomButtons, 'Yes', 'fas fa-check-circle', function () {
            questionYesEvent();
            checkHaltedModals();
            if (close) {
                modal.style.display = 'none';
                if (afterClose) {
                    afterClose();
                }
            }
        });
        let noButton = createModalButton(bottomButtons, 'No', 'fas fa-times-circle', function () {
            checkHaltedModals();
            if (close) {
                modal.style.display = 'none';
                if (afterClose) {
                    afterClose();
                }
            }

        });
    } else if (type == 'no-show-again') {
        let tickboxLabel = document.createElement('label');
        tickboxLabel.innerHTML = 'Do not show this dialogue again?';
        let tickContainer = document.createElement('div');
        tickContainer.appendChild(tickboxLabel)
        let tickBox = document.createElement('input');
        tickBox.setAttribute('type', 'checkbox');
        tickContainer.appendChild(tickBox)
        bottomButtons.appendChild(tickContainer);

        tickBox.addEventListener('change', function (e) {
            console.log(tickBox.checked);
            doNoShowAgainPresets = tickBox.checked;
        });
        let yes = createModalButton(bottomButtons, 'Yes', 'fas fa-clipboard-check', function () {
            checkHaltedModals();
            questionYesEvent();
            if (close) {
                modal.style.display = 'none';
                if (afterClose) {
                    afterClose();
                }
            
            }
        });
        let no = createModalButton(bottomButtons, 'No', 'fas fa-clipboard-check', function () {
            checkHaltedModals();
            if (close) {
                modal.style.display = 'none';
                if (afterClose) {
                    afterClose();
                }
            
            }
        });
    }

    modalTitle.textContent = title;
    // switch (type) {
    //     case "export":
    //         break;
    // }

   
    function checkHaltedModals() {
        if (modalQueue.length > 0) { openModal(modalQueue.pop()); }
    }
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
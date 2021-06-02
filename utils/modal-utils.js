window.addEventListener('load', function () {
    var modal = document.querySelector('.modal');
    var closeBtn = document.querySelector('.modal-close');


    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

});



function openModal(title, type) {
    var modalDescription = document.querySelector('.modal-inner');
    modalDescription.innerHTML = "";
    var modalTitle = document.querySelector('.modal-title')
    var modal = document.querySelector('.modal');
    if (type == 'info') {
        modal.querySelector('.modal-btn').style.display = 'none';
    } else {
        modal.querySelector('.modal-btn').style.display = 'unset';
    }
    modalTitle.textContent = title;
    switch (type) {
        case "export":
            exportConfig();
            break;
    }

    modal.style.display = 'block';
}
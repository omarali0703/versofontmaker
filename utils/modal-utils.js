window.addEventListener('load', function(){
    var modal = document.querySelector('.modal');
    var closeBtn = document.querySelector('.modal-close');
    

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
});



function openModal(title, type) {
    var modalTitle = document.querySelector('.modal-title')
    var modal = document.querySelector('.modal');
    
    modalTitle.textContent = title;
    switch (type) {
        case "export":
            exportConfig();
            break;
    }
    
    modal.style.display = 'block';
}
const btnMenu = document.querySelector('#btnMenu')
const sidebar = document.querySelector('.sidebar')

function teste() {
    sidebar.classList.toggle("active")
    // alert('salve')
}

btnMenu.addEventListener('click', teste)
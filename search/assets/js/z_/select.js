const select = document.querySelector('#select') || false
const input = document.querySelector('#search-input')

function changeSearch(){
    parallaxEl.style.backgroundImage = placeholder[select.value].url
    input.setAttribute('placeholder', placeholder[select.value].placeholder)
}

select && select.addEventListener('change', changeSearch) || changeSearch()
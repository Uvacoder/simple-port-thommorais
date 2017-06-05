const select = document.querySelector('#select') || false
const input = document.querySelector('#search-input')

function changeSearch(){
   
    parallaxEl.style.backgroundImage = `url('assets/images/${select.value}.png')`

    input.setAttribute('placeholder', placeholder[select.value])

}

select && select.addEventListener('change', changeSearch) || changeSearch()
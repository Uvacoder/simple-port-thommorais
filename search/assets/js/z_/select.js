const select = document.querySelector('#select') || false
const input = document.querySelector('#search-input')


function changeSearch(){
   
    parallaxEl.style.backgroundImage = `url('assets/images/${select.value}.png')`

    let placeholder = 'Busque pelo nome do local'
   
    if(select.value == 'restaurant')
        placeholder = input.dataset.placeholderrestaurante

    if(select.value == 'hotel')
        placeholder = input.dataset.placeholderhotel

    
    console.log(placeholder)

    input.setAttribute('placeholder', placeholder)

}

select && select.addEventListener('change', changeSearch) || changeSearch()
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
});


let fields = document.querySelectorAll('.field')

for (let field of fields) {

    let input = field.querySelector('input') || field.querySelector('textarea')
    let label = field.querySelector('label')

    if(input){
      input.addEventListener('focus', function() {
          label.classList.add('active')
      })

      input.addEventListener('focusout', function() {

          if (field.value == '')
              label.classList.remove('active')

      })
    }

}


let menu = document.querySelector('.hamburger')

menu.addEventListener('click', () => {
  let body = document.querySelector('body')

  body.classList.toggle('menu-opned')
  menu.classList.toggle('open')

})

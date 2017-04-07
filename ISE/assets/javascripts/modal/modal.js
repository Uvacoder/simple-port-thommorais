
let modal = (date, cal) => {

  let ul = modalHtml.querySelector('#content'),
      h2 = modalHtml.querySelector('h2')

  ul.innerHTML = ''

  modalHtml.classList.add('md-show')
  h2.innerHTML = date

  schedule.filter(x => x.date === date && x.type === cal)
          .map(x => ul.insertAdjacentHTML('beforeend', contentTemplate(x.hour, x.compromise, x.url) ) )

}


let modalHtml = document.querySelector('.md-modal'),
    close     = modalHtml.querySelector('.md-close')

close.addEventListener("click", function(){
  modalHtml.classList.remove('md-show')
})


function contentTemplate( hour, compromise, url) {

  let button = `<i></i>`
  if (url) button = `<a href="${url}" target="_blank">Ler Material</a>`

  return `<li>
              <span class="time">
                ${hour}
              </span>
              <span class="event">
                ${compromise}
              </span>
              ${button}
            </li>`

}

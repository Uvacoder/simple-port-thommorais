/**
  * @desc saving the document to avoid going to much on the DOM
**/
const doc = document

/**
  * @desc create the slider feature to select the covers
  * @param {string} selector of the element
**/
const mySwiper = new Swiper ('.select-cover', {
    loop: false,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
})


const main = new Swiper ('.main', {
  nextButton: '.right',
  prevButton: '.left',
})


/**
  * @desc lock the main slider
**/
main.lockSwipes()

/**
  * @desc hide or show the prev button
**/
main.on('onSlideChangeEnd', () => {
  if(main.activeIndex == 1){
    main.prevButton[0].classList.remove('hidden')
  }else{
    main.prevButton[0].classList.add('hidden')
    toggleButtons()
  }

  uncheckAllCovers()

})

/**
  * @desc unlock the main slider
**/
const unlockSwiper = () => {
  main.unlockSwipes()
  main.nextButton[0].classList.remove('not-yet')
}

/**
  * @desc shows the preview and the name of the picture selected
  * @param {string} selector of the element
**/
const fileUpload = new FileUpload('upload-input')
fileUpload.subscribe(unlockSwiper)


/**
  * @desc add the layer when form is submited
**/

const form = doc.querySelector('form')

const covers = doc.querySelectorAll('[type="radio"]')

/**
  * @desc get the submit button
**/
const submit = doc.querySelector('.to-submit')

function toggleButtons(){
  main.nextButton[0].classList.toggle('off')
  submit.classList.toggle('off')
}

covers.forEach(radio => {
  radio.addEventListener('change', e =>{

    if(e.target.checked){
      toggleButtons()
    }

  })
})

function uncheckAllCovers(){
  covers.forEach(radio => radio.checked = false)
}

form.addEventListener('submit', (e) =>{

  e.preventDefault()
  doc.body.classList.add('uploading')

})

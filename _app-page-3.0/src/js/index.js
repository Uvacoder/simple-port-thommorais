import fonts from './vendors/fontLoader'
import dropDown from './controllers/dropDowns'
import game from './controllers/relatedGameTag'
import lazyLoad from './controllers/lazyLoad'
import carousels from './modules/carouselChunks'
import imagesloaded from 'imagesloaded'

// dropdown to language selector
dropDown('.language-selector')

// lazyLoad
lazyLoad()

// create a new custom element
game()


const splash = document.querySelector('.splash-banner')

imagesloaded(splash, _ => carousels() /* chunk of carousels */ )






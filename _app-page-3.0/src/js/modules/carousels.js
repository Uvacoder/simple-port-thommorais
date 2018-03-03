import powerUpsCarousels from '../controllers/powerUpsCarousels'
import screenshots from '../controllers/screenshotCarousel'

 const obj = {

    // poweUps carousel
    powerUpsCarousels: () => powerUpsCarousels(),

    // screenshots
    screenshots:  () => screenshots()

}

export default obj
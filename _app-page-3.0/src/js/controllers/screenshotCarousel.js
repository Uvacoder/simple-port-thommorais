import Swiper from '../vendors/swiper.esm'
import 'lightgallery.js'

export default () => {

  /**
   * slider of the top
   * @type {Swiper}
   */

  const screenshots = document.querySelector('#screenshots .screenshots')

 new Swiper(screenshots, {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 10,
    preloadImages: false,
    lazy: true,
    watchSlidesVisibility: true,
    breakpoints: {
      480: {
        slidesPerView: 'auto',
        centeredSlides: !0
      }
    }
  })



  /**
   * Gallery 
   * @type {lightGallery}
   */

  // lightGallery(screenshots, {
  //   thumbnail: true
  // })

  /**
   * just to remove opacity 0
   */
  screenshots.classList.add('active')


}

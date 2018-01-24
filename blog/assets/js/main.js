import fonts from './vendors/fontLoader'
import domready from 'domready'
import Swiper from './vendors/swiper.esm'
import {the, all, doc} from './utils'
import lazyLoad from './controller/lazyLoad'
import latestVideos from './controller/latestVideosModal'

domready( () => {

  /**
   * slider of the top
   * @type {Swiper}
   */
  const homeBanner = new Swiper('#slider-home',{
    // init: false,
    slidesPerView	: 2,
    slidesPerGroup: 2,
    spaceBetween: 15,
    navigation: {
        nextEl: '#slider-next',
        prevEl: '#slider-prev',
    },
    watchSlidesVisibility: true,
    preloadImages: false,
    lazy: true
  })

  /**
   *@desc lazyload of all the images
  */
  lazyLoad()

  /**
   *@desc Show modal with video on click in a thumbnail
  */
  latestVideos()
  
})

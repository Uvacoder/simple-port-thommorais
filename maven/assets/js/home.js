import fonts from './vendors/fontLoader'
import domready from 'domready'
import Swiper from './vendors/swiper.esm'
import {the, all, doc} from './utils'
import video from './video'
import lazzyLoad from './lazzyLoad'


domready( () => {

  // slider
  new Swiper('.slider-header',{
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  })

  video()
  lazzyLoad()

  // depoiments
  new Swiper('.slider-depoiments', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    autoplay: {
      delay: 2500,
    }
  })


  const opts = {
    preloadImages: false,
    lazy: true,
    watchSlidesVisibility: true,
    autoplay: {
      delay: 2500,
    }
  }

  // desktop
  new Swiper('.slider-devices', opts)

  // ipad
  new Swiper('.ipad-devices',opts)

  //smartphone
  new Swiper('.smartphones-devices',opts)


  // humans
  new Swiper('.slider-humans', {
    slidesPerView: 'auto',
    lazy: true,
    spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }

  })

})

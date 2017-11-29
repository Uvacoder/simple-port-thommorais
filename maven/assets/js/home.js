import fonts from './vendors/fontLoader'
import domready from 'domready'
import Swiper from './vendors/swiper.esm'
import {the, all, doc} from './utils'
import video from './video'
import lazzyLoad from './lazzyLoad'


domready( () => {

  new Swiper('.slider-header',{
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  })

  video()

  new Swiper('.slider-depoiments', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    autoplay: {
      delay: 2500,
    }
  })

  lazzyLoad()

  // depoiments
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

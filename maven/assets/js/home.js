import fonts from './vendors/fontLoader'
import domready from 'domready'
import Swiper from './vendors/swiper.esm'
import {the, all, doc} from './utils'
import video from './video'

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


  // Lazzy imgs
  const lazys = all('.lazzy')

  const preloadImage = img =>{
    img.src = img.dataset.src
  }

  const config = {
    rootMargin: '50px 0px',
    threshold: 0.01
  }

  const scroll = new IntersectionObserver(onIntersection, config)

  lazys.forEach( lazy => scroll.observe(lazy))

  function onIntersection(entries) {
    // Loop through the entries
    entries.forEach(entry => {
      // Are we in viewport?

      if (entry.intersectionRatio > 0) {
        scroll.unobserve(entry.target)
        preloadImage(entry.target)
      }

    })
  }

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

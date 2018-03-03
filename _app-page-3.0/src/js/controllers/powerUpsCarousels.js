// .motives

import { all, forEach } from '../utils/helpers'
import Swiper from '../vendors/swiper.esm'

export default () => {
  /**
   * slider of the top
   * @type {Swiper}
   */

  const motives = all('.motives, .blog-posts')

  forEach(motives, carousel => {

    let breaks = {}

    if (carousel.id = 'blog-posts') {
     
	     breaks = {
        480: {
          slidesPerView: 1
        },
        667: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        4000: {
          slidesPerView: 4
        }
      }

    } else if (carousel.id = 'motives') {

      breaks = {
        480: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        667: {
          slidesPerView: 2,
          spaceBetween: 80
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 80
        },
        4000: {
          spaceBetween: 80
        }
      }

    }

    new Swiper(carousel, {
      slidesPerView: 3,
      slidesPerGroup: 1,
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      breakpoints: breaks
    })

    carousel.classList.add('active')
    
  })
}

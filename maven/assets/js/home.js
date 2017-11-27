import fonts from './vendors/fontLoader'
import domready from 'domready'
import Swiper from './sliderHeader'
import {the, all, doc} from './utils'

domready( () => {

  new Swiper('.slider-header',{
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  })

  const parts = all('.part')
  const controls = the('.controlers-video')

  let videos = false

  const videoSlider = new Swiper('.slider-videos', {
    init: false,
    autoplay: {
      delay: 2500,
    }
  })

  parts.forEach((part, index) =>{
    part.addEventListener('click', () =>
      videoSlider.slideTo(index, 720, false)
    )
  })

  videoSlider.on('init', () => {
    playPauseVideos(videoSlider.activeIndex)
    upDateMarker(videoSlider.activeIndex)
  })

  videoSlider.on('slideChange', () => {
    upDateMarker(videoSlider.activeIndex)
    playPauseVideos(videoSlider.activeIndex)
  })

  const upDateMarker = index => {
    parts.forEach( (part, index) => {
      part.classList.remove('current')
      controls.classList.remove(`showing-${index}`)
    })
    parts[index].classList.add('current')
    controls.classList.add(`showing-${index}`)
  }

  const playPauseVideos = index => {

    if(!videos){
      videos = all('.slider-videos video')
    }

    videos.forEach( video => video.pause() )
    videos[index].play()
  }

  videoSlider.init()

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

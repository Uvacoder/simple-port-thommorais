import Swiper from './vendors/swiper.esm'
import {the, all, doc} from './utils'

export default function video(){

  const parts = all('.part')
  const controls = the('.controlers-video')

  let videos = false

  const videoSlider = new Swiper('.slider-videos', {
    init: false,
    autoplay: {delay: 2500}
  })

  parts.forEach((part, index) => {
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

}

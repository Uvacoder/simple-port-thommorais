import {the, all, doc} from './utils'
import polyfillIntersectionObserver from './vendors/polyfillIntersectionObserver'

// preload images
export default function lazzyLoad(){

  polyfillIntersectionObserver()

  const lazys = all('.lazzy')

  const preloadImage = img => img.src = img.dataset.src

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

}

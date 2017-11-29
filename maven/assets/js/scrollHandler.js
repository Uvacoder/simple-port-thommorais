import {the, all, doc} from './utils'
import polyfillIntersectionObserver from './vendors/polyfillIntersectionObserver'

const onScroll = element => element.classList.add('visible')

export default function scrollHandler(element, distance){

  polyfillIntersectionObserver()

  const lazys = all(element)

  const config = {
    rootMargin: `${distance}px 0px`,
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
        onScroll(entry.target)
      }

    })

  }

}

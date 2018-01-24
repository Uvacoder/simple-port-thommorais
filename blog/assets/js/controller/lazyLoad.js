import { the, all, doc } from '../utils'
import polyfillIntersectionObserver from '../vendors/polyfillIntersectionObserver'

// preload images
export default function lazzyLoad() {

  /**
   * @description this give support to older browsers that do not support IntersectionObserver
   * @see https://caniuse.com/#feat=intersectionobserver
  **/
  polyfillIntersectionObserver()

  /**
   * [onIntersection description]
   * @param  {[type]} entries [description]
  */
  function onIntersection(entries) {

    entries.forEach(entry => {
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        scroll.unobserve(entry.target)
        preloadImage(entry.target)
      }
    })

  }

  /**
   * instance of the IntersectionObserver
   * @param {[callback]} onIntersection
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  */
  const scroll = new IntersectionObserver(onIntersection, {
    rootMargin: '50px 0px',
    threshold: 0.10
  })

  /**
   * this replace img src with the data-src of the image
   * @param {Element} img DOM node
   */
  const preloadImage = img => {
    img.src = img.dataset.src
    img.classList.add('loaded')
  }

  /**
   * Select all the elements that we want to lazy load.
   */
  const lazys = all('.lazy')

  /**
   * Targeting all selected elements to be observed
  */
  lazys.forEach(lazy => scroll.observe(lazy))

}

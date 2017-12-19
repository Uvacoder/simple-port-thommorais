const doc = document
const the = doc.querySelector.bind(doc)
const all = doc.querySelectorAll.bind(doc)

// Detect request animation frame
const animation = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    }


const getElemOffset = elem => {

  // Width and height of container or element
 /// const width = elem.offsetWidth
  const height = elem.offsetHeight

  // Default top and left position of container or element
  let top = 0
  //let left = 0

  // Get total distance of container or element to document's top and left origin
  do {
    if (!isNaN(elem.offsetTop)) {
      top += elem.offsetTop
    }
    // if (!isNaN(elem.offsetLeft)) {
    //   left += elem.offsetLeft
    // }
  } while ((elem = elem.offsetParent) !== null)

  // Return dimensions and position
  return {height,top}

}


/**
 * @desc Check if is mobile or not
 */
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
}

export { doc, the, all, animation, getElemOffset, isMobile}

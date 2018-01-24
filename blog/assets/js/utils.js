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
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }


const getElemOffset = elem => {

  const width = elem.offsetWidth
  const height = elem.offsetHeight

  let top = 0
  let left = 0

  do {
    if (!isNaN(elem.offsetTop)) {
      top += elem.offsetTop
    }
    if (!isNaN(elem.offsetLeft)) {
      left += elem.offsetLeft
    }
  } while ((elem = elem.offsetParent) !== null)

  return { height, top }

}


function forEach(list, callback) {
  Array.prototype.forEach.call(list, callback)
}


export { doc, the, all, forEach, animation, getElemOffset }

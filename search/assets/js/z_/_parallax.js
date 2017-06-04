function parallax(parallaxEl) {
  
  // page current position
    let scrolledHeight = window.pageYOffset
    
    let limit = parallaxEl.offsetTop + parallaxEl.offsetHeight

    if (scrolledHeight > parallaxEl.offsetTop && scrolledHeight <= limit)
        parallaxEl.style.backgroundPositionY = `${50 - (scrolledHeight - parallaxEl.offsetTop) / 15}%`

    else parallaxEl.style.backgroundPositionY = "50%"

}

const parallaxEl = document.querySelector(".bgplx") || false

window.onscroll = function (event) {
  // if some element that is parallaxed use this.
  parallaxEl && requestAnimationFrame(() => parallax(parallaxEl))
}
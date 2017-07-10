let slides  = isMobile.any() ? 1 : 2

console.log(slides)

const places = new Swiper('.places', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: slides,
    spaceBetween: 10
})

const gallerie = new Swiper('#gallerie', {
    slidesPerView: 'auto',
    spaceBetween: 10
})
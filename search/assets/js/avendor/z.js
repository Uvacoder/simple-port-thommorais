baguetteBox.run('.gallerie')
const places = new Swiper('#places', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 2,
    spaceBetween: 10
})

const gallerie = new Swiper('#gallerie', {
    slidesPerView: 'auto',
    spaceBetween: 10
})
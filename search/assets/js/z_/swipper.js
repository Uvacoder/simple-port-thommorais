const places = new Swiper('#places', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
        480: {
            slidesPerView: 1,
            spaceBetween: 10
        },

        640: {
            slidesPerView: 2,
            spaceBetween: 10
        }
    }
})

const gallerie = new Swiper('#gallerie', {
    slidesPerView: 'auto',
    spaceBetween: 10,

    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10
        }
    }
})
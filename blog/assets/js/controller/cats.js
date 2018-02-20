import Swiper from '../vendors/swiper.esm'

export default () => {

    /**
     * slider of the top
     * @type {Swiper}
    */
    const sliderCat = new Swiper('#slider-cat', {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            nextEl: '#slider-next',
            prevEl: '#slider-prev',
        },
        watchSlidesVisibility: true,
        preloadImages: false,
        lazy: true
    })

}
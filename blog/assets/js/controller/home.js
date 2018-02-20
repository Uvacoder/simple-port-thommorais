import Swiper from '../vendors/swiper.esm'

export default () => {

    /**
     * slider of the top
     * @type {Swiper}
    */

    
    const homeBanner = new Swiper('#slider-home', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
        preloadImages: false,
        lazy: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '#slider-next',
            prevEl: '#slider-prev',
        },
        breakpoints: {
            600: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0
            }
        }
    })

}
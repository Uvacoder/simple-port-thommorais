import Swiper from '../vendors/swiper.esm'

export default () => {

    /**
     * Gallery for single posts :P
     * @type {Swiper}
    */

    const homeBanner = new Swiper('.post-gallery', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true, 
        spaceBetween: 10,
        preloadImages: false,
        watchSlidesVisibility: true,
        autoHeight: true,
        lazy: {
            loadPrevNext: true,
        }
    })


}
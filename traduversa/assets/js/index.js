const doc = document,
      qs  = doc.querySelector.bind(doc),
      qa  = doc.querySelectorAll.bind(doc);


function labelFly(e){

    if(this.value != null){

      this.classList.add('fly-label')

    }else{

      this.classList.remove('fly-label')

    }


}

(function(document, window, domIsReady, undefined) {
  domIsReady(function() {

    /** Carousel **/
    const clients = new Swiper('.clients-carousel', {
      paginationClickable: true,
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 60,
      autoplay: 2500,
      freeMode: true
    })


    const inputs = document.querySelectorAll( '[type="file"]' )

    Array.prototype.forEach.call( inputs, ( input ) => {
    	let label	 = input.nextElementSibling,
    		  labelVal = label.innerHTML

    	input.addEventListener( 'change', function( e ){
    		let fileName = ''

    		if( this.files && this.files.length > 1 )
    			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length )

    		else
    			fileName = e.target.value.split( '\\' ).pop()

    		if( fileName )
    			label.innerHTML = fileName

    		else
    			label.innerHTML = labelVal

    	})

    })


    const labels = document.querySelectorAll( '.has-label')

      Array.prototype.forEach.call( labels, ( label ) => {

        label.addEventListener( 'change', labelFly)
        label.addEventListener( 'keydown', labelFly)

      })

  })
})(document, window, domIsReady)

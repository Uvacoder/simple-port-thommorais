import fonts from './vendors/fontLoader'
// import domready from 'domready'
import mostImportantJSOfAll from './controller/mostImportantJSOfAll'
import home from './controller/home'
import cat from './controller/cats'
import single from './controller/single'
import lazyLoad from './controller/lazyLoad'
import dropDown from './controller/dropDowns'
import { windowResize } from './utils/utils'

//domready( () => {
  /**
   *@desc things to home
  */
  home()

  /**
   *@desc things to categories
  */
  cat()

  /**
   *@desc things to single
  */
  single()

  /*** Shared ***/
  
  /**
   *@desc lazyload of all the images
  */
  lazyLoad()

  /**
   *@desc when window resize run this with debouncing
  */
  windowResize( width =>{

    if(width <= 769){

      // dropdown to post categories
      dropDown('.categories-navigation.drop-down')

      // dropdown to language selector
      dropDown('.language-selector')
      
    }

  })

  mostImportantJSOfAll()

  console.bs()

//})

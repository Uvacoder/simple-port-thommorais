import fonts from './vendors/fontLoader'
import {the, all, doc} from './utils'
import domready from 'domready'
import Tabs from './controlers/Tabs'
import scrollHandler from './scrollHandler'
import lazzyLoad from './lazzyLoad'

domready( () => {

  new Tabs()
  lazzyLoad()
  scrollHandler('.pushs', -50)

})

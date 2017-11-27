import fonts from './vendors/fontLoader'
import {the, all, doc} from './utils'
import domready from 'domready'

import Tabs from './controlers/Tabs'
import ScrollHandler from './controlers/ScrollHandler'

domready( () => new Tabs())

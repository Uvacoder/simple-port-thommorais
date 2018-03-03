import { all, forEach } from '../utils/helpers'
import Cookies from 'js-cookie'

export default _ =>

    forEach(all('.lang-link'), lang => {

        lang.addEventListener('click', e => {
            Cookies.remove("preferred_lang")
            Cookies.set("preferred_lang", lang.dataset.lang, { expires: 99999, path: '/' })
        })

    })
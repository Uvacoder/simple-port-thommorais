import { the, forEach} from '../utils/helpers'
import isMobile from '../utils/isMobile'
import langCookie from './langCookie'

export default selector => {

    if(!selector){
        throw new Error('no selector has passed')
    }

    const trigger = the(selector) ||false

    if(!trigger) return

    trigger.classList.add('ready')

    if (isMobile.any()){

        let flag = 0

        document.addEventListener('touchstart', event => {

            const isClickInside = trigger.contains(event.target)

            if (!isClickInside && flag) {

                trigger.classList.remove('active')
                flag = 0

            } else if (isClickInside) {

                trigger.classList.toggle('active')
                flag = !0

            }

        })


    }

    // Cookie handler to language
    langCookie()

}
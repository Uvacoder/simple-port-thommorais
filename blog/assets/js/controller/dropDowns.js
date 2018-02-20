import { the, all, forEach } from '../utils/helpers'
import classie from '../vendors/classie'

export default selector => {

    if(!selector){
        throw new Error('no selector has passed')
    }

    const triggers = all(selector)

    forEach(triggers, trigger => {
        
        let flag = 0

        classie.add(trigger, 'ready') 

        document.addEventListener('touchstart', event => {

            const isClickInside = trigger.contains(event.target)

            if (!isClickInside && flag) {

                classie.remove(trigger, 'active') 
                flag = 0

            } else if (isClickInside){

                classie.toggle(trigger, 'active')
                flag = 1

            }

        })

    })


}
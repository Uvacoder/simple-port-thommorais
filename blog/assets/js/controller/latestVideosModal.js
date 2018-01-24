import { the, all, doc } from '../utils'

export default function latestVideos(){
    // get all the elements who has a related video 
    const thumbs = all('[data-video]')

    /**
     * @desc Get the dataset of the element and mount the modal with an responsive iframe.
     * @param {event} e 
     */
    const showModal = e => {
        
        e.preventDefault()

        // getting the dataset video
        const videoUrl = e.target.dataset.video
        
        console.log(videoUrl, e.target)        
    }

    /**
     * @desc attach an event listener to each thumb, who will execute the showModals Function
     */
    thumbs.forEach(thumb => thumb.addEventListener('click', showModal, true) )
    
}
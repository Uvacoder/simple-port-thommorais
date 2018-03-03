export default callback => {

    if(!callback){
       console.warn('You need to pass an function as callback to make it work')
       return
    }

    /** 
    *@desc return the callback with the window dimensions
    */
    const dimensions = () => 
        callback(window.innerWidth, window.innerHeight)


    let timeout

    window.addEventListener('resize', _ => { 
        clearTimeout(timeout)
        timeout = setTimeout( dimensions, 250)
    })

    dimensions()
    
}
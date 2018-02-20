export default () => {

    const scripts = ['script']

    const insert = name => {
        const el = document.createElement("script")
        el.src = `public/${name}.js`
        el.async = true
        document.head.appendChild(el)
    }
    
    scripts.forEach(insert)

}
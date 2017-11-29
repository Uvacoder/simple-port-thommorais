import animation  from '../utils'

class ScrollHandler {

    init(options) {
        this.after = options.after || function(){}
        this.before = options.before || function(){}
        this.max = options.max || 0
        this.min = options.min || 0
        this.lastPosY = window.pageYOffset
        this.loop()
    }

    callback() {
        if (this.lastPosY >= this.max) {
            this.after()
        }

        if (this.lastPosY <= this.min) {
            this.before()
        }

    }

    loop() {
        let scrollTop = window.pageYOffset

        if (this.lastPosY === scrollTop) {
            animation(this.loop.bind(this))
            return
        } else {
            this.lastPosY = scrollTop
            this.callback()
            animation(this.loop.bind(this))
        }

    }

    stop(name) {
        this.loop  = () => null
    }

}

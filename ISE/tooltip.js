let $ = document.querySelector.bind(document)


class Tooltip {

    constructor(target, data) {

        this.body = $('body')
        this.data = data
        this.target = document.querySelector(target)
        this.pos = this.target.getBoundingClientRect()
    }

    init() {

        this.target.addEventListener('click', this._onElementMouseIn.bind(this))
        this.target.addEventListener('mouseover', this._onElementMouseIn.bind(this))
        this.target.addEventListener('mouseout', this._onElementMouseOut.bind(this))

    }

    _onElementMouseIn() {

        this.removeToolTip()
        this.body.insertAdjacentHTML('beforeend', this.toolTipElement())
    }

    _onElementMouseOut() {

        this.removeToolTip()
    }

    removeToolTip() {
        let s = document.querySelector('.new-tip') || false
        if (s) s.remove()

    }

    toolTipElement() {

        return `<div class="new-tip" style=" position: absolute; top: ${this.pos.bottom + 10}px; left: ${this.pos.left + (this.pos.width / 2)}px">
              <div class="content">
                <ul>${
                  this.data.map(
                    x =>`<li><strong class="key">${x.key}</strong><span class="value">${x.value}</span></li>`
                  ).join('')
                }</ul>
              </div>
            </div>`
    }

}

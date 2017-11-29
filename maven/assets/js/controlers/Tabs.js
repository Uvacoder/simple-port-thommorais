import {the, all, doc} from '../utils'

export default class Tabs{

  constructor(){

    this.cnt = the('.tabs') || false

    if(!this.cnt) return

    this.triggers = this.cnt.querySelectorAll('.tabber li')
    this.tabs = this.cnt.querySelectorAll('.tab')
    this.controler = []
    this.init()
  }

  init(){

    this.triggers.forEach(trigger => {

      const selector = trigger.dataset.tab
      const tab = the(`.tab[data-tab=${selector}]`)
      this.controler.push({trigger, tab, selector})

      trigger.addEventListener('click', () => {
         this.tabIt(selector)
         this.updateHash(selector)
      })

    })

    const hash = window.location.hash || false

    if(hash){
      const selector = hash.replace("#", "")
      this.tabIt(selector)
    }

  }

  updateHash(selector){
    window.location.hash = selector
  }

  tabIt(selector){

    this.controler.filter(e => e.selector === selector).forEach(active => {
      active.tab.classList.add('active')
      active.trigger.classList.add('active')
    })

    this.controler.filter(e => e.selector !== selector).forEach(inactive => {
      inactive.tab.classList.remove('active')
      inactive.trigger.classList.remove('active')
    })



  }

}

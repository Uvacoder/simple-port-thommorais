let options = {
  useEasing : true,
  useGrouping : true,
  separator : '.',
  decimal : ',',
  prefix : '',
  suffix : '%'
}

const body = document.querySelector('body')

function isInt(n) {
   return n % 1 === 0;
}

const els = body.querySelectorAll('.collum ul li strong')

for(el of els){
    let i = 1

    if(isInt(el.dataset.final)){
      i = 0
    }

   let demo = new CountUp(el, 0, el.dataset.final, i, 2.5, options);
    demo.start()
}


const countThis = body.querySelectorAll('.count-this')
options.suffix = 0;

for(el of countThis){
    let i = 1
    if(isInt(el.dataset.final)){
      i = 0
    }

   let demo = new CountUp(el, 100, el.dataset.final, i, 2.5, options);
    demo.start()
}

imagesLoaded(body, function() {

      var shuttles = anime({
        targets: '.shuttle',
        translateY: -73,
        translateX:  anime.random(0, 40),
        rotate: 17,
        loop: true,
        elasticity: 800,
        direction: 'alternate',
        duration: function(target) {
          return target.getAttribute('data-duration') * 100
        }

      })

      var ballons = anime({

        targets: '.ballon',
        translateY: - anime.random(0, 80),
        opacity: .6,
        loop: true,
        opacity: 0,
        easing: 'easeInCubic',
        direction: 'alternate',
        loop: true,

        delay: function(target, index) {
          return index * 72
        },

        duration: function(el, i, l) {
          return 720 + (i * 10);
        }

      })



})

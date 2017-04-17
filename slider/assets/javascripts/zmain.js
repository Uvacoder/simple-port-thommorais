// const mySiema = new Tuto()

var swiper = new Swiper('.siema')


swiper.on('onSlideChangeEnd', function () {
    console.log('slide change start')
})

const nxts = document.querySelectorAll('.next')
const skip = document.querySelectorAll('.skip')

for(let nxt of nxts) nxt.addEventListener('click', () => swiper.slideNext(true, 420 ) )


for(let skp of skip) skp.addEventListener('click', (e) =>{
    e.preventDefault() 
    document.querySelector('#tutorial').remove()
})


// vish.
$(function(){
    $('#news-form').on('submit',function(event){
        event.preventDefault() ;


        var email = document.getElementById('txt_email').value || false
        var empresa =  document.getElementById('txt_empresa').value || false
        var nome =  document.getElementById('txt_nome').value || false


        //RD Station
        var data_array = [
            { name: 'email', value: email },
            { name: 'empresa', value: empresa },
            { name: 'nome', value: nome },
            { name: 'identificador', value: 'revista-itforum' },
            //{ name: 'tags', value: 'inscritoITFE16, congressistaITFE16' },
            { name: 'token_rdstation', value: '8c1b156ad0ada2a2fc9bc21447633fa1' }
        ];

        if(email == false){
            alert('Por favor preencher o campo email')
        }

        if(empresa == false){
            alert('Por favor preencher o campo empresa')
        }

        if(nome == false){
            alert('Por favor preencher o campo nome')
        }
        
        if(nome, empresa, email){
            RdIntegration.post(data_array);
            alert('Obrigado por se inscrever! :)');
            document.querySelector('#tutorial').remove()
        }

    });
});

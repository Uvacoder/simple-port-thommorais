const mySiema = new Tuto()
const nxts = document.querySelectorAll('.next')
const skip = document.querySelectorAll('.skip')



for(let nxt of nxts) nxt.addEventListener('click', () => mySiema.next() )

for(let skp of skip) skp.addEventListener('click', (e) =>{
    e.preventDefault() 
    document.querySelector('#tuto').remove()
})



// vish.
$(function(){
    $('#news-form').on('submit',function(event){
        event.preventDefault() ;

        //RD Station
        var data_array = [
        { name: 'email', value: document.getElementById('txt_email').value },
        { name: 'empresa', value: document.getElementById('txt_empresa').value },
        { name: 'nome', value: document.getElementById('txt_nome').value },
        { name: 'identificador', value: 'revista-itforum' },
        //{ name: 'tags', value: 'inscritoITFE16, congressistaITFE16' },
        { name: 'token_rdstation', value: '8c1b156ad0ada2a2fc9bc21447633fa1' }
        ];

        RdIntegration.post(data_array);
        alert('Obrigado por se inscrever! :)');
    });
});
let fontController
document.addEventListener("DOMContentLoaded", () => {

	fontController =  Array.from(document.querySelectorAll('.font-regulator'))

})


function mudaFonte(plusOrMinus) {

	fontController.map(e => {

		let size = parseFloat(window.getComputedStyle(e, null).getPropertyValue('font-size'))

		if (plusOrMinus == '+' && size < 20)
			e.style.fontSize = `${size + 1}px`
		else if (plusOrMinus == '-' && size > 8)
			e.style.fontSize = `${size - 1}px`
		else if (plusOrMinus != '-' && plusOrMinus != '+')
			console.warn('Você precisa passar - ou +')
		else
			console.warn('Limite do tamanho da fonte alcançado')

	})

}
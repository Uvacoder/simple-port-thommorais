const isMobile = {
	Android: () => {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: () => {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: () => {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: () => {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: () => {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
	},
	any: () => {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
	}
}

const DOM = document,
	d = DOM.querySelector.bind(DOM),
	dd = DOM.querySelectorAll.bind(DOM)

if (isMobile.any()) {

	const body = d('body'),
		  mobi = body.querySelector("#mobile"),
			 i = DOM.createElement("i")

	mobi.appendChild(i)
	mobi.addEventListener('click', openMenu)

	function openMenu() {
		body.classList.toggle('menu-open')
	}
	
}

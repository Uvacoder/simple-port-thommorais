class FileUpload{

	constructor(uploads){

		this.inputs = document.querySelectorAll(`.${uploads}`)
		this.label 	= ''
		this.reader = ''
		this.input 	= ''
    this.observers = []

		this._binder()
	}

	_binder(){
		Array.prototype.forEach.call(this.inputs, inp =>
			inp.addEventListener('change', this._addPreview.bind(this))
		)
	}

	_addPreview(event){

		this.input = event.target
		this.reader = new FileReader()

    if(this.input.files && this.input.files[0]){

      this.reader.onload = (e) => {

        let img = document.createElement('img'),
						fig = document.querySelector('figure')

        img.setAttribute('src', e.target.result)
        fig.innerHTML = ''
        fig.appendChild(img)

      }

	    this.reader.readAsDataURL(this.input.files[0])
			this._addName(this.input)

      this.notify(true)

		}

	}

	_addName(input){

		let label		 = input.nextElementSibling,
				labelVal = label.innerHTML,
				fileName = input.value.split( '\\' ).pop()

		if(fileName)
			label.querySelector('strong').innerHTML = fileName
		else
			label.innerHTML = labelVal

	}

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }

  subscribe(f) {
    this.observers.push(f)
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f)
  }


}

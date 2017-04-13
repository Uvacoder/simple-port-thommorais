function loadJSON(file) {

    return new Promise((resolve, reject) => {

        var xobj = new XMLHttpRequest()
        xobj.overrideMimeType("application/json")
        xobj.open('GET', file, true)
        xobj.onreadystatechange = function () {

            if (xobj.readyState == 4 && xobj.status == "200") {
                if (xobj.status == 200) resolve(JSON.parse(xobj.responseText))
                else reject(Error(xobj.statusText))

            }
        }

        xobj.send(null)
    })
}

// shortcut to select DOM elements
var d = document.querySelector.bind(document)

// caching the article template
var clone = '',
    articleTemplate  = d('#articleJson'),
            article = articleTemplate.content.querySelector('article'),
            titule  = articleTemplate.content.querySelector('h1'),
            hat     = articleTemplate.content.querySelector('h3'),
            date    = articleTemplate.content.querySelector('time span'),
            subject = articleTemplate.content.querySelector('.assunto'),
            content = articleTemplate.content.querySelector('.article-wrp')

loadJSON(article_json)
    .then(response => {

        let art = response.data

        titule.innerHTML  =  art.titulo
        hat.innerHTML     =  art.chapeu
        date.innerHTML    =  art.dt_publi
        subject.innerHTML =  art.assunto
        content.innerHTML =  art.conteudo

        clone = document.importNode(articleTemplate.content, true)
        document.querySelector('body').appendChild(clone)

    })

// caching the article item template

var newsTemplate        = d('#newsItem'),
            item        = newsTemplate.content.querySelector('article'),
            itemTitle   = newsTemplate.content.querySelector('h2'),
            itemHat     = newsTemplate.content.querySelector('h3'),
            itemDate    = newsTemplate.content.querySelector('time span')

loadJSON(news_json)
    .then(response => {
        let list = response.data.campos.lista

        Object.keys(list).forEach( i => {
            
            console.log(list[i].campos.info)

            itemTitle.innerHTML   =  list[i].campos.info.titulo
            itemHat.innerHTML     =  list[i].campos.info.apoio
            itemDate.innerHTML    =  list[i].campos.info.hora


            clone = document.importNode(newsTemplate.content, true)
            document.querySelector('body').appendChild(clone)

        })

    })

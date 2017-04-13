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

// caching the article template
var d = document.querySelector.bind(document)
var clone = '',
    articleTemplate  = d('#articleJson'),
            article = articleTemplate.content.querySelector('article'),
            titule  = articleTemplate.content.querySelector('h1'),
            hat     = articleTemplate.content.querySelector('h3'),
            date    = articleTemplate.content.querySelector('time'),
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


var newsTemplate    = d('#newsItem'),
            item    = newsTemplate.content.querySelector('article'),
            titule  = newsTemplate.content.querySelector('h2'),
            hat     = newsTemplate.content.querySelector('h3'),
            date    = newsTemplate.content.querySelector('time')

loadJSON(news_json)
    .then(response => {
        let list = response.data.campos.lista

        Object.keys(list).forEach( i => {

            item.innerHTML    =  list[i].campos.info.titulo
            hat.innerHTML     =  list[i].campos.info.chapeu
            date.innerHTML    =  list[i].campos.info.dt_publi
            subject.innerHTML =  list[i].campos.info.assunto
            content.innerHTML =  list[i].campos.info.conteudo

            clone = document.importNode(newsTemplate.content, true)
            document.querySelector('body').appendChild(clone)

        })

    })

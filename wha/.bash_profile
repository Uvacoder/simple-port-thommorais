alias meta="chrome-cli execute 'var meta = document.createElement(\"meta\");meta.setAttribute(\"name\", \"viewport\"); meta.setAttribute(\"content\", \"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"); document.getElementsByTagName(\"head\")[0].appendChild(meta)' -t 258"

alias css="chrome-cli execute 'var css = document.createElement(\"link\"); var link = \"http://localhost/thommorais.github.io/wha/public/style.css\";css.setAttribute(\"rel\", \"stylesheet\"); css.setAttribute(\"href\", link); document.getElementsByTagName(\"head\")[0].appendChild(css)' -t 258"

alias menu="chrome-cli execute 'var mobi = document.querySelector(\"#mobile\");const i = document.createElement(\"i\");mobi.appendChild(i)' -t 258"


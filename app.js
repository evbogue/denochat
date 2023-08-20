import { h } from './lib/misc.js'
import { ws } from './ws.js'
import { composer } from './composer.js'
import { render } from './render.js'

ws.onmessage = (msg) => {
  render(JSON.parse(msg.data)).then(div => {
    if (scroller.firstChild) {
      scroller.insertBefore(div, scroller.firstChild)
    } else {
      scroller.appendChild(div)
    }
  })
}

const screen = h('div', {classList: 'contain'})

const scroller = h('div')

document.body.appendChild(screen)

screen.appendChild(composer)
screen.appendChild(scroller)

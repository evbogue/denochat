import { h } from './lib/misc.js'
import { keybox } from './keybox.js'
import { nickbox } from './nickbox.js'

const proto = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
const server = [proto + window.location.host + '/ws']

const ws = new WebSocket(server)

let nickname = localStorage.getItem('nickname') || 'Guest'

ws.binaryType = 'arrayBuffer'

ws.onopen = () => {
  ws.send(nickname + ' connected.')
}

ws.onmessage = (msg) => {
  const message = h('div', {classList: 'message'}, [msg.data])
  if (scroller.firstChild) {
    scroller.insertBefore(message, scroller.firstChild)
  } else {
    scroller.appendChild(message)
  }
  console.log(msg.data)
}

const screen = h('div')

document.body.appendChild(screen)

const textarea = h('textarea', {placeholder: 'Write something'})

const composer = h('div', [
  nickbox,
  keybox,
  textarea,
  h('button', {onclick: function () {
    ws.send(localStorage.getItem('nickname') + ' | ' + textarea.value)
    textarea.value = ''
  }}, ['Send'])
])

screen.appendChild(composer)

const scroller = h('div')

screen.appendChild(scroller)

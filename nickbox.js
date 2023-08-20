import { h } from './lib/misc.js'
import { ws } from './ws.js'
import { publish } from './bog.js'

const nick = h('input', {placeholder: 'Nickname'})

const empty = h('span')

const getNick = localStorage.getItem('nickname')

if (getNick) {
  nick.value = getNick
}

export const nickbox = h('div', [
  nick, 
  h('button', {
    onclick: function () {
      if (nick.value) {
        publish(nick.value, localStorage.getItem('key')).then(msg => {
          const obj = {type: 'nick', bog: msg}
          ws.send(JSON.stringify(obj))
        })
        localStorage.setItem('nickname', nick.value)
        empty.textContent = ' ✅'
      }
    }
  }, ['Set Nickname']),
  empty
])

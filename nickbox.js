import { h } from './lib/misc.js'

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
      localStorage.setItem('nickname', nick.value)
      empty.textContent = ' ✅'
    }
  }, ['Set']),
  empty
])

import { keys } from './key.js'
import { h } from './lib/misc.js'

const textarea = h('textarea', {style: 'width: 100%;'}, [keys])

const editkey  = h('div', [
  textarea,
  h('br'),
  h('button', { onclick: function () {
    if (textarea.value.length === keys.length) {
      localStorage.setItem('key', textarea.value)
      window.location.reload()
    } else {
      alert('Key is not the right length.')
    }
  }}, ['Save']),
  h('button', {onclick: function () {
    localStorage.removeItem('key')
    window.location.reload()
  }}, ['Regenerate'])
])

function editKey () {
  composer.parentNode.replaceChild(editkey, composer)
}

const pubkey = h('span', [keys.substring(0, 44)])

const div = h('div', [
  pubkey,
  h('button', {onclick: editKey}, ['Edit'])
])

export const keybox = h('div', {id: 'composer'}, [div])


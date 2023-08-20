import { ws } from './ws.js'
import { h } from './lib/misc.js'
import { nickbox } from './nickbox.js'
import { keybox } from './keybox.js'
import { publish, open } from './bog.js'
import { find } from './blob.js'

const textarea = h('textarea', {placeholder: 'Write something'})

export const composer = h('div', [
  nickbox,
  keybox,
  textarea,
  h('button', {onclick: async function () {
    if (textarea.value) {
      const msg = await publish(textarea.value, localStorage.getItem('key'))
      const obj = {type: 'post', bog: msg}
      ws.send(JSON.stringify(obj))
      textarea.value = ''
    }
  }}, ['Send'])
])


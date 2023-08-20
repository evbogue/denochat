import { h, human } from './lib/misc.js'
import { open } from './bog.js'

export async function render (msg) {
  const opened = await open(msg.bog)

  const timestamp = h('span', [human(new Date(opened.timestamp))])

  setInterval(function () {
    timestamp.textContent = human(new Date(opened.timestamp))
  }, 10000)

  const author = h('span', [opened.author.substring(0, 10) + '...'])

  const content = h('div', [opened.text])

  const raw = h('pre', {id: 'raw:' + opened.hash}, [JSON.stringify(opened)])

  const rawButton = h('a', {href: '', onclick: function (ev) {
    ev.preventDefault()
    const got = document.getElementById('raw:' + opened.hash)
    if (got) {
      got.parentNode.removeChild(got)
    } else {
      div.appendChild(raw)
    }
  }}, ['raw'])
  
  const div = h('div', {classList: 'message'}, [
    h('span', {style: 'float: right;'}, [
      rawButton,
      ' ',
      timestamp,
    ]),
    author,
    content
  ])

  return div
}

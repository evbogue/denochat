import { publish, open } from './bog.js'
import { find } from './blob.js'

const proto = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
const server = [proto + window.location.host + '/ws']

export const ws = new WebSocket(server)

let nickname = localStorage.getItem('nickname') || 'Guest'

ws.binaryType = 'arrayBuffer'

ws.onopen = async function () {
  const msg = await publish(nickname + ' connected', localStorage.getItem('key'))
  const obj = {type: 'nick', bog: msg} 
  ws.send(JSON.stringify(obj))
}


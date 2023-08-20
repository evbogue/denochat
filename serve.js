import { serveDir } from 'https://deno.land/std@0.196.0/http/file_server.ts'

const sockets = new Set()

const channel = new BroadcastChannel('')

channel.onmessage = e => {
  (e.target != channel) && channel.postMessage(e.data)
  sockets.forEach(s => s.send(e.data))
  console.log(e.data)
}

Deno.serve((r) => {
  try {
    const { socket, response } = Deno.upgradeWebSocket(r)
    sockets.add(socket)
    socket.onmessage = channel.onmessage
    socket.onclose = _ => sockets.delete(socket)
    return response
  } catch {
    return serveDir(r, {fsRoot: '', showDirListing: true, quiet: true})
  }
})

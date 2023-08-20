import nacl from './lib/nacl-fast-es.js'
import { decode, encode } from './lib/base64.js'
import { make, find } from './blob.js'

export async function publish (data, key) {
  let pubkey
  let privkey  

  if (key) {
    pubkey = key.substring(0, 44)
    privkey = key.substring(44)
  }

  const datahash = await make(data)

  const timestamp = Date.now()

  const msg = timestamp + pubkey + datahash

  const hash = encode(
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(msg))
      )
    )
  )

  const previous = hash

  const next = msg + previous + hash
  
  const sig = encode(nacl.sign(new TextEncoder().encode(next), decode(privkey)))

  const done = pubkey + sig
  return done
}

export async function open (msg) {
  console.log(msg)
  const opened = new TextDecoder().decode(nacl.sign.open(decode(msg.substring(44)), decode(msg.substring(0, 44))))

  const obj = {
    timestamp: parseInt(opened.substring(0, 13)),
    author: opened.substring(13, 57),
    hash : opened.substring(145),
    previous: opened.substring(101, 145),
    data: opened.substring(57, 101),
    raw: msg
  }

  //should be at render? obj.text = await find(obj.data)
  obj.text = await find(obj.data)

  return obj
}


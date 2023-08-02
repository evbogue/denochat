import nacl from './lib/nacl-fast-es.js'
import { decode, encode } from './lib/base64.js'

export let keys

let keypair = localStorage.getItem('key')

console.log(keypair)

if (!keypair) {
  const genkey = nacl.sign.keyPair()
  keypair = encode(genkey.publicKey) + encode(genkey.secretKey)
  localStorage.setItem('key', keypair)
}

console.log(keypair)

keys = keypair



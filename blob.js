import { encode } from "./lib/base64.js"

export async function make(file) {
  const hash = encode(
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(file))
      )
    )
  )
  localStorage.setItem(hash, file)
  return hash
}

export async function find(hash) {
  const file = localStorage.getItem(hash)

  console.log(file)

  if (file) {
    
    return file
  }
}

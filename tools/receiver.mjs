// Dev-only capture receiver. Lets a page open in the user's own Chrome POST
// measurement dumps / assets to disk (bypasses the size limit of tool output).
// Usage: node tools/receiver.mjs   (listens on 127.0.0.1:5199)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(new URL('..', import.meta.url).pathname)
const OUT = path.join(ROOT, 'tools', 'captures')
fs.mkdirSync(OUT, { recursive: true })

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Private-Network': 'true',
}

http
  .createServer((req, res) => {
    if (req.method === 'OPTIONS') return res.writeHead(204, cors).end()
    const url = new URL(req.url, 'http://x')
    // name is relative to tools/captures; ".." is rejected
    const name = url.searchParams.get('name') || 'dump.bin'
    if (name.includes('..') || path.isAbsolute(name)) return res.writeHead(400, cors).end('bad name')
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const file = path.join(OUT, name)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      let body = Buffer.concat(chunks)
      // form-encoded upload (used by pages that cannot fetch() to loopback):
      // field "d" holds base64 of the payload
      if ((req.headers['content-type'] || '').startsWith('application/x-www-form-urlencoded')) {
        body = Buffer.from(new URLSearchParams(body.toString()).get('d') || '', 'base64')
      }
      fs.writeFileSync(file, body)
      res.writeHead(200, cors).end('ok')
    })
  })
  .listen(5199, '127.0.0.1', () => console.log('receiver on 5199'))

/* Lossless PNG re-compression for the images the scripts here write.
   Chromium encodes screenshots fast, not small: deflating the same pixel data
   again at the highest level takes about a tenth off the file. */
import { crc32, deflateSync, inflateSync } from 'node:zlib'

const SIGNATURE_LENGTH = 8
/** Length (4 bytes) and type (4 bytes) before a chunk's data, and the CRC (4 bytes) after it. */
const CHUNK_HEAD = 8
const CHUNK_OVERHEAD = 12

function chunk(type, data) {
  const typed = Buffer.concat([Buffer.from(type, 'latin1'), data])
  const out = Buffer.alloc(CHUNK_OVERHEAD + data.length)
  out.writeUInt32BE(data.length, 0)
  typed.copy(out, 4)
  out.writeUInt32BE(crc32(typed), CHUNK_HEAD + data.length)
  return out
}

/** Returns the same image with its pixel data deflated at level 9, in one IDAT chunk. */
export function compressPng(png) {
  const before = []
  const pixels = []
  const after = []
  for (let offset = SIGNATURE_LENGTH; offset < png.length; ) {
    const length = png.readUInt32BE(offset)
    const end = offset + CHUNK_OVERHEAD + length
    if (png.toString('latin1', offset + 4, offset + CHUNK_HEAD) === 'IDAT') {
      pixels.push(png.subarray(offset + CHUNK_HEAD, offset + CHUNK_HEAD + length))
    } else {
      ;(pixels.length === 0 ? before : after).push(png.subarray(offset, end))
    }
    offset = end
  }
  if (pixels.length === 0) throw new Error('png: no IDAT chunk to compress')
  const deflated = deflateSync(inflateSync(Buffer.concat(pixels)), { level: 9, memLevel: 9 })
  return Buffer.concat([png.subarray(0, SIGNATURE_LENGTH), ...before, chunk('IDAT', deflated), ...after])
}

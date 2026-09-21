import { ROOMS, PHOTO_DIR } from './photos.js'

// Flat list of the 43 gallery photos in tour order.
export const PHOTOS = ROOMS.flatMap((room, roomIndex) =>
  room.photos.map((file) => ({ file, src: PHOTO_DIR + file, room: room.title, roomIndex })),
)
export const PHOTO_COUNT = PHOTOS.length
// Global index of the first photo in each room.
export const ROOM_START = ROOMS.map((_, i) => PHOTOS.findIndex((p) => p.roomIndex === i))
export const roomOfFile = (file) => PHOTOS.find((p) => p.file === file)?.roomIndex ?? 0

// Splits a room's photos into rows following its measured layout:
// "L" = one wide tile, a run of "s" = small tiles two per row.
export function roomRows(roomIndex) {
  const room = ROOMS[roomIndex]
  const rows = []
  let smalls = []
  const flush = () => { if (smalls.length) rows.push({ type: 's', items: smalls }); smalls = [] }
  ;[...room.layout].forEach((kind, k) => {
    const idx = ROOM_START[roomIndex] + k
    if (kind === 'L') { flush(); rows.push({ type: 'L', items: [idx] }) } else smalls.push(idx)
  })
  flush()
  return rows
}

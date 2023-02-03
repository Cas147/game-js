/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🎁',
  'L' : '❤️',
  "R": '👑',
  'PLAYER': '🕵️‍♂️',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART' : '❤️'
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXXI---XX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O-----XXXX
  X-XXX-XXXX
  X------XXX
  XX-XX-XXXX
  XX-RX--XXX
  XX-XXX-XXX
  XX--X--XXX
  XX-XX-XXXX
  X--XX--IXX
  XXXXXXXXXX
`);
maps.push(`
  XX--IX--XX
  XX-XXLXXXX
  XX--X--XXX
  X--XX--XXX
  X-XXX--XXX
  X--XXX-X-X
  XX--X--X-X
  XX-XX-----
  X--XX-XXX-
  XX-----XXO
`);
maps.push(`
  XX--OX--XX
  XX-----XXX
  XX--X--XXX
  X--XX--XXX
  X-XXXX-XIX
  X--XXX-X-X
  XX--X-XX-X
  XX-XX----X
  X--XX-XXXX
  XX----XXXX
`);
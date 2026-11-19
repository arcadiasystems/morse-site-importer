const CODE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-',
  V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
}

export type MorseSymbol = 'dot' | 'dash'

/** One word in Morse: a list of letters, each a list of dots and dashes. Characters outside A to Z drop out. */
export function morseLetters(word: string): MorseSymbol[][] {
  return [...word.toUpperCase()]
    .map(letter => CODE[letter])
    .filter(code => code !== undefined)
    .map(code => [...code].map(symbol => (symbol === '.' ? 'dot' : 'dash')))
}

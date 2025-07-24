export function getFirstLetters(name: string) {
  const words = name.trim().split(' ')

  let firstLetters = ''
  if (words.length === 1) {
    firstLetters = name.trim().slice(0, 2)
  }

  if (words.length >= 2) {
    firstLetters = words[0].slice(0, 1) + words[1].slice(0, 1)
  }

  return firstLetters.toUpperCase()
}

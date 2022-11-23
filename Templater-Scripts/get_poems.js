async function get_poems () {
  const response = await fetch("https://v1.jinrishici.com/all.json")
  const data = await response.json()
  const result = data.content.replace(/([，。；？！])/g, '$1  \n')
            + '\n\n—— '+data.author+'  \n'
            + '《'+data.origin+'》'
  return result.replace(/\n{3,}/g, '\n\n').split(/\n/g).map(e=>'> '+e+'\n').join('')
}
module.exports = get_poems;
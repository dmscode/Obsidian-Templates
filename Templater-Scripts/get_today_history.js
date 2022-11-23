async function get_today_history () {
  const response = await fetch("https://api.oick.cn/lishi/api.php")
  const data = await response.json()
  let result = ''
  data.result.map(e=> result += '- '+e.date+' '+e.title+'\n')
  return result
}
module.exports = get_today_history;
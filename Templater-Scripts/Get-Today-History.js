/*
 * @Author          : 稻米鼠
 * @Date            : 2022-11-22 13:18:46
 * @LastEditTime    : 2022-11-25 08:51:51
 * @FilePath        : \ob-templates\Templater-Scripts\Get-Today-History.js
 * @Description     : 
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
async function get_today_history () {
  const response = await fetch("https://api.oick.cn/lishi/api.php")
  const data = await response.json()
  let result = ''
  data.result.map(e=> result += '- '+e.date+' '+e.title+'\n')
  return result
}
module.exports = get_today_history;
/*
 * @Author          : 稻米鼠
 * @Date            : 2022-11-22 13:18:46
 * @LastEditTime    : 2022-11-25 08:51:55
 * @FilePath        : \ob-templates\Templater-Scripts\Get-Weather.js
 * @Description     : 
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
async function get_weather (city='beijing', format="天气：%c %C 气温：%t 风力：%w  \\n月相：%m 日出时间：%S 日落时间：%s") {
  const response = await fetch("https://wttr.in/"+city+"?Tm2&lang=zh-cn&format="+format)
  const data = await response.text()
  return data
}
module.exports = get_weather;
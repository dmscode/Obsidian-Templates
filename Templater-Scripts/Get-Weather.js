async function get_weather (city='beijing', format="天气：%c %C 气温：%t 风力：%w  \\n月相：%m 日出时间：%S 日落时间：%s") {
  const response = await fetch("https://wttr.in/"+city+"?Tm2&lang=zh-cn&format="+format)
  const data = await response.text()
  return data
}
module.exports = get_weather;
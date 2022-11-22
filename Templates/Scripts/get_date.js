function get_date () {
  const today = new Date()
  const num = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  return (
    today.toLocaleDateString('zh-CN')
    +' '+
    today.toLocaleDateString('zh-CN-u-ca-chinese')
    .replace(/(\d+)\s*?年\s*/, '')
    .replace(/月(\d+)/, (m, s)=>{
      s = Number(s)
      if(s===20) return '月 二十'
      if(s===30) return '月 三十'
      const lastNum = num[s%10]
      if(s<10) return '月 初'+lastNum
      if(s<20) return '月 十'+lastNum
      if(s<30) return '月 廿'+lastNum
    })
    +' '+
    '星期'+num[today.getDay()]
  )
}
module.exports = get_date;
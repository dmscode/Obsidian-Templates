async function get_sentence (tp, type) {
  const apis = {
    '毒鸡汤': 'https://api.oick.cn/dutang/api.php',
    '社会语录': 'https://api.oick.cn/yulu/api.php',
    '舔狗日记': 'https://api.oick.cn/dog/api.php',
    '一言': 'https://api.oick.cn/yiyan/api.php',
    '诗词': 'https://v1.jinrishici.com/all.txt',
  }
  if(!type){
    type = await tp.system.suggester(Object.keys(apis), Object.keys(apis), false, '一言')
  }
  const url = type && apis[type] ? apis[type] : apis['一言']
  const response = await fetch(url)
  const data = await response.text()
  return data
}
module.exports = get_sentence;
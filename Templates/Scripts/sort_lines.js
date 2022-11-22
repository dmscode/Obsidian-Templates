async function sort_lines(tp){
  const content = await tp.file.selection()
  if(!content || !content.length) return
  return content.split(/\r?\n/g).sort().join('\n')
}
module.exports = sort_lines;
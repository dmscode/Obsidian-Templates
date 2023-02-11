<%*
/*======== 以下内容按需修改 =======*/
// 新笔记的存放位置，例如：Folder/SubFolder/
const path = 'Notes/Test/'
// 笔记模板，created 创建时间，updated 更新时间，这两个名字按需修改，也可以加入其它内容
const template = (tags, content, nowTime)=>`---
created: ${nowTime}
updated: ${nowTime}
tags: 
${tags}
---
${content}
`
/*======== 以上内容按需修改 =======*/
const nowTime = tp.date.now("YYYY-MM-DD HH:mm:ss")
// 将选中部分作为内容
let content = tp.file.selection()
// 如果没有选中内容则使用剪切板中的内容
if(!content.length){
  content = await tp.system.clipboard()
}
// 如果没有内容，就要求输入（快速记录）
if(!content.length){
  content = await tp.system.prompt('请输入笔记内容：', '', false, true)
}
// 如果有内容就保存，没内容就下班
if(content.length){
  // 要求用户输入信息，不过一溜回车也可以
  const title = await tp.system.prompt('请输入笔记的名称（不可包含 *"\\/<>:|?）：', nowTime.replace(/:/g, '_'))
  const tags = await tp.system.prompt('请输入笔记的标签（多个标签用空格分隔）：', '')
  const alias = await tp.system.prompt('请输入笔记的别名（仅用于当前链接）：', title)
  //整理一下信息
  const tagsCode = tags.split(/\s+/g).map(tag=>`  - ${tag}\n`).join('')
  const noteContent = template(tagsCode, content, nowTime)
  const realTitle = title.replace(/[\*\\\|\?"<>:]/g, '')    // 删除无效符号
                         .replace(/\s/g, '%20') // 替换空格
  const AdvancedURI = 'obsidian://advanced-uri?'
                      + 'filepath='+encodeURIComponent(path+title)+'.md'
                      + '&mode=new'
                      + '&data='+encodeURIComponent(noteContent)
  // 透过 Advanced URI 创建新笔记
  open(AdvancedURI)
  // 返回链接
  tR += `[${alias || title}](${path+title.replace(/ /g, '%20')}.md)`
}
%>
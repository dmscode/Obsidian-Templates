/*
 * @Author          : 稻米鼠
 * @Date            : 2023-01-02 09:02:26
 * @LastEditTime    : 2023-01-02 16:40:51
 * @FilePath        : \Obsidian\Templates\Dataview\Ticket-Card\view.js
 * @Description     : 
 */
/* ======== 参数定义 ======== */
/** @type {Date} */
const now = new Date()
const year = now.getFullYear()
const yearStart = new Date(year, 0)
const yearEnd = new Date(year+1, 0)
const progress = (now-yearStart)/(yearEnd-yearStart)

/** @type {object} 默认配置 */
const defaultOpt = {
  note: '',
  fontSize: 42,
  listOrder: '▶'
}

/** @type {object} 最终配置 */
const opt = Object.assign({}, defaultOpt, input ? input : {})

/** @type {object} 大数字字典 */
const dict = {
  "0": [
      "      ",
      " ████ ",
      " █  █ ",
      " █  █ ",
      " █  █ ",
      " ████ ",
      "      ",
  ],
  "1": [
      "      ",
      "  ██  ",
      "   █  ",
      "   █  ",
      "   █  ",
      " ████ ",
      "      ",
  ],
  "2": [
      "      ",
      " ████ ",
      "    █ ",
      " ████ ",
      " █    ",
      " ████ ",
      "      ",
  ],
  "3": [
      "      ",
      " ████ ",
      "    █ ",
      " ████ ",
      "    █ ",
      " ████ ",
      "      ",
  ],
  "4": [
      "      ",
      " █  █ ",
      " █  █ ",
      " █  █ ",
      " ████ ",
      "    █ ",
      "      ",
  ],
  "5": [
      "      ",
      " ████ ",
      " █    ",
      " ████ ",
      "    █ ",
      " ████ ",
      "      ",
  ],
  "6": [
      "      ",
      " ████ ",
      " █    ",
      " ████ ",
      " █  █ ",
      " ████ ",
      "      ",
  ],
  "7": [
      "      ",
      " ████ ",
      "    █ ",
      "    █ ",
      "   █  ",
      "   █  ",
      "      ",
  ],
  "8": [
      "      ",
      " ████ ",
      " █  █ ",
      " ████ ",
      " █  █ ",
      " ████ ",
      "      ",
  ],
  "9": [
      "      ",
      " ████ ",
      " █  █ ",
      " ████ ",
      "    █ ",
      " ████ ",
      "      ",
  ],
  ":": [
      "      ",
      "      ",
      "  ██  ",
      "      ",
      "  ██  ",
      "      ",
      "      ",
  ],
  "-": [
      "      ",
      "      ",
      "      ",
      " ████ ",
      "      ",
      "      ",
      "      ",
  ],
  "_": [
      "      ",
      "      ",
      "      ",
      "      ",
      "      ",
      " ████ ",
      "      ",
  ],
  "/": [
      "      ",
      "      ",
      "    █ ",
      "   █  ",
      "  █   ",
      " █    ",
      "      ",
  ],
  " ": [
      "      ",
      "      ",
      "      ",
      "      ",
      "      ",
      "      ",
      "      ",
  ],
}
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const fontSize = opt.fontSize
const lineHeight = 1.8*fontSize
const bladeWidth = 10
const margin = 40
const headerHeight = 200
const bigR = 60
const smallR = 12

const width = 960

// 分隔线
const allSepLength = width-(margin+bigR+smallR)*2
const sepMarkR = 4
const sepMarkGap = 2

const sepMarkCount = Math.floor( (allSepLength-sepMarkGap)/(sepMarkR*2+sepMarkGap) )
const sepMarkPassCount = Math.round(sepMarkCount*progress)
const sepMarkStartX = width/2-(sepMarkCount*(sepMarkR*2+sepMarkGap)-sepMarkGap)/2+sepMarkR
const sepMarkY = margin+bigR+smallR+headerHeight

const contentFont = `normal ${fontSize}px Consolas`

const itemMarkX = bigR+smallR+margin*2
const itemLeft = bigR+smallR+margin*2+lineHeight
const itemContentWidth = width - itemLeft - itemMarkX
/* ======== 工具函数 ======== */
/**
 * 生成单个大数字
 *
 * @param {Array} arr
 * @param {string} numName
 */
const addNum = (arr, numName)=>{
  if(!dict[numName]) return
  dict[numName].forEach((line, i)=>{
    arr[i] = arr[i] ? arr[i]+line : line
  })
}
/**
 * 生成大数字
 *
 * @param {string} number
 * @return {Array} 
 */
const get_big_number = number => {
  const strArr = []
  number.split('').forEach(n=>{
    addNum(strArr, n)
  })
  return strArr
}
/* ======== 整理内容 ======== */
ctx.font = contentFont
/** @type {Array} */
const content = [[]]
const note = opt.note ? dv.page('Index/Ticket-Content.md') : dv.current()
note.file.lists.forEach(t=>{
  content.push([])
  if(t.text==='') return
  let nowLetter =  0
  const itemContent = t.text
  itemContent.split('').forEach((s, i)=>{
    if (ctx.measureText(itemContent.substring(nowLetter, i+1)).width > itemContentWidth) {
      content[content.length-1].push(itemContent.substring(nowLetter, i))
      nowLetter = i
    }
    if(i === itemContent.length-1){
      content[content.length-1].push(itemContent.substring(nowLetter, i+1))
    }
  })
})

const contentHeight = margin*4+content.flat().length*lineHeight
const height = (margin+bigR+smallR)*2+contentHeight+headerHeight

canvas.width = width
canvas.height = height

let tempX = margin
let tempY = margin
ctx.beginPath()
ctx.moveTo(tempX, tempY)
while(tempX<width-margin){
  tempX += bladeWidth
  tempY += bladeWidth
  ctx.lineTo(tempX, tempY)
  tempX += bladeWidth
  tempY -= bladeWidth
  ctx.lineTo(tempX, tempY)
}

tempY += headerHeight
ctx.lineTo(tempX, tempY)
tempX -= bigR
ctx.arc(tempX, tempY, bigR, 0, Math.PI/2, false)
tempY += bigR+smallR
ctx.arc(tempX, tempY, smallR, -Math.PI/2, Math.PI/2, true)
tempY += bigR+smallR
ctx.arc(tempX, tempY, bigR, -Math.PI/2, 0, false)
tempX += bigR
tempY += contentHeight
ctx.lineTo(tempX, tempY)

while(tempX>margin){
  tempX -= bladeWidth
  tempY -= bladeWidth
  ctx.lineTo(tempX, tempY)
  tempX -= bladeWidth
  tempY += bladeWidth
  ctx.lineTo(tempX, tempY)
}
tempY -= contentHeight
ctx.lineTo(tempX, tempY)
tempX += bigR
ctx.arc(tempX, tempY, bigR, -Math.PI, -Math.PI/2, false)
tempY -= bigR+smallR
ctx.arc(tempX, tempY, smallR, Math.PI/2, -Math.PI/2, true)
tempY -= bigR+smallR
ctx.arc(tempX, tempY, bigR, Math.PI/2, Math.PI, false)
tempX -= bigR
tempY -= headerHeight
ctx.lineTo(tempX, tempY)
ctx.closePath()

ctx.lineWidth = 1.0
ctx.strokeStyle = "#686872"
ctx.stroke()

ctx.fillStyle = "#F6F6F0"; 
ctx.fill()

// 时间日期
ctx.shadowOffsetX = 0
ctx.shadowOffsetY = 5
ctx.shadowBlur = 16
ctx.shadowColor = "rgba(0, 0, 0, 0.3)";

const dateStr = get_big_number(dv.func.dateformat(dv.date('now'), 'yyyy-MM-dd'))
const timeStr = get_big_number(dv.func.dateformat(dv.date('now'), ' HH:mm:ss '))
const dateStrArr = dateStr.concat(timeStr)
const blockSize = Math.floor( Math.min( (width-4*margin)/dateStrArr[0].length, ((headerHeight+bigR)-margin)/dateStrArr.length ) ) - 1

const headerStartX = width/2 - (blockSize+1)*dateStrArr[0].length/2
const headerStartY = margin+(headerHeight+bigR)/2-(blockSize+1)*dateStrArr.length/2

ctx.shadowOffsetY = 0
ctx.shadowBlur = 0
ctx.shadowColor = "rgba(0, 0, 0, 0)";
ctx.fillStyle = '#686872'
dateStrArr.forEach((line, lineIndex)=>{
  const lineY = headerStartY+lineIndex*(blockSize+1)
  line.split('').forEach((s, i)=>{
    const strX = headerStartX+i*(blockSize+1)
    if(s!==' '){
      ctx.fillRect(strX, lineY, blockSize, blockSize)
    }
  })
})


for(let i=0; i<sepMarkCount; i++){
  ctx.beginPath()
  ctx.arc(sepMarkStartX+(sepMarkR*2+sepMarkGap)*i, sepMarkY, sepMarkR, 0, Math.PI*2, true)
  if(i<sepMarkPassCount){
    ctx.fill()
  }else{
    ctx.stroke()
  }
}


tempY = (margin+bigR+smallR)*2+headerHeight+lineHeight-fontSize
ctx.font = contentFont
content.forEach(item=>{
  ctx.fillText(opt.listOrder,itemMarkX, tempY)
  ctx.fillStyle = "#686872"
  item.forEach(l=>{
    ctx.fillText(l, itemLeft, tempY)
    tempY += lineHeight
  })
})

dv.container.innerHTML = `<img src="${canvas.toDataURL('image/png')}">`
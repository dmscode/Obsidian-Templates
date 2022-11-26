/*
 * @Author          : 稻米鼠
 * @Date            : 2022-11-02 14:00:26
 * @LastEditTime    : 2022-11-26 08:47:44
 * @FilePath        : \ob-templates\Templater-Scripts\Generate_Tweet_Card.js
 * @Description     : 
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/** @type {object} 设置项 */
let opt = {}

/**
 * 初始化选项
 *
 * @param {object} input
 */
const initOpt = (input, tp) =>{
  opt = Object.assign({
    size: 'M',
    logo: AppLogo,
    appLogo: AppLogo,
    name:'这里是用户名',
    userId:'@User_ID or anything',
    bgColors: ["#ffafbd", "#ffc3a0"],
    cardBgColor: 'rgba(255, 255, 255, .8)',
    contetnColor: '#333336',
    nameColor: '#333336',
    userIdColor: '#333336',
    timeColor: 'rgba(0, 0, 0, .5)',
    isMobile: false,
  }, input ? input : {})
  /** ==== 如未设定，则计算默认值 ==== */
  /**
   * 如果属性不存在，则计算默认值
   *
   * @param {*} key
   * @param {*} defVal
   */
  const setSubOpt = (key, defVal)=>{
    if(!opt[key]) opt[key] = defVal
  }
  /** 图片宽度 */
  if(!opt.width){
    switch (opt.size) {
      case 'S':
        opt.width = 480
        break;
      case 'M':
        opt.width = 700
        break;
      case 'L':
        opt.width = 960
        break;
    
      default:
        opt.width = 700
        break;
    }
  }
  /** 文字大小 */
  setSubOpt('fontSize', Math.round(opt.width/20))
  setSubOpt('smallFontSize', Math.round(opt.fontSize*0.6))
  /** 行高 */
  setSubOpt('lineHeight', 1.6)
  /** 段首缩进 */
  setSubOpt('indent', opt.fontSize*2)
  /** 字体 */
  setSubOpt('fontFamily', 'Menlo, SFMono-Regular, Consolas, "Roboto Mono", "Source Code Pro", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei", sans-serif')
  /** 卡片外补 */
  setSubOpt('margin', Math.round(opt.width/10))
  setSubOpt('marginLR', opt.margin)
  setSubOpt('marginTB', opt.margin)
  /** 卡片内补 */
  setSubOpt('padding', Math.round(opt.width/12))
  setSubOpt('paddingLR', opt.padding)
  setSubOpt('paddingTB', opt.padding)
  /** Logo 尺寸 */
  setSubOpt('logoSize', 2*opt.fontSize)
  /** 卡片圆角 */
  setSubOpt('cardRadius', Math.round(opt.fontSize/2))

  /** ==== 必须通过计算得出的值 ==== */

  opt.cardWidth = opt.width - opt.marginLR*2
  opt.contentWidth = opt.cardWidth - opt.paddingLR*2
  opt.contentMarginLR = opt.marginLR+opt.paddingLR
  opt.contentMarginTB = opt.marginTB+opt.paddingTB
  opt.paragraphsMarginBottom = Math.round(opt.fontSize/2)
}

/**
 * 数字两位化
 *
 * @param {number} num 0~99 的整数
 * @returnn {string}
 */
const dbNum = num => (num > 9 ? String(num) : '0' + num);
/** @type {array} */
const daysName = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.']
/**
 * 获取当前时间字符串
 *
 * @return {string} 
 */
const getNowTime = () => {
  const now = new Date()
  const t = {
    YYYY : now.getFullYear(),
    MM: dbNum(now.getMonth()+1),
    DD: dbNum(now.getDate()),
    hh: dbNum(now.getHours()),
    mm: dbNum(now.getMinutes()),
    ss: dbNum(now.getSeconds()),
    EE: daysName[now.getDay()]
  }
  return `${t.YYYY}-${t.MM}-${t.DD} ${t.EE} ${t.hh}:${t.mm}:${t.ss}`
}
// 创建画布对象
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

/**
 * 画布文字逐行分割
 *
 * @param {object} ctx 画布上下文对象
 * @param {string} text 要写入的文字内容
 * @param {number} width 文字内容在画布中占据的宽度
 * @return {array} 二维数组，第1层是段落，第2层是段落中的每一行
 */
const canvasTextSplit = (text, width) => {
  text = text.trim()
  if(text.length === 0) return []
  const result = []
  // 先进行段落的分割
  const paragraphArray = text.replace(/(\r?\n\s*)+/g, '\n').split(/\s*\r?\n\s*/g)
  for(const p of paragraphArray){
    const linesInParagraph = []
    let nowLetter = 0
    for (let i = 1; i <= p.length; i++) {
      /** 判断是否是段落第一行，计算此行长度 */
      const thisLineWidth = linesInParagraph.length ? width : width-opt.indent
      if (ctx.measureText(p.substring(nowLetter, i)).width > thisLineWidth) {
        linesInParagraph.push(p.substring(nowLetter, i-1))
        nowLetter = i-1
      }
      if(i === p.length){
        linesInParagraph.push(p.substring(nowLetter, i))
      }
    }
    result.push(linesInParagraph)
  }
  return result
}
/**
 * 将段落数组中的文字绘制到画布
 *
 * @param {object} ctx 画布上下文对象
 * @param {array} paragraphs 二维数组，第1层是段落，第2层是段落中的每一行
 * @param {number} startX 起始的横坐标
 * @param {number} startY 起始的纵坐标
 * @param {number} opt.lineHeight 行高
 * @return {number} 结束位置的纵坐标
 */
const drawText = async(paragraphs, startX, startY) => {
  let thisLineY = startY
  paragraphs.forEach((p, pIndex) => {
    p.forEach((line, lIndex)=>{
      const thisLineX = lIndex ? startX : startX + opt.indent
      thisLineY += opt.lineHeight * opt.fontSize
      ctx.fillText(line, thisLineX, thisLineY)
    })
    thisLineY += opt.paragraphsMarginBottom
  })
  return thisLineY
}
/**
 * 计算绘制文字所需要占据的高度
 *
 * @param {array} paragraphs 二维数组，第1层是段落，第2层是段落中的每一行
 * @param {number} opt.lineHeight 行高
 * @return {number} 文字内容所占据的高度
 */
const textNeedHeight = (paragraphs)=>{
  return (paragraphs.length-1) * opt.paragraphsMarginBottom
        + paragraphs.flat().length * opt.lineHeight * opt.fontSize
}
/**
 * 将 base64 格式的图片转换为 Blob 格式数据
 *
 * @param {string} dataUrl base64 格式的数据地址
 * @return {object} Blob 格式的图片数据
 */
const dataURLtoBlob = dataUrl=>{
  const dataArr = dataUrl.split(',');
  const mime = dataArr[0].match(/:(.*?);/)[1];
  const bStr = atob(dataArr[1]);
  let n = bStr.length;
  const uint8Arr = new Uint8Array(n);
  while(n--){
      uint8Arr[n] = bStr.charCodeAt(n);
  }
  return new Blob([uint8Arr], {type:mime});
}
/**
 * 将画布保存为图片并自动进行下载
 *
 * @param {object} canvas 画布对象
 * @param {string} name 保存的文件名
 * @param {string} [type="png"] 文件图片的格式: png、jpeg、gif
 */
const downloadImgFromCanvas = (name)=>{
  // const imgDataUrl = canvas.toDataURL('image/'+type)
  const imgDataUrl = canvas.toDataURL({format: 'png', quality:1})
  const blob = dataURLtoBlob(imgDataUrl)
  const blobUrl = URL.createObjectURL(blob)
  const imgDownloadLink = document.createElement('a')
  imgDownloadLink.download = name+'.png'
  imgDownloadLink.href = blobUrl
  imgDownloadLink.click();
}

/**
 * 设置填充色
 *
 * @param {string|array} colors
 */
const setFillColor = colors=>{
  let fillColor
  if(typeof(colors)==='string'){
    fillColor = colors
  }else if(colors.length===1){
    fillColor = colors[0]
  }else{
    fillColor = ctx.createLinearGradient(0, 0, opt.width, opt.width/8);
    const pointStep = 1/(colors.length-1)
    colors.forEach((c, i)=>{
      fillColor.addColorStop(i*pointStep, c); 
    })
  }
  ctx.fillStyle = fillColor
}
/**
 * 画布字体设置
 *
 * @param {string|number} size
 * @param {string} color
 * @param {string} [weight='normal']
 * @param {string} [align='left']
 */
const setFont = (size, color, weight='normal', align='left')=>{
  ctx.font = weight+' '+size+'px '+opt.fontFamily
  ctx.textAlign = align
  ctx.fillStyle = color
}
/**
 * 设置画布阴影
 *
 * @param {number} x
 * @param {number} y
 * @param {number} blur
 * @param {string} [color='rgba(0, 0, 0, 0)']
 */
const  setShadow = (x, y, blur, color='rgba(0, 0, 0, 0)')=>{
  ctx.shadowOffsetX = x
  ctx.shadowOffsetY = y
  ctx.shadowBlur = blur
  ctx.shadowColor = color
}
/**
 * 重置画布对象
 *
 * @param {number} height 画布的高度
 * @param {string} fillColor 画布填充的背景颜色
 */
const canvasRest = height=>{
  canvas.width = opt.width
  canvas.height = height
  setShadow(0, 0, 0)
  setFillColor(opt.bgColors)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

/**
 * 绘制圆角矩形
 *
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} r
 */
const drawRoundedRect = (x, y, w, h, r)=>{
  var ptA = { x: x + r, y: y }
  var ptB = { x: x + w, y: y }
  var ptC = { x: x + w, y: y + h }
  var ptD = { x: x, y: y + h }
  var ptE = { x: x, y: y }
  
  ctx.beginPath();
  
  ctx.moveTo(ptA.x, ptA.y);
  ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
  ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
  ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
  ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);

  ctx.closePath()
  // ctx.stroke();
  ctx.fill()
}

/**
 * 同步载入图片
 *
 * @param {string} url
 * @param {number} l
 * @param {number} t
 */
const loadImage = async (url, l, t) => new Promise( resolve => {
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, l, t, opt.logoSize, opt.logoSize)
    return resolve(true)
  }
  img.src = url
});

/**
 * 
 *
 * @param {*} tp
 * @return {*} 
 */
async function get_tweet_card(tp, input){
  /** @type {string} 获取输入 */
  const inputContent = await tp.system.prompt('输入内容', '', false, true)
  if(!inputContent) return ''

  /** 初始化选项 */
  initOpt(input, tp)

  /** 整理内容，计算尺寸 */
  setFont(opt.fontSize, opt.contetnColor)
  const contentArr = canvasTextSplit(inputContent, opt.contentWidth)
  opt.contentHeight = textNeedHeight(contentArr)
  opt.cardHeight = opt.contentHeight
                  + opt.paddingTB*2
                  + opt.logoSize
                  + opt.lineHeight*opt.fontSize /** 用来书写时间 */
                  + 2*opt.paragraphsMarginBottom /** 放在内容上下 */
  opt.height = opt.cardHeight+2*opt.marginTB
  /** 初始化画布 */
  canvasRest(opt.height)
  /** 绘制卡片 */
  setShadow(0, 0, opt.margin*0.6, 'rgba(0, 0, 0, .3)')
  ctx.fillStyle = opt.cardBgColor
  drawRoundedRect(opt.marginLR, opt.marginTB, opt.cardWidth, opt.cardHeight, opt.cardRadius)

  /** 绘制内容文字 */
  setFont(opt.fontSize, opt.contetnColor)
  setShadow(0, 0, 0)
  drawText(contentArr, opt.contentMarginLR, opt.contentMarginTB+opt.logoSize+opt.paragraphsMarginBottom)
  /** 绘制用户名 */
  setFont(opt.smallFontSize, opt.nameColor, '700')
  ctx.fillText(opt.name, opt.contentMarginLR+opt.logoSize+opt.smallFontSize, opt.contentMarginTB+Math.round(opt.logoSize/2)); 
  /** 绘制 UserID */
  setFont(opt.smallFontSize, opt.userIdColor, '200')
  ctx.fillText(opt.userId, opt.contentMarginLR+opt.logoSize+opt.smallFontSize, opt.contentMarginTB+Math.round(opt.logoSize*0.98)); 

  /** 绘制时间 */
  setFont(opt.smallFontSize, opt.timeColor, '200', 'right')
  const nowTime = getNowTime()
  ctx.fillText(nowTime, opt.width-opt.marginLR-opt.paddingLR, canvas.height-opt.marginTB-opt.paddingTB); 

  /** 绘制头像 */
  await loadImage(opt.logo, opt.contentMarginLR, opt.contentMarginTB)
  await loadImage(opt.appLogo, canvas.width-opt.marginLR-opt.paddingLR/2-opt.logoSize, opt.marginTB+opt.paddingTB/2)
  /** 输出 */
  if(opt.isMobile) return '![]('+canvas.toDataURL('image/png')+')'
  downloadImgFromCanvas(nowTime)
  return ''
}
/** Obsidian Logo 256*256 */
const AppLogo = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAxYUlEQVR4nO2debAkyV2Yvzp7Zndnd+feU6tjL83OzrGzYnUsQtwGjBzYAmMZDIRFIJAJEJcFwthhc0iAkRAyAhmBJJDEbY7AAZgADMghfCAhodUes7szO8e7+71+r+/uqvQf2f1eH3Vk9avq6q7Ob6Oju7KyMvPN1u/IzF9mGkIINBrNYmLm3QCNRpMfWgFoNAuMVgAazQJj592AtHjk7p/Mtf7b7zyZa/3zSLfr0W61f+CrXv9a8+z5B9+Rd3uS8qVvmH/7WRgFoJk7vgz4Ece1X3Pw4AGA/wH8v3ybtHhoBaCZNmeBtwNfixBYloVbchG++PV6vXlf3o1Lxo15N2DfzL8Po5kXbgd+Dvgk8LUAvhDYts2Bkovvi3uB9+bZwEVEKwBN1pSAfwt8Gvg3gNG/IQRYtkXpgIvv+wBvQXYNNFNCKwBNlrwJeAJ4B3Bs9KbwfVzXxnUdBgLSPkIRfOs5QSsATRb8Y+ATwH8FXhqWyReCUsnFNI1BBXAM+HD2TdSAVgCadHk18Ie9z2NxmYUQHDhQwrIsRgLS/ynwDVk0UDOMVgCaNLgP+CDwcaT1V0IIwcG+Ahhfk/J+4EWptVATiFYAmv1wFPgJ4LPANyV9WPiC0gEHyzIR/pgCOAh8bP9N1EShFYBmEmzgrcA/AG8DnEkK8X2fAwcPYFkmo32AHq9GxgxoMkIrAE1Svh74FPAzwG37KcjzfQ6UXGwbRIgGAH4UeHQ/9WjC0QpAo8rnI8N1PwY8tN/ChBC4rkPpgEPXi83+EXTUaiZoBaCJ4wHkAN9fAV+SVqG+L6MAXddFxgBFcj/wnrTq1uyhFYAmjMPIAJ5PMcEAXxzC93Fsi5Lr4nvxLgDw7cAXp92ORUcrAM0oJjIk9++RIbwHsqhECIHj2JQOuEFTgGF8GB0lmCpaAWgGeSNS8N8L3J1lRb4Au6cA/PEpwDDuQHZHNCmhFYAGpGv958jBttPTqFD4PpZtceCAi6fWBejzBuBfZNSshUMrgMXmHPBbwJ8BXzjNin0hOFBye1GAiR//AKC3YEoBrQAWk9uQbv4nkRZ1+vTWAZimQVgUUAQ6SjAltAJYLBzgB5BLdN+SZ0OEoBcGPJEHANJj+e5UG7WAaAWwOHwDMnT3ncgpvlzxhd/zAPb1Cr4LOJVSkxYSrQCKz5cDfw38KjKgZibYWwpsJpkGDOI302rTIqIVQHE5B/wu8MfA4/k2ZRzfFxw44GJZxn4VwENAvnvCzzFaARSPlwG/gBzg+5qc2xKJW3Ix0nkDv58ZVHLzgFYAxeFW4MeQm29+W75Nicb3eguBSg5+ohCASH6NjKIWi4xWAPOPidxt9zPADwE35NuceISQm4GWSi6el9rp1PcA70ursEVBK4D55g3A3yH3278r57Yo4/fXAZRcfBG/FDAB3wx8dZoFFh2tAOaTR4E/QEbxnc25LYkRvi+XApccfC9VBQByrcDYFuSaYLQCmC/uQrq5/4c5tnS+Lz0AeSJQ6grgCHrBkDJaAcwHB5B7430GeHPObdk3vhDYvTMBM1AAAF9FAf6dpoFWALPPtyJDd38UOdI/9wghKB0s9Q4Eyaya9wAvyaz0gqAVwOzyNUhX//0U8EU+eLCEaWX6+jnAb2RZQRHQCmD2+ALk5pu/S0F3w5VhwC6mse8owDhegfScNCFoBTA7nAJ+HfhLUtx8cxYZPBJsCrwdeNU0KppHtALInzuQ8/j/APzznNsyFVrNNm7JxnWn9vr9BvKYcs0IWgHkh4OMYX8CGcln5Nuc7BFCUKvVOXnbcW6++TDb201sx8QwMv/T70ZHCQaiFUA+vBG53fZPArfk25TsMQwDz/Oo1xvcffedfNEXfz4H3Bu4+NQyG+s1DMPAdjLvDnwL8PqsK5k39Gkr0+V1wL8DvijndkwNwzBotVoIIXj44Zdz6qEHQUCz1cT3BSvXKlS3mxw7fhM33lTC80UW0YF9PgTcC2xkVcG8oT2A6XAKuSHHX7BAwg/QaDRwHIfPe+wCZ848hNft0mw2MTCwLBPHtahXW1y5XGZ5qYLv+TiuRUa9gluBX8mk5DlFewDZcjvycI3vYMITdOcVIQT1eoPjx49y4cI5jh49TL3eQPhirM9vOxaeL9hYq1HdaXHs+E3ccutBALrd1L2Br0YuGvpg2gXPI1oBZEMJuWHl9wLH823KdDEMg27Pyr/4xffwyCNnKJVcarV6L4P82p397/0wDQPTsei0PK5f2aK63eLoiZs4eIOD1/WTHB6iwi8gt0K/mmah84hWAOnzzcDbkIdqLhSGYdBoNAHB2bMPc+rUA3hel3q9sWv1RwV/FMs2EQK2Kw1q9RaHD9/AkWM34bgW3Y6XVuhwCdklm+pZCLOIHgNIj8eAjyP7mAsn/AC1Wo3SAZdXv/oxTp9+Oe12m1arDYaBQG4FTv8TgWHIboHvCVaXd7j8/AaVrQa2bWHbqb2yrwO+L63C5hWtANLBaTSa/922rVfn3ZBpYxgGvu9TrdY4duwoX/i6x7nnnruo1Wt0PU9Ks4LQ9xFC7H5M08BxLZqNDlcvb3L1hU1arS5uye4dKLJv3gE8mEZB80phugAi+ekyafKmdrtzRAjBROfczCmGYdBut2m3O9x330s5e/ZhXNdmp1oFjERCH4Vty63Dt8p1atUWR47dyNFjN6bRLbCA32ZK5yHOIoVRALad35/i+/73+V1PDlQZBlmucZ0V+v190zS4cOEs9z9wL91Ol1q9gaEQ1Jh0EZBhSG+g2/VZulphp9Lk+G2HuPnmA3iewJs8duAh5AEjb520gHlGdwH2z9cZhvHSTrcrX8LCB/QCyJDeG2+8gcc//1U88OD9NJstWq12JsIvn5EfyzJxSza1WpvLz5W5emWLbtfDdW2MybsF3408IXnhKIwHkCM/CPKl7na72HYp7+5IpnieT7PZ5I47b+fCI2c5dOhGatUaCGJj+pMKflR2x7UQns/G6s5uJOHhYzdiWiadzkR7jX8UeClQm+TheUV7APvjdcC5/kBYt9tNa3Bq5jAMg06nQ6fT4tSpB3j8NY9xww0HqVaH5/dHGRzUU6Vv7SNygJABRa5r02l7XLuyxeXnNqhVWziuhZV8s5ETwC8lfWje0R7A/viR/g8hwOt6hbX9jUYD1y1x4cI5XvrSF9Nstuh0OqFWP01r38sR9AXI2AEL2Kk0qVdbHDl+E8eO92MH/CRt+XrkUWofUm/5fKMVwOScZyCQxDQMup6H7/kY2e90MzX6Ib1Hjx7mwoXzHDt2lHq9ged5Y8KfvtBDlOCP4pR6sQNLO2xvNTh+280cPnwDIJKEFP8ics3GC6oPzDO6CzA5bxu8MEwZAuv7xRgIHFzCe889d/Pa176Go0cPU6vV8H1/SPjTd/FhN3hg+Cv2EdMwcF2LdsvjyqUyl57boF7v4Lq92IH4ZvajBBcCrQAm4yXAPxtN9D0fr+spjYTPMv0lvJ1Oh9OnX84rX/kojmPvxfOTYd++178f+FLrVo0oCss2sW2T7a06z19cY+n6FiBwSkorDV+L3Kyl8GgFMBnfgwwi2aXv9ne63WnscJMptVod27Z55StfwZkzD9HpdGk2W7t/4yRCH/7IQHxwEms/8Oi4opBXhiFnCxCC5asVnnt6PUlI8TtZgAAhPQaQnKPIBT9j+L6g2/WyWsueKYYh21+v1zl69CiPPnp+dwlv//COpIIfkyPoS6HgqPwi8NI0TdySSb3e4dKzGxw+egMnb7uZgwcdOh0vbKWhgZwaPKPatHlEewDJeTNwU9ANw2BgHGB+tICc4utSq9V58Yvv4bWvfTWHD99CtVpLdHKPsrVPwcUfuzGoGUIubcfEsgw21mo8+/QaK8s7vanE0O3IHgZ+QqV584pWAMm4AfiusJumaeJ1PTxPMC/hAIZh0Gw28TyPc+ce5rHHHsWyzKH+fhzqfXtChFj50eHEwVKiL3fpC3y343H18ibPX1xne7uF61pYwd2Ct1HgbcV1FyAZ30LMBh+e5+F1u1iWyzwsC5IhvQc5f/4Md911F81mk67COEbaU3gRj43fCLlUqqOXwbJMTAu2t5tUq02OHruJE7fdTOmADCwa6e78FjJKsK3U/jlCK4BkfG/UzX5EoJwjn1aTktOf4ms0mpw8eZJHHjnDLbccol6vI8T4ll2DZNa3j3wmWvATNmko0XFMfF+wurzNdqXJydsOceTYTRgmdNq7IcV3IuMDviWuqnlDdwHU+UYUzugTvlwTMKvBAP0lvM1mi/vvfxmPP/4Yhw7dJPfri5HuTAf2VIRf0c2PaFLgU6bZCyludbn8/AbPPbNGbaeFW7IHQ4q/GXleY6HQHoA6P6SUy4BOpzuTkYCGIUN6bdvh0UfP87KXvYROp0Oj0YgI6Y0rdQYtfmDZIU8NJFu2iSEMtjbr7Oy0OH7iJk7cdgi3tNst+GXk0W2bKk2YB7QCUOOrUNw5xjANPE92AyzLTHszy31Rq9W5+eabefTR85w8eTwipFeltOlN44VcKpQd8URI2YZh4JZsfE+wdK1CZbPBbXfewpGjNyDg1m7H+4hpGl85hYNMpoLuAqjxtvgsEhNTDgR6PrPQDej392u1OnfeeQeve93jnDhxdHeKbzikV3U0P59pPPWyQ55QLVvIbkGpZNNsdnj+4hrPPbNGo97GLdlfAXx73J87L2gPIJ5XAY8r5zbYHQjEyPcogH5/3/N8HnroQR56SDox1Wp9TPCjmd3R/CQufmy5AZrAcUx8IdjYqLGz0+TkbTdz/OSh9wJ/DjwV18xZRyuAeH4w6QNCCDqdLjfk7AHU6w1c1+XChXO8+MX37Mb3y5DeuKfF2M/cBT8FFz++QjGWbBjSG/A8n6uXN6lsNsyTd9z8q1D6vKjmzgNaAURzL/IkmcR43fwGAoUQNBoNDh8+zIULZ3tLeOu9qL444S9m3z4uX5Dgj962TBOrZFKrtnj+4vpZOBLejjlBK4BolPv+g/T73Z7vY05xb4DBU3le9KK7OXfuYQ4ePLC3a0+oR1KckfzIsgNvxAv+KLZj4Qs+HfbIPKEVQDjHgH81yYNSED18z8NynKkogP4SXt8XnD59igcfvB8hBLVa+BRf5n37gKSs+vaRZU9g7eNuGQbPhueaH7QCCOe7mPBAT8MwegFBHo47nYHAer3OwYMHOXv2NHfffRetVjsipHe6g3oTDDeEP5WVi69eZT/h6aii5gWtAII5yD6nevq7BGc5DNgPPa7V6pw4cYxHHjnPrbfeQqPRCAjpnUE3P7DcfXoRKVn7iN5Cn89FNWNe0AogmDch1/1PjEDgdbspNWccOcXXodPpcO+9L+HMmdPYtkO9PriKb1zCcrf2gWVnM4UX+Uwyax+U8ERUc+YFrQDGMUjh0Mj+OICXwSah8lSeBqZpcv78w9x77714XncgpFeP5Kvljy0qLGELuBxe2vygFcA4Xwu8aL+FyJkAGRDkpDgQKAf2ahw6dIhHHjnHHXfcTr1eH1iBKGanbx9Y9myM5Acmxyf0U542pBKYe7QCGOdH4rPEszsV6Hm4KQwE9j2KZrPB7bffxiOPnOPQoUNUa1XkIRnMVv8+sOxsBvaSPRNbVGDCyO1n0/Pn8kUrgGG+BHlYZGp0Ox7iwP7K6If0djpdHnjgfk6fPoVpQq1WnWr/XqmOCYU+suzpDeyNJRR5BgC0AhjlP6RamqC3N8Dk9Pv7tm3vLuFtt9s0GnsHcebu6quO5icpO6nQq1c5qdAPUogZANAKYJBXAK9JtUQDul0PISYbCJSn8tS55ZabuXDhHCeOH6dWb+B7HhhGIjd85GdwSlYDezM5mj+eqPYMUJAZANAKYJAfTrvA/jhAt+vhOLbiOvu9kN5Wq82dd9zB+fNnOHjDQXaqtX6G+ELmum8vE6cwmp9E6PtUBFyKzTUnaAUguQ94fdqF7s0E+LjuwChdzDPtdhvf93n5g/dz6tSDCAS1Wj0ipLeHqtAHJM1z3z6iqNCEpIIv9n48hcFOdO75QSsAyVuzK1okOjW40Whw4MABHn74FHfffTftdlRI724Vg1/jN9QuQ8sd/lmYkfyYSkdu7/14Vn3QZfbRCkCeC5/dbq8COp1O5IvWD+ltNBocOXKE8+fPcOTIkZCQ3uGyB77Gb6hdKpQ7w337iLIVb4cXN/4D4GL00/OFVgDwFmCfE3XhCPoDgbLrPjoOIE/l6dBut7nnnhdx5sxpXNcdCekdKZDkQh+SFFN2NtY+maKILCo0YYK+fZzg93kyvqT5YdEVwAHgO7KswDT3tgizbXNoJqB/Ko8QcPr0QzzwwL27nsCQ1Q8V+oDUrKx9krKzsvYKUp2ytQ+iMFOAoBXAtyLX/WeGYfQ3Ce3iOCUGX7BarcbBgwc5f/4cd911O81mi6430N/PysUPLDtta7+XWATB792tQjH2AeizyArAIOakn7QQvhwIBGPgVJ4GJ04c5/z5s9x66y29U3nAEGHBPfE+fVYufmTZKVn7iKJCEyYW+qELJcHv/3gSg+3oWuaLRVYA3wDcM63KOh0ZEdhut2m3O7zsZS/lzJnTWJZFrVqD0Kg+3bePLSYbax+U7Rk192p+WGQF8P3TrMzzfZrNJgDnz5/hvvteRrfTW8I7ofAnF/yIp+ZR+BMP7MU/EKMjnomvcb5YVAXw1ciz36eDAc1GkxMnjnH27GluO3mSeqOB15Wn8kS+5rPQvw+8mVX/fjxxCgN7qlnn/hyAURZVASTe638/GIZBo9nkjjtu50V33025vCmnA4eEfwYFf47690NZ9u/qh1GoGQBYzKPBXtX7TBXbsrhy5SqbWxUs2wZDIN+8/qdH9OU4vQx7x3QFlJm07LEbwyXH5x9OFuoJYVWHslvC+I/o/Apl7z4jBEKImhDimd7vmTz8dRIWUQH8uzwqdRyH8kaZq1ev4bojjtfIOxv9Cg8/s5dPTQpDy44QzkkFXzVBQS8ENzWBNI9li5HfAEF/CjkNWCgWTQE8BHzFtCvth/oahsmVq1ep1xvYlpWdtU+iUGKsfbyiiEhWFPzwhJCmJpBmBadgOH+4dS/MJiCDLJoCmOikn7RwSw6VSoXl5VVct7T7Pka+m6pCH1BQrNCPmFyRprUPMedJrf1QHQmtvYgpd+iZeLe+cDMAsFgK4A7g6/Or3kD4MjLwhReu0Gy1sCwzXvAZFZ3wvCGXETeGVUpo/jhrr2D+J7X2qn37oSITWvvY/rws7+mhv1NRscw6i6QA3krOsx5CCEquw8bGBktLy5RKpYBMqAn+yIsY+l5GCGdq1j6kslysfZwsJxnEG/5/8XQB5X9hFMAtyMM+csXvLe01TZMrV67Q6XQxTXPvRdt92VRN7yTWPkTwI95sdcFXzR9StaI0JxV6ILnQDylh6hQwBgAWRwH8a+DWvBshhI8Q4LouGxtlVldWKZUO7L5sqhKobu1jhF6hynDrHWPtI8oeu53Q2icxwRNa+1EuAhW1GueLRVAANvA9eTcC2N0LoL9B6KXLL9DtdjCtgO3CRiQq0tiFWvuY/HEOhoJUh94Okbmk1n6ojoTWPgXB71NI6w+LoQDeCNyZdyMM5L4A/ZeyVCqxtrbGysoqpQPuXsYQax/IpIKvVkxAQoi1V3DFJ7X2U3Tzo1rx5PAfmcAFmXEWQQG8Pe8GBNGPDbh27RrCB9MwAy1yICkJfmAdMQnx+SPqGP+hmF+hjgSCr1b0kOs1PgNQDPkvvAL4SuD+vBsBgIHcz5+9Xb1LpRLLyyusrqzhum70+xXhjk9q8cMt+Hhl8V5CSB2z4OqPuPnx6keMfj1TUPkvvAJI5Zy/rDBNuVvQ5RcuIxAYZsDmnxHueHau/mhNYQnB5Wfp6mfQvx/IKAa/+s/UKNg+gIMUWQG8Cngs70YMIgT4vqC/+QdIL2B1dY2NjTIl1917U2OsvZqHEOk4hCZMau1VpTmp0AMZ9O8HMw99jfIcBZ0BgGIrgFzDfoMQovdmDmCaJt1ulytXroKQW4aNmtyihegmFfopWvug7E8M/VskUFrzQFEVwCkyOOlnfxihL7PruiwvL1Mub/SOEh+29mOoWnsF8z+ptZ9G3z4+495HqQUD0h7blL0MhXX/obgK4AfybsAo8kwAgd87KHQQy7Jotdtcu3YdwzQTufgEJceY/2la+0zdfNVWKOcfzyDgYoEdgEIqgNuAf5l3I5JScl2WV1bYqlRw3PC4gEGiBX/8Vc3a2g/dTSj0yiP5KtY7RPDjsvczjVwWahvwUYqoAL6TGd3qTPiity/A+D3Lsmg0Gly7ejVwr4DdMhi5FZoQcns8S2gdSa29qnmcib79UMMDLwFRJzQIqBg+QNEUwI3Io77mEsd1uX59icpWBdfZ8wLUhFjR2sd4E7PUt08QqZeWtR9NuQRsxjd4fimaAvg25Mq/mcMwDHzh43s+gS4Act/ARqPB0tISlm0pCPFwQrx3MM6k1n4afXvljHHPBLQ1wNoHZfhcqPEvhgNQKAVwEPiuvBsRR9x74zgO15eW2K5WsR1HSarjvYPxNkzL2qv27ScR/NhWhwi9guD3KfQMABRLAXw/8KK8GxGH8Hu+bQiO41CtVbl29SqOZQcI/kBZBNzO0drvp28f24p0+/bDqeGXTxXcASiUAvjyvBugQpxwCCGwLZvl5WVqtRq2YxNk7SP0wnB5g1kSCn5Sax+fEXUhDrH2sY0OlunAlHhFUewZACiWAvhw3g1QQUVQHMehWq1yfek6jmOHWx0F73r3RwaCD2p/z2Bj1HKLoK/Y7CGXwSXEPkOVgu4EPEiRFMAHmXmNLQcCVWTGsiyuXr1KtVbDtgdmNWN80HG3XdnJTmzxcw7RTeDqBz8TqVgFl4H1yCYXgCIpgBbwrrwbkRZ9L2BpaQnHdmIlKKmbnzCrzJ/VNN5kIbpDl6GuvqrQj5cdPQOg6PjMOkVSACC7ATt5NyIMwwDfk7sCjYYDB2HZFktLSzQaDSzLCsyTVPATOAZ7z2Q8jRfbFCUhjnYHYoV+/GbhzgEMomgKYAf45bwbkRau47K9vc3y8hKuGxAYpCjNQ3fTdvOVrf1g5qGv2Owhl4xJ7+TWPqjEyBmAgjgAhVMAAD/HDP//GdwXUAXTNLl2/TqNZhPTskZkXc3aq761M9G3H2p44GVshgms/UDybqbnosV/Zl+xRBRRATwL/HHejQgjgewDciygUqmwtraKa7vEvYCKTsFIm+ZwGi/g75vc2o+VXUFwcQHkv5AKAODdeTcgjKRHS8uDRAyuXbtGu9OSB4kElYuSUzBZW7Ky9kpCrGbtx+oIuTGcHFr2FWAtrNlFoqgK4E+ZyUGcgU1B4scAd3Ecl3K5zOrqKiV3+DixpII/zRDd2LLHqwpOiTf+oWWPJysVVvj5/z5FVQAgxwJmiv7Af0L5xzDkVmHXl67T9bp7m4YouqPzF6Krmn/kRqi1V3I1BpM/F+f9q/tws02RFcAHmcHNHIWQewIkUwFy27Byucz6+jquU1IaS5jLvj2xl7E3Yl38yGeAmfQes6HICqABvD/vRqRF/yCRq1ev4nkeVthYwLyP5Me5+UpCnMja793aS3gu1vwXxAUosgKAmesGGPi+QPjj+wKq4Lou6xvrlMvr42MBSQYXlQRfjGVM3dqre+YKQqymQQKThxO2mPmQ8vQougK4Avxe3o0YRkxsPEzTxPM9ri9d340mTF/wYUyIYvOPZxjPH5shvI6QGyIsQ2z+yMQXgNWwphSNoisAgJ/IuwF95M7AyD0BJqTkllhdXWV9Yw3HcWZjw41Ioxtt4pO6+qEWP6Ds0OToSp+J9/2L0wdYBAXwv4FP5d2IPn2LPUEPANg7Tuzq1au718EVoSbEI5mnvOFGbNnjyWoaZCxZodLe7ScWR/wXQwEA/FTeDRgkSSBQEK7rsrGxwdbW1tAaAVk4Ca39sOCrPBJyGZshVuhVrX2EFIZa+5Ccu6cu7ZUZfhJQATXAoiiA3wSW8m4E9FYEJlwPMIppmnS6Ha4vXZcxAhjq1ntEQyhb+1DZixfO1K19dBMjhHRcpQTkez6oqUVlURRAlxmaEpx8GHAP13VZXV1hs7yJ7TgTWfvQZ5SEWM3aR8hgaLVJBT8uX6AfEZx3A7kV+MKwKAoA4JeAdt6N2J0K3Gc3wDRNWq0Wy6vLmGbQXgHDQp/I2o9cqlr7SO841nqrFRaYrCj4ce67gMvASvDdYrJICuAq8Nt5NyJNXNdlbW2VnZ1tHMfppQa7+KqCH5xfzdqHlhsqxEquRnByjIsR0LcPZeD2c4PZ4z5FYJEUAMB78m6AYYDw5b6AkwQDDdI/Tmxp+RqWZRIk+KGEGNzQDAGZJrX2Cq5GcLKCizFm7UMIKftJZekviAZYNAXwt8An8m7Eft3/QRzHYWVlhZ2dKrbtJLL2AZfhGSI9hKgbCoIf3UQFoVez9oG3hxOeCH6yuCyaAgD4mbwbkMYYQJ++F7CyuhK6b2C8EMdL+aTWPtspvGTWXqGyi+rmvxguwCIqgN9FhgjnRpoeAIBt26ysLFGv1/e2EFcS4ugMSa39cHIyay9CE4ZvTNi3V6mszILNAMBiKgAP+Pn8qk8Yv6+AbTvUajWWlq9jDx0nFiZP4cIZKVfKLn50YepCv3czqbUPLzvU/3mOBdkFaJBFVAAA7wNqeVS8uymIP3k48DgC27ZYWV3pbSFuh8hJvMWPqCImOUDKVYpRqFQMX8bkTlbZQNnPCyE9C9VPEVhUBVABPpRvE9LuBjjUa1VW1lZkYFCUeVXzzhUsuJrFD6wj1uKn4OqHJOwWOVz2wmwCMsiiKgCAnyVtKVTE9328CXYFisOybJauX6PRqGHbFqGSG3w5nKjk6kcVlMTVH1cpabv6IUI/yMLNAMBiK4CngT/MuxFpYts21VqV1bUVeajo4MseZ6QjBG5SwY8ve8SPiLH2agol2NrHKRQWaCPQQRZZAUAu24cbvX0B1Y4HS4plWayurtBqNLFNa0hGIt38kOSphuiGoO7iK1v7UdYFvDD6bxX3KQKLrgD+AvjsNCvclfmMRpEcx2F7e5vV9VXs3fDgEWKFOCBDUmsf4mJMo2+fREJ7WZ9DLgRaOBZdAUAOXoAQAj/DYWTDMFheWaLVbg0vFIoV4hChj7P2Ci5GUmsfXvZ4ZUkFP8BDeD6R6S+QC6AVAHyUKc//9rcFy6AHAPS8gJ1typsbcpFQpOCPvNERL3i8RR4tObUQ3bGEACGOJDj/7sVTyaW/GBpAKwCoI48Vnyp94ciC/tjC8vISXqcztG3Y3usbYu0D25pU8JNZ+4DGBSYkFfqhOsaFfjDbQk4BglYAfd4L+NOqrL8iMMtoEtdx2dwqs76xjuO4AWLUI8baR3jeQzdmqW8/rihiG/VkfKnFRCsAySXg9/NuRJoYhtwmbGV1Gc/vYpgQ5+arC/3ezaTWPrrsdAQ/yYNCsCkEl5JGAepIwOIxxVWCBp7n44tspgL7SC9gg83NMq7jxlr78IThG9lY+yzc/JD8w0J8EXkYyEKiFcAefwN8Mu9GpIlhyuPElpavIbxhZZOvtQ8ReoWyx0pQ1BgRlnthTgEKQiuAYaayfbjcGTjdFYFhOK5LubxBeauM67rjIhIj9JMIvmrCWLkx/xxJhR6U3PWnomstNloBDPObTOlYKKG0Ef/+MQ0Tz/dZXV2W1Q32OELrH7bMiQU/sGwRfKX4bzCeP/5BRf26sAOAoBXAKB5TOlB0Gta/j+u4rJfX5FiAXYqQ2Ew33Mijf6/CQi4C6qMVwDjvQ54jkCEGQuzvcJAkmKaJ1+2wvLLUcwBG3QB1Nz8wS8xgQtb9e0gs9P1NWbaEEJcGj1RP8ikCWgGMswF8bBoVTfMdcpwS5c0NtncquK6zK/JJ3fxwOR8vYFLBz8raBwjv08C22tPFRCuAYDKdEtwbBPQznQYcxDRNOp02K6tLe7sSxRjWwNuKA3uJQ3QJ/BH8zGTWPujWQs8AgFYAYXwKOS1YKBzbYX1jjcr2No4dslKQnPr2k0/jhdcR76o/o15aMdEKIJyfzbJwIQSeJ9LeFCgSy7JotZqsra1gWfZwe4iU8ZHEkavZ69ur9dEFTw39nUk/BUArgHB+D3mcWIZM/y1yHIfy5hq1WhXbDtg8NPDlTkfws+rby2eUhR765cMTCy7/WgFE0EUuEkodw+htDe778mjvKWJZdu8gkWXMQS8gxu9Pxc3Py9oPC32/BVXkRiALjVYA0XwAaGVVeF5TSZZls7a+TKNew7ac+L49JBb6FEJ0w+tIau2Da3+SBZ8BAK0A4lgHPpJFwfIlZqpjAH1s26bVarC+sdY7TizGxVczsCGbbYQ8k23fPkrw+1xUr724aAUQTyZTgkKAL/w85B8A07RZXVum0ahjWVaIEEcT7uLnaO3jBH+vic/sawCwIIMAWgHE81ngLzMpOceXyLZt6vUaa+vLWLadaG3CrPXtFaz9WFsF4sl+4POk/xUBrQDUeGfaBcpgoOmFAwdhWSbrG6u0mi1s047Nn1TwIZngy/wJtND4z5i8YvByYbcBG0QrADX+mAIGjdi2Q71eY728im07ocI3qcXfR4huRGaGLH68q79r8Qfz1yjg/89J0ApAnXenW5zcrCPrXYHiME2L1dVlmu2GPFm4R/B43oz37wPaGpL/SeQ04MKjFYA6HyblwyN239McsW2bWm2HcnldHirKiKwrTuMlIeXR/DhrH8RCHgMWhFYA6lSRcQGpsLsz8AxgWhZr66u02m1Mw4wVeshwYA+SC360tR/Pn8YMQDHGALUCSMgvkOL/+llZV+7YDtVqhXJ5FccOHwycCTc/wDNRVxS7l09r+ZdoBZCM54HfSauwWRD+PoZhsLa+THvkIBHI0Nqn0LePVxSBlwu9D+AgWgEk591pFGIYxtQ2BlXBth12qjtUKuXejEAywc/UxVfv2wdZ+9H8dfQYwC5aASTn48Df5d2ItOnPRKytr9DtehiG2quRqBuTfd8+6HKwsSDEM+g1ALtoBTAZ706jELknwPR2BYrDsR0q25tsbfUOFY0gxym8gPyBl4ONHXRlnhpyb/bzKQBaAUzGx4DlvBuRNv1lyusbq/j+eHzCTLj5AeZdUfD7aPd/AK0AJqOLnBHYF0IIfN/P7JjwSbB7XsD2zmbvUNEJhD5O8FPs24e4+WOCP5A/lRmAYth/rQD2w88Djf0XM1uvkmma+H6X1dXrUjnFrVechosf17eHULc8IL/2AAbQCmBy1oDf2FcJgpmZBRjEcVw2K2Uq21s4thueUQx9RSOGf8Q+IyIvR24G3w1IraMXAQ2hFcD+mHivgH5/2/cFuewKEoFhmPi+x0Z5RTZttI+SVf9+8Jngy4Ebsa5+ULkX0TMAQ2gFsD8+A/z1vkqYPQcAANd22dzcYHt7C9d2hiRLfZAuZVc/YgQ+XFEM3Xgylc5/gQYBtALYPxPvFeALgTdjg4B9DNOk2+2wtrEMQjZQSfAHJCR1ax/yeIi1DypsoQ8CDUIrgP3zR8ClvBuRBY7jUKlsslPfxnJCxgJCrL2ah5DawF7kjYE6UpsBKIgDoBVASrxnkocMA3zP640DzB6madHptNnYWMUcdFNmqW8fUdhecr/vIp5NLQhoBgdvJ0ErgHT4AHKXmcJh2zabW+vUqjs4lrMr9Ilc/Dhrv5++vQhL3hX6fkIN3QUYQyuAdNgGPpr8MQO/F2QzK+HAo5imRavdpLy5hmmZiV18xi8HbqTWtw+w9mP5LgFbYc1eVLQCSI93JX3AgJmMAxjFthw2tzaoN+pjZwruEmGNx/Om3bcfs/ZB6Pn/ALQCSI/PAX+e6AmDmdkUJArLsmi26myUV4b2DQRCrb2qm59O3z6sgKH8Tw3WlcanCGgFkC6JA4PEjA4AjmJZFhvlNZqtnheg0reHafTtQxm5rUOAA9AKIF3+iIK+aJYljxPb3NzA6p0hECv0yaL00rT2e1n2Ei6mav7nQ2/HohVA+ihPCcpdgbzeisDZHAQcxLIs1ssrtNpNDNMavrn/KL2x5H1Y+9GEGnobsEC0AkifD1LQKUHLsmk0a2yUV7Ftm70+QLhkht4JuSFGfylY2kCPYphLpLyle1HQCiB9asD7VTMLIY8ImxdM02Rza41Ou4VpWJEWX9XVH07et6sflPNz6fr+xekDaAWQDe9B9Q2Zs3fJthwajRrlzfUhLyBSLJT799GCry70ezd7tz+nxT8YrQCy4RLwByoZBQJ/xqcBRzEMg43NFdrtFoZpRbv5cYK///792I3d0OQ9aX1KOwDBaAWQHf85PovRGzcTM7kiMAzbdmg0qmz1thAfItbNH7H2ESQX/N7t8XzPRte0uGgFkB1/DXxSJeOsBwIFYRhyLKDbacstxJXd/OB8o/nj3fwxlRJWdgW4qPRHLSBaAWRL5JSgIWOBe2cEzpELgPQCqrVttipluUhogFBrr9q3Jyhh+MbuM/Eu+QvAusKftJBoBZAtv4XcO7CYGFDeXKXrdcAwR0Vz8r59iLUP6NvHIgRPp7kCuGCrgbUCyJga8ItRGWZ5V6A4bEt6AdvVLWzHGbb0qoIfmV/JxR9/alhI9RLgCLQCyJ73A53IHHNqTfrRi+XNVXyvGxnNGNq3j8g9qeCPoBVABFoBZM8V4LfDbhqGDATyhZi3YQBAjgVs72yxs72JHbCFePK+/URufohLLgDx7LD6SfMz/2gFMB0iVwmKOX6f5PbmPuWt9d2NTUKtfVzfnrB844T3xYcqqwDPJf+rFgetAKbD/0WeKjyGgbG7J0DsKTwzimM77FQ32alWsAbjApL27WMEP3oALrCAF4AVhT9hYdEKYHq8KzDVACHmZy1AEIZh4vkeG5vLvf0NjHjBT8/FHytkQFE8k9UMgJ4F0CTlvwHPBN3oRwPOM47tsLOzSa22PRYXEGjxFQn/Zwm+MZL/CfWaFhOtAKaHD7xvPFn2oeddAfS9gM3KGhj9zsz+RvNj+veBz4yg9wGMQSuA6fIBoJp3I7LCthwq2xvUahUs294L90/N1Q/OH6E79RqAGLQCmC7bwK8MJhgGeJ6P8Gd3a3BVTNOk63Upb66yO6eZ/sCeah+8DDwfm2vB0Qpg+kx0itC8YFtyRqDRqI3vIDzAPgb2VLkErCrnXlC0Apg+F4E/GUwQQuDP+UxAH9M06XTbbFbWMExraGIzxb69Cnr+XwGtAPLhp0cT5n0QcBDTsqnslGk0apimnUXfXgU9AKiAVgD58GeMbB9eIPnHMi3a7SZb2+uYY92ATKx9EFoBKKAVQH68B/qhtKK3NXjeTUoPy7TZ3inT6h8kkq21D0LPACigFUB+fBDYybsRWdE/Tmyrso5ljr9mGUfTlZGDgJoYtALIjxrwSyAFwffmb1egOCzLYquyTqvdHBoLmEJ35xJ6BkAJrQDy5b/k3YAssUybVrvB9k4Za/QkoWzRMwCKaAWQL88Cv09vDKBgDgAApmWyWVmj3WlhTk8J6DUAimgFkD8/DcWaBhzEMm2arTqV7b1DRaeAngFQRCuA/PkbDP5e7AbOFw/DMKlsr9P12pgBA4IZUMgTmrNgaio5azzPy7sJ++FnhBAfEv1twQqmCGzLptGqsb1T5sjhk/h+O8vqNoHLWVZQJLQHMBt8VAixKoom+QMYhsFmZY1Op5O1F3AJfRKwMloBzAZdz/ffL/z53RYsDttyaDSr7NQ2e4FBmfGrWRZeNArTBThx4ljeTdgvPwncLoT4MuDuvBuTBYZhsL29zs03HdmNgEyZ6xR8ajVttAcwO+wAbwLOAV8H/A4FO1XItmxq9R2qtU3ssW3DUuEdQKYDDEVDK4DZo4w8UuwNwHngjcDvUYiwYdm92ays4/nRB4lMwAoxpzBpxtEKYLa5BnwM+BrgDPCtyJWE9TwbtR9s26be2KZa307bC3gn2vonRiuA+eEScu3AlyKVwXcD/wuYs/lPA4SgUlnDF6ltg7aO7vtPhFYA88mzwM8CrwHOAt+LVAZzgWXZ7FS3qNa20vICfhxt/SdCK4D557PIo8deA1wA3o48iWhmMQwTgU9le12eibi/qc8y8N50WrZ4aAVQLP4OaQ1fgfQM/iMzujDGthyq1S3qjW1se19ewI8Sd/qyJhStAIrLp4F/DzwEvBL4MWboqGx5kEiXza1VZOzzRF7ABtr67wutABaDvwV+GDgFfBFy/CD3LbNs26Fa26Le2MG2J4pJ09Z/n2gFsFgI4C+QMwingNch585fyKMxhmHieV0qlY1JQqDX0CP/+0YrgMWlDfxP4M3Ay5HTiz+PjD2YGpblUKmuU29UsZLNCPw42vrvG60ANCADi/4MeAtyzOCfAB8GlrOu2DRNvG6XrcoqpnpMwBpSWWn2iVYAmlEqwB8A34RUBm9ArkuoZFWhZTns1DZptmqqKwV1zH9KaAWgiaKMFP43AA8D34hcl5DqCcemadLptOVBIvH7BmrrnyJaAWhUuQL8GnJdwjnk2MGfAI00Cu8fJ6bgBfw00EyjTo1WAJrJeBY5e/CPkMrgO4GPAxOfcNo/Tmx7p4xlhXoBOuovZbQC0OyXp5FC+Thy+fL3AJ+YpCDLtKlsb9BqNcPOEfgp5ngl5CyiFYAmTT4NvAt4Ve/zI8BnVB/uHydW2d4I6gZsIQOYNCmiFYAmKz4B/Cfk0uVXIkfuY7frtiyLre012u2xg0TeQUrjDZo9tALQTIO/BX4QeAD4AmQQT+C6hN3jxKpl7D0voEzvNGVNumgFoJk2f4Vcsvxy4MuRXYahffxNw5ReQLfd9wJ+HG39M0ErAE2e/Cly0PA+ZCjyLwIrlmXTaNaobK9jmfYKeuQ/M7QC0MwCHWQo8puBe4HXGxgf2N7e2Ol0Wz8FtHJtXYExinoopUajiUd7ABrNAqMVgEazwPx/L0SIBV6pOBsAAAAASUVORK5CYII=`
module.exports = get_tweet_card;
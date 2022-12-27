/*
 * @Author          : 稻米鼠
 * @Date            : 2022-12-15 09:30:15
 * @LastEditTime    : 2022-12-27 09:20:05
 * @FilePath        : \ob-templates\Dataview\Month-View\view.js
 * @Description     : 
 */
/* ======== 参数定义 ======== */
/** @type {Date} */
const now = new Date()
const today = {
  year: now.getFullYear(),
  month: now.getMonth()+1,
  day: now.getDate(),
}

/** @type {object} 默认配置 */
const defaultOpt = {
  dir: '',
  year: today.year,
  month: today.month,
  weekNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
  taskMarks: [
    // 有未完成任务
    {
      color: 'rgba(229, 192, 123, .6)',
      marks: [' ', '<', '>']
    },
    // 有重要任务
    {
      color: 'rgba(233, 72, 120, .6)',
      marks: ['!', '*', 'e']
    },
  ],
  // taskMarksFunc: note=>color,
  signMark: false,
}

/** @type {object} 最终配置 */
const opt = Object.assign({}, defaultOpt, input ? input : {})

/** @type {object} 公历节日 */
const solarFestival = {
  '0101': '元 旦',
  '0214': '情人节',
  '0308': '妇女节',
  '0312': '植树节',
  '0315': '消费者权益日',
  '0401': '愚人节',
  '0501': '劳动节',
  '0504': '青年节',
  '0601': '儿童节',
  '0701': '建党节',
  '0801': '建军节',
  '0910': '教师节',
  '1001': '国庆节',
  '1101': '万圣节',
  '1224': '平安夜',
  '1225': '圣诞节'
};
const lunarFestival = {
  '正月初一': '春 节',
  '正月初五': '破 五',
  '正月十五': '元宵节',
  '正月廿五': '天仓节',
  '二月初二': '龙抬头',
  '三月初三': '上巳节',
  '五月初五': '端午节',
  '七月初七': '七夕节',
  '七月十五': '中元节',
  '八月十五': '中秋节',
  '九月初九': '重阳节',
  '十月初一': '寒衣节',
  '腊月初八': '腊八节',
  '腊月廿三': '北小年',
  '腊月廿四': '南小年',
  '腊月三十': '除 夕'
}

/* ======== 工具函数 ======== */
/**
 * 数字两位化
 *
 * @param {number} num 0~99 的整数
 * @returnn {string}
 */
const dbNum = num => (num > 9 ? String(num) : '0' + num);

/**
 * 获取日期字符串
 *
 * @param {string} y
 * @param {string} m
 * @param {string} d
 */
const dateStr = (y, m, d)=>`${y}-${dbNum(m)}-${dbNum(d)}`

/**
 * 创建元素
 *
 * @param {string} tag
 * @param {HTMLElement} parentEl
 * @param {Array} className
 * @return {HTMLElement} 
 */
const createElement = (tag, parentEl, className)=>{
  const el = document.createElement(tag)
  parentEl.appendChild(el)
  if(className && Array.isArray(className)) className.forEach(c=>el.classList.add(c))
  return el
}

/**
 * 获取节气
 *
 * @param {object} info
 * @return {string} 
 */
const getSolarTerm = info=> {
  const year = info.year
  const month = info.month-1
  const day = info.day
  let sTermInfo = [
      0, 21208, 42467, 63836, 85337, 107014,
      128867, 150921, 173149, 195551, 218072, 240693,
      263343, 285989, 308563, 331033, 353350, 375494,
      397447, 419210, 440795, 462224, 483532, 504758
  ]
  let solarTerm = [
      '小寒', '大寒', '立春', '雨水', '惊蛰', '春分',
      '清明', '谷雨', '立夏', '小满', '芒种', '夏至',
      '小暑', '大暑', '立秋', '处暑', '白露', '秋分',
      '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'
  ]

  let solarTerms = ''
  let tmp1 = new Date(
      (31556925974.7 * (year - 1900) + sTermInfo[month * 2 + 1] * 60000) + Date.UTC(1900,0,6,2,5)
  )
  let tmp2 = tmp1.getUTCDate()
  if (tmp2 === day) solarTerms = solarTerm[month * 2 + 1]
  tmp1 = new Date(
      (31556925974.7 * (year - 1900) + sTermInfo[month * 2] * 60000) + Date.UTC(1900,0,6,2,5)
  )
  tmp2= tmp1.getUTCDate()
  if (tmp2 === day) solarTerms = solarTerm[month * 2]

  return solarTerms
}
/**
 * 从指定节日数据中查找当天是否节日
 *
 * @param {string} key
 * @param {object} festivalObj
 */
const getFestival = (key, festivalObj)=>festivalObj[key] || ''
/**
 * 获取此日信息
 *
 * @param {Date} theDay
 * @return {object} 
 */
const getDayInfo = theDay => {
  const info = {
    year: theDay.getFullYear(),
    month: theDay.getMonth()+1,
    day: theDay.getDate(),
    weekday: theDay.getDay(),
  }
  info.MM = dbNum(info.month)
  info.DD = dbNum(info.day)
  info.date = info.year+'-'+info.MM+'-'+info.DD
  const bigNum = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  // 获取农历信息
  theDay.toLocaleDateString('zh-CN-u-ca-chinese')
        .replace(/(\d+)\s*?年\s*/, '')
        .replace(/^(.*月)(\d+)/, (m, lMonth, lDay)=>{
          info.lMonth = lMonth
          lDay = Number(lDay)
          if(lDay===20) {
            info.lDay = '二十'
            return
          }
          if(lDay===30) {
            info.lDay = '三十'
            return
          }
          const lastNum = bigNum[lDay%10]
          if(lDay<10) {
            info.lDay = '初'+lastNum
            return
          }
          if(lDay<20) {
            info.lDay = '十'+lastNum
            return
          }
          if(lDay<30) {
            info.lDay = '廿'+lastNum
            return
          }
        })
  info.lunarShort = info.lDay === '初一' ? info.lMonth : info.lDay
  // 获取二十四节气
  info.solarTerm = getSolarTerm(info)
  info.solarFestival = getFestival(info.MM+info.DD, solarFestival)
  info.lunarFestival = getFestival(info.lMonth+info.lDay, lunarFestival)
  return info
}

/* ======== 元素创建 ======== */
/** @type {HTMLElement} 主容器 */
const container = createElement('div', dv.container, ['dms-month-container'])

/** @type {HTMLElement} 月历表格 */
const monthTable = createElement('div', container, ['dms-month-table'])
/** @type {HTMLElement} 单日视图 */
const thisDay = createElement('div', container, ['dms-month-this-day'])

/** @type {HTMLElement} 月历标题 */
const monthHeader = createElement('div', monthTable, ['dms-month-header'])
const caption = createElement('div', monthHeader, ['dms-month-caption'])

/** @type {HTMLElement} 表头（星期几） */
const tHeader = createElement('div', monthTable, ['dms-month-tr', 'dms-month-theader'])
tHeader.innerHTML = opt.weekNames.map((n, i)=>`<div class="dms-month-th weekday-${i}">${n}</div>`).join('')
/** @type {HTMLElement} 表格主体（日期部分） */
const tBody = createElement('div', monthTable, ['dms-month-tbody'])

/* ======== 主函数 ======== */

/**
 * 根据 opt 参数生成对应的代码
 *
 */
const initMonth = ()=>{
  // 标题
  caption.innerText = `${opt.year}-${dbNum(opt.month)}`
  /** @type {object} 全部日记 */
  const diaries = {}
  const notesDir = opt.dir.replace(/\{\{YYYY\}\}/g, opt.year).replace(/\{\{MM\}\}/g, dbNum(opt.month))
  dv.pages(`"${notesDir}"`).filter(p=>/^\d{4}-\d{2}-\d{2}$/.test(p.file.name)).forEach(p=>diaries[p.file.name] = p)
  /** @type {Date} 月份第一天 */
  const monthFirstDay = new Date(opt.year, opt.month-1)
  /** @type {Date} 日历第一天 */
  const startDay = new Date(+monthFirstDay-monthFirstDay.getDay()*864e5)
  /** @type {*} */
  let monthBodyCode = ''
  for(let r=0; r<6; r++){
    monthBodyCode += '<div class="dms-month-tr">'
    for(let d=0; d<7; d++){
      /** @type {Date} 这一天的时间对象 */
      const thisDay = new Date(+startDay+(r*7+d)*864e5)
      /** @type {object} 日历信息 */
      const dayInfo = getDayInfo(thisDay)
      /** @type {boolean} 日期是否在当前月份中 */
      const inMonth = dayInfo.month === opt.month
      /** @type {boolean} 是否今天 */
      const isToday = thisDay<Date.now() && Date.now()-thisDay < 864e5
      /** @type {object|undefined} 当日笔记 */
      const dayNote = diaries[dayInfo.date]
      /** @type {string} 笔记路径 */
      const dayNotePath = dayNote ? dayNote.file.path : ''
      /** @type {string} 标记颜色 */
      let markColor = dayNote ? 'rgba(51, 136, 204, .6)' : ''
      // 如果存在笔记且有任务，判断标记色
      if(dayNote && dayNote.file.tasks.length){
        /** @type {Array} 任务标记 */
        const marks = dayNote.file.tasks.map(t=>t.status)
        opt.taskMarks.forEach(m=>{
          m.marks.forEach(mark=>{
            if(marks.includes(mark)) markColor = m.color
          })
        })
      }
      // 用户自定义函数
      if(dayNote && opt.taskMarksFunc) markColor = opt.taskMarksFunc(dayNote)
      const signMark = opt.signMark ? `<div class="dms-day-mark-sign">${opt.signMark(dayNote)}</div>` : ''
      // 阴历
      const lunar = dayInfo.solarFestival || dayInfo.lunarFestival || dayInfo.solarTerm || dayInfo.lunarShort
      monthBodyCode += `<a href="${dayNotePath}" data-href="${dayNotePath}" class="internal-link dms-month-td ${inMonth ? 'dms-month-day' : 'dms-other-month-day'}${isToday ? ' dms-today' : ''}" rel="noopener" target="_blank">
        <div class="dms-day">${dayInfo.DD}</div>
        <div class="dms-day-lunar">${lunar}</div>
        <div class="dms-day-mark-line" style="background-color: ${markColor}"></div>
        ${signMark}
        <div class="dms-day-info">
          ${dayInfo.solarFestival ? `<div>${dayInfo.solarFestival}</div>` : ''}
          ${dayInfo.lunarFestival ? `<div>${dayInfo.lunarFestival}</div>` : ''}
          ${dayInfo.solarTerm ? `<div>${dayInfo.solarTerm}</div>`  : ''}
          <div class="dms-day-full-lunar">${`<div>${dayInfo.lMonth}</div><div>${dayInfo.lDay}</div>`}</div>
          ${signMark}
        </div>
      </a>`
    }
    monthBodyCode += '</div>'
  }
  tBody.innerHTML = monthBodyCode
}

initMonth()
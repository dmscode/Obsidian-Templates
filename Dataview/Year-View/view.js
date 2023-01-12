/*
 * @Author          : 稻米鼠
 * @Date            : 2022-12-25 17:20:03
 * @LastEditTime    : 2023-01-12 19:40:06
 * @FilePath        : \ob-templates\Dataview\Year-View\view.js
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
  weekNames: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
  // signMark: false,
}

/** @type {number} 一天的毫秒数 */
const oneDayMs = 864e5

/** @type {object} 最终配置 */
const opt = Object.assign({}, defaultOpt, input ? input : {})

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
 * 获取每一天的数据
 *
 * @return {Array} 
 */
const getEveryDay = ()=>{
  const startDay = new Date(opt.year, 0)
  const dayCount = (new Date(opt.year+1, 0) - startDay)/oneDayMs
  const months = new Array(12).fill().map(e=>new Array())
  new Array(dayCount).fill().forEach((v,i)=>{
    const day = new Date(+startDay+i*oneDayMs)
    const month = day.getMonth()
    const date = day.getDate()
    const weekIndex = day.getDay()
    /** @type {boolean} 是否今天 */
    const isToday = day<Date.now() && Date.now()-day < 864e5
    months[month].push({
      month,
      date,
      weekIndex,
      isToday,
      dateStr: dateStr(opt.year, month+1, date)
    })
  })
  return months
}

/* ======== 元素创建 ======== */
/** @type {HTMLElement} 主容器 */
const container = createElement('div', dv.container, ['dms-year-container'])
/** @type {HTMLElement} 年份标题 */
const caption = createElement('div', container, ['dms-year-caption'])
/** @type {HTMLElement} 月份容器 */
const monthsContainer = createElement('div', container, ['dms-year-months'])


/* ======== 主函数 ======== */
const initYear = ()=>{
  /** @type {object} 全部日记 */
  const diaries = {}
  const notesDir = opt.dir.replace(/\{\{YYYY\}\}/g, opt.year)
  dv.pages(`"${notesDir}"`).filter(p=>/^\d{4}-\d{2}-\d{2}$/.test(p.file.name)).forEach(p=>diaries[p.file.name] = p)
  // 输出年份
  caption.innerText = opt.year
  const months = getEveryDay()
  monthsContainer.innerHTML = months.map((m, i)=>{
    return `<div class="dms-year-month-box dms-year-month-${i}">
    <div class="dms-year-month-name">${opt.monthNames[i]}</div>
    <div class="dms-year-month-week-name">${opt.weekNames.map((w, wi)=>`<div class="dms-year-month-th dms-year-month-weekday-${wi}">${w}</div>`).join('')}</div>
    ${
      m.map((d, di,theMonth)=>{
        /** @type {string} 如果是每月的的第一天，或者星期天，需要开始新的一行 */
        const start = di===0 || d.weekIndex===0 ? '<div class="dms-year-month-tr">' : ''
        const end = di===theMonth.length-1 || d.weekIndex===6 ? '</div>' : ''
        /** @type {object|undefined} 当日笔记 */
        const dayNote = diaries[d.dateStr]
        /** @type {string} 笔记路径 */
        const dayNotePath = dayNote ? dayNote.file.path : ''
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

        return `${start}<a class="internal-link dms-year-month-day dms-year-month-weekday-${d.weekIndex}${d.isToday ? ' dms-year-today' : ''}" href="${dayNotePath}" data-href="${dayNotePath}" rel="noopener" target="_blank">
          <div>${d.date}</div>
          <div class="dms-year-day-mark" style="background-color: ${markColor}"></div>
        </a>${end}`
      }).join('')
    }</div>`
  }).join('')
}
initYear()
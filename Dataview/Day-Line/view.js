/*
 * @Author          : 稻米鼠
 * @Date            : 2022-11-22 13:18:46
 * @LastEditTime    : 2022-11-23 15:55:23
 * @FilePath        : \ob-templates\Dataview\DayLine-dataview\view.js
 * @Description     : 一日时间段标注
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/** @type {object} 默认配置 */
const defaultOpt = {
  time: '06:00 18:00',
  nextDay: false,
  style: [4]
}

/** @type {object} 最终配置 */
const opt = Object.assign({}, defaultOpt, input ? input : {})

/** @type {array} 时间点数组 */
const times = opt.time.split(/\s+/g).map(t=>t.split(/~/g).map(p=>{
  const pArr = p.split(/:/g)
  return Number(pArr[0])*60+Number(pArr[1])
}))

/** @type {number} 起始点 */
const startTime = times[0].length===1 ? times[0][0] : 360
/** @type {number} 结束点 */
const endTime = (times[times.length-1].length===1 ? times[times.length-1][0] : 1080) + (opt.nextDay ? 1440 : 0)
/** @type {number} 总时长 */
const totalLong = endTime-startTime

/**
 * 计算百分比
 *
 * @param {number} a 第二个时间点（靠后）
 * @param {number} b 第一个时间点（靠前）
 * @returns {string}
 */
const getPercentage = (a, b)=> ((a-b)/totalLong*100).toFixed(1)+'%'

/**
 * 计算用以显示的时间
 *
 * @param {number} t
 * @returns {string}
 */
const timeToShow = t=>String(Math.floor(t/60)%24).padStart(2, '0')+':'+String(Math.floor(t%60)).padStart(2, '0')

/** @type {number} 当前时间段的起始点 */
let startPoint = startTime
/** @type {string} 最终输出代码 */
let code = ''
/** @type {number} 第几个时间段，用来计算样式 */
let barCount = 0
times.forEach((t, i)=>{
  /** 排除起始结束时间点 */
  if((i===0 || i===times.length-1) && t.length===1) return
  const sp = t.length===1 ? startPoint : t[0]
  const ep = t[t.length-1] + (t[t.length-1]<sp && opt.nextDay ? 1440 : 0)

  console.log(sp, ep, startTime, endTime)

  const before = getPercentage(sp, startPoint)
  const long = getPercentage(ep, sp)
  const color = `hsl(${opt.style[barCount%opt.style.length]%12*30}, 100%, 36%, .5)`

  code += `<div class="dms-day-line-bar" style="margin-left: ${before}; width: ${long}; background-color: ${color};" aria-label="${timeToShow(sp)}~${timeToShow(ep)}"></div>`
  startPoint = ep
  barCount++
})

const root = dv.el('div', '', { cls: "dms-day-line" });
root.innerHTML = code
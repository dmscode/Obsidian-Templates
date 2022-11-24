/*
 * @Author          : 稻米鼠
 * @Date            : 2022-10-28 08:32:52
 * @LastEditTime    : 2022-11-23 15:57:29
 * @FilePath        : \ob-templates\Dataview\Heatmap-dataview\view.js
 * @Description     : 笔记热力图（Heatmap）
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/** @type {array} 所有笔记 */
const allNotes = dv.pages().filter(p=>p.file.ext==='md')
/** 代表的价值单纯 +1 */
const addOne = ()=>1

/** @type {object} 预设场景的数据获取方法 */
const defaultMethods = {
  cday: { /** 笔记的创建日期 */
    source: allNotes,
    getDate: p=>dv.func.dateformat(p.file.cday, 'yyyy-MM-dd'),
    getValue: addOne
  },
  mday: { /** 笔记的更新日期 */
    source: allNotes,
    getDate: p=>dv.func.dateformat(p.file.mday, 'yyyy-MM-dd'),
    getValue: addOne
  },
  created: { /** 笔记的创建日期 */
    source: allNotes,
    getDate: p=>String(p.file.frontmatter.created).replace(/\s.*$/, ''),
    getValue: addOne
  },
  updated: { /** 笔记的更新日期 */
    source: allNotes,
    getDate: p=>String(p.file.frontmatter.updated).replace(/\s.*$/, ''),
    getValue: addOne
  },
  name: { /** 笔记的名字 */
    source: allNotes,
    getDate: p=>p.file.name,
    getValue: addOne
  },
  task: { /** 任务的完成日期 */
    source: dv.pages().file.tasks.filter(t=>t.completed),
    getDate: t=>dv.func.dateformat(t.completion, 'yyyy-MM-dd'),
    getValue: addOne
  }
}

/**
 * 获取指定输入
 *
 * @param {string} key
 * @param {any} defaultVal
 * @return {any} 
 */
const getInput = (key, defaultVal)=>{
  return input && input[key] ? input[key] : defaultVal
}
/**
 * 根据对应的类型调用方法，获取数据
 *
 * @return {object} 
 */
const dataGetter = ()=>{
  const type = getInput('type', 'cday')
  const method = defaultMethods[type] ? defaultMethods[type] : defaultMethods['cday']
  const source = getInput('source', method.source)
  const getDate = getInput('getDate', method.getDate)
  const getValue = getInput('getValue', method.getValue)
  const data = {}
  source.filter(p=>{
    const md = getDate(p)
    const val = getValue(p)
    data[md] = data[md] ? data[md]+val : val
  })
  return data
}
/**
 * 等级计算方法
 *
 * @param {number} count 数量
 * @returns {number} 对应的等级
 */
const levelGetter = getInput('levelGetter', count=>count < 5 ? count : 5)

/** @type {object} 数据源 */
const heatData = getInput('heatData', dataGetter())


/** @type {Date} */
const today = new Date()
/** @type {number} 一天的时间长度 */
const daylong = 24*60*60*1000
/** @type {number} 起始时间点，大约一年前 */
const startDay = today - (today.getDay() + 52*7)*daylong

/**
 * 数字两位化
 *
 * @param {number} num 0~99 的整数
 * @returnn {string}
 */
const dbNum = num => (num > 9 ? String(num) : '0' + num);

/** @type {string} */
let code = `
<style>
.dms-heatmap {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  width: 100%;
  overflow: hidden;
}
.dms-heatmap-weekrow {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  min-width: 18px;
  position: relative;
  padding-top: 28px;
}
.dms-heatmap-month {
  position: absolute;
  top: 0;
  line-height: 28px;
  font-size: 14px;
}
.dms-heatmap-day {
  border: 1px solid rgba(128, 128, 128, .08);
  background-color: rgba(128, 128, 128, .05);
  border-radius: 3px;
  margin: 0 1px 1px 0;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dms-heatmap-day:hover::before {
  position: absolute;
  content: ' ';
  background: #333336;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, .1);
  z-index: 10;
  width: 12px;
  height: 12px;
  top: -16px;
  left: 50%;
  transform: translate(-50%, 0) rotate(45deg);
}
.dms-heatmap-day:hover::after {
  position: absolute;
  content: attr(aria-label);
  background: #333336;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
  z-index: 10;
  white-space: nowrap;
  color: #CCCCCE;
  font-size: 12px;
  line-height: 12px;
  padding: 3px 6px;
  top: -24px;
  left: 50%;
  transform: translate(-50%, 0)
}
.dms-heatmap-day.dms-heatmap-future-day {
  opacity: 0;
}
.dms-heatmap-day > img {
  position: relative;
  border: none;
  background: none;
  width: 100%;
  display: block;
  opacity: 0;
  z-index: -100;
}
.dms-heatmap-level-1 { background-color: hsl(120, 60%, 80%, .5); }
.dms-heatmap-level-2 { background-color: hsl(120, 60%, 70%, .5); }
.dms-heatmap-level-3 { background-color: hsl(120, 60%, 60%, .5); }
.dms-heatmap-level-4 { background-color: hsl(120, 60%, 50%, .5); }
.dms-heatmap-level-5 { background-color: hsl(120, 60%, 40%, .5); }

.dms-heatmap-weekday-mark {
  border: 1px solid rgba(128, 128, 128, 0);
  background: none;
}

.dms-heatmap-weekday-0 { background-color: hsl(10, 100%, 60%, .3); }
.dms-heatmap-weekday-3 { background-color: hsl(200, 100%, 60%, .3); }
.dms-heatmap-weekday-6 { background-color: hsl(200, 100%, 60%, .3); }

.dms-heatmap-mark-show {
  width: 100%;
  flex-grow: 0;
  text-align: right;
  font-size: 12px;
  line-height: 2em;
}
.dms-heatmap-level-mark {
  display: inline-block;
  width: 12px;
  height: 12px;
}

@media screen and (max-width: 480px) {
  .dms-heatmap-weekrow {
    min-width: 32px;
  }
}
</style>
<div class="dms-heatmap">`
/** @type {number} */
let dayCount = 0

/**
 * 追加一天的代码
 *
 * @param {array} className
 * @param {string} tipLabel
 */
const addDay = (className, tipLabel)=>{
  code += `<div class="${className.join(' ')}" ${tipLabel}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADElEQVQImWP4//8/AAX+Av5Y8msOAAAAAElFTkSuQmCC">
      </div>`
}

/** 循环输出 53 周 */
for(let weekIndex=0; weekIndex<53; weekIndex++){
  /** 如果已经超过今天，则停止 */
  if(startDay+dayCount*daylong > today) break
  /** 输出一周（列） */
  code += `<div class="dms-heatmap-weekrow">`
    for(let d=0; d<7; d++){
      /** 这一天的日期 */
      const theDay = new Date(startDay+dayCount*daylong)
      /** 计算年月日 */
      const year = theDay.getFullYear()
      const month = dbNum(theDay.getMonth()+1)
      const day = dbNum(theDay.getDate())
      /** 生成日期字符串 */
      const theDayStr = `${year}-${month}-${day}`
      /** 如果是月初，则加入月份指示 */
      if(day==='01') code += `<div class="dms-heatmap-month">${month}</div>`
      /** 获取 level，一共五个级别 */
      const level = levelGetter(heatData[theDayStr] ? heatData[theDayStr] : 0)
      /** class 数组 */
      const className = [
        'dms-heatmap-day',
        'dms-heatmap-level-'+level
      ]
      /** @type {boolean} 是否是未来的时间，只显示到当天，所以未来不会显示 */
      const future = dayCount>364 && (theDay-today)>=daylong-1
      if(future) className.push('dms-heatmap-future-day')

      /** @type {string} 提示 */
      const tipLabel = !future ? `aria-label="${(level ? heatData[theDayStr]+' ' : '')+theDayStr}"` : ''

      addDay(className, tipLabel)
      dayCount++
    }
  /** 一周结束 */
  code += `</div>`
}
code += `<div class="dms-heatmap-weekrow">`
/** 加入右侧的一周标示 */
const weekname = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
for(let d=0; d<7; d++){
  const className = [
    'dms-heatmap-day',
    'dms-heatmap-weekday-mark',
    `dms-heatmap-weekday-${d}`
  ]
  const tipLabel = `aria-label="${weekname[d]}"`
  addDay(className, tipLabel)
}
code += `</div>`
/** .dms-heatmap 的结束标签 */
code += `</div>`
/** 加入等级图示 */
code += `<div class="dms-heatmap-mark-show">Low `
for(let d=0; d<6; d++){
  const className = [
    'dms-heatmap-day',
    'dms-heatmap-level-mark',
    `dms-heatmap-level-${d}`
  ]
  const tipLabel = `aria-label="level-${d}"`
  addDay(className, tipLabel)
}
code += ` Hight</div>`

const root = dv.el('div', '', { cls: "dms-heatmap-container" });
const rootShadow = root.attachShadow({mode: 'open'});
rootShadow.innerHTML = code
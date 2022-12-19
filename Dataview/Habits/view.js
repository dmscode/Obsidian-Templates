/*
 * @Author          : 稻米鼠
 * @Date            : 2022-12-06 17:00:10
 * @LastEditTime    : 2022-12-19 17:14:53
 * @FilePath        : \ob-templates\Dataview\Habits\view.js
 * @Description     : 
 */

/** @type {object} 默认配置 */
const defaultOpt = {
  dir: '',
  mode: 'today', // today|month|year|all
  year: dv.func.dateformat(dv.date('now'), 'yyyy'),
  month: dv.func.dateformat(dv.date('now'), 'MM'),
  day: dv.func.dateformat(dv.date('now'), 'dd'),
  status: 'b', // 状态标记
  // headers: ['吃饭', '睡觉', '打豆豆'],
  show: 'yesorno', // content|yesorno,
  dateHeader: 'Date',  // 日期字段名称
  yesorno: ['✔️', '❌', '❔']  // yesorno 模式下三种标记符号
}

/** @type {object} 最终配置 */
const opt = Object.assign({}, defaultOpt, input ? input : {})

/** @type {object} 不同模式的笔记过滤器 */
const modeFilters = {
  today: p=>p.file.name === `${opt.year}-${opt.month}-${opt.day}`,
  month: p=>new RegExp(`^${opt.year}-${opt.month}-\\d{2}$`).test(p.file.name),
  year: p=>new RegExp(`^${opt.year}-\\d{2}-\\d{2}$`).test(p.file.name),
  all: p=>/\d{4}-\d{2}-\d{2}/.test(p.file.name),
}
/** @type {object} 打卡结果处理函数 */
const dataFilters = {
  content: (k, h)=>h[k],
  yesorno: (k,h)=>{
    const v = h[k]
    // 如果是日期则直接输出
    if(k===opt.dateHeader) return v
    if(typeof(v)==='undefined'){
      return opt.yesorno[1]
    }
    return opt.yesorno[0]
  },
}

/** @type {array} 获取所有符合条件的笔记 */
const pages = dv.pages(`"${opt.dir}"`).filter(modeFilters[opt.mode])

/** @type {array} 笔记中所有对应标记的数据 */
const habits = {}
pages.forEach(p=>{
  
  habits[p.file.name] = {}
  habits[p.file.name][opt.dateHeader] = `[${p.file.name}](${p.file.path})`
  
  if(!p.file.tasks?.length) return
  p.file.tasks.forEach(t=>{
    if(t.status !== opt.status) return
    const tArr = t.text.trim().split(/\s+/)
    habits[p.file.name][tArr[0]] = tArr[1]
  })
})

const allHabits = {}
Object.values(habits).forEach(h=> Object.assign(allHabits, h))
if(opt.mode==='today') delete allHabits[opt.dateHeader]
/** @type {array} 要显示的项目标题 */
let headers = opt.headers ? opt.headers : Object.keys(allHabits)

/** @type {array} 用以输出的数据 */
const data = []

Object.entries(habits).sort((a, b)=>b[0].localeCompare(a[0])).forEach(habit=>{
  const h = habit[1]
  data.push(headers.map(header=>{
    const handler = opt.show
    if(typeof(handler)==='function'){
      return handler(header, h)
    }
    return dataFilters[handler](header, h)
  }))
})

dv.container.classList.add('dms-habit-container')
if(opt.mode==='today') dv.container.classList.add('no-count')
/** @type {HTMLElement} */
dv.table(headers, data)

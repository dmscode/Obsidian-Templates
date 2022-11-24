/*
 * @Author          : 稻米鼠
 * @Date            : 2022-10-27 11:55:52
 * @LastEditTime    : 2022-11-23 16:00:29
 * @FilePath        : \ob-templates\Dataview\TaskProgress-dataview\view.js
 * @Description     : 任务完成度
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/** @type {object} 默认设定 */
const defaultOpt = {
  page: dv.current(), // 当前页
  section: null,      // 无章节过滤
  defaultWeight: 1,   // 单个任务权重 1
  style: 5            // 色彩样式 5
}
/** 合并默认选项和输入对象 */
const opt = input ? Object.assign({}, defaultOpt, input) : defaultOpt

/* 如果输入的有百分比 */
let percentage = 0
if(typeof(opt.percentage)!=='undefined' && Number(opt.percentage) >=0 && Number(opt.percentage) <= 100){
  percentage = opt.percentage
}else{
  /** @type {number} 所有任务总权重 */
  let taskTotalWeight = 0
  /** @type {number} 已完成任务权重 */
  let taskDoneWeight = 0

  /** 遍历所有任务，计算权重 */
  opt.page.file.tasks.forEach(t=>{
    /** 如果有章节过滤，且当前任务不是对应章节，舍弃 */
    if(opt.section && t.section.subpath !== opt.section) return
    /** @type {number} 当前任务权重值 */
    const weight = /【\d+】/.test(t.text) ? +t.text.replace(/^.*?【(\d+)】.*$/g, '$1') : opt.defaultWeight
    taskTotalWeight += weight
    if(t.completed) taskDoneWeight += weight
  })

  /** @type {string} 完成度百分比，不含百分号 */
  percentage = (taskDoneWeight/taskTotalWeight*100).toFixed(2)
}

const root = dv.el('div', '', { cls: "dms-task-progress" });
root.innerHTML = `
  <div class="dms-task-progress-bar">
    <div class="dms-task-progress-bar-inner dms-task-progress-style-1" style="width: ${ percentage }%; background: hsl(${ opt.style%12 *30 }, 100%, 36%, .5);">
    </div>
  </div>
  <div class="dms-task-progress-desc">${ percentage }%</div>
`

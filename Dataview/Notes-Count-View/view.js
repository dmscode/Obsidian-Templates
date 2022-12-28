/*
 * @Author          : 稻米鼠
 * @Date            : 2022-12-28 10:18:56
 * @LastEditTime    : 2022-12-28 15:29:21
 * @FilePath        : \Obsidian\Templates\Dataview\Notes-Count-View\view.js
 * @Description     : 
 */
/** @type {object} 路径记录 */
const dirs = {}
/**
 * 添加路径记录
 *
 * @param {string} path
 * @param {parentPath} path
 */
const addDir = (path, parentPath) => {
  if(!dirs[path]){
    dirs[path] = {
      count: 1,
      parentPath
    }
    return
  }
  dirs[path].count += 1
}
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

let total = 0
let depth = 0
/** 路径整理 */
dv.pages().map(p=>p.file.path.replace(/[^/]*$/g, '')).forEach(p=>{
  let tempPath = ''
  p.split(/\//g).forEach((subPath, i)=>{
    if(!subPath) return
    const parentPath = tempPath
    tempPath += subPath+'/'
    addDir(tempPath, parentPath)
    if(depth<i) depth = i
  })
  total++
})
/** @type {object} 元素记录 */
const els = {}

els[''] = createElement('div', dv.container, ['dms-notes-dir-box'])
els[''].dataset.path = '/'
els[''].dataset.name = '/'
els[''].dataset.count = total
els[''].setAttribute('aria-label-position', 'top')
els[''].setAttribute('aria-label', '/ - '+total)
els[''].style.marginTop = '18px'
els[''].style.marginBottom = 18*(depth+1)+'px'
Object.entries(dirs).forEach(item=>{
  const [path, dir] = item
  els[path] = createElement('div', els[dir.parentPath], ['dms-notes-dir-box'])
  els[path].dataset.path = '/'+path
  els[path].dataset.name = path.replace(/^.*\/([^/]*\/)$/, '$1')
  els[path].dataset.count = dir.count
  els[path].setAttribute('aria-label-position', 'top')
  els[path].setAttribute('aria-label', '/'+path+' - '+dir.count)
  els[path].style.flexGrow = dir.count
})

const boxEls = Object.values(els)
const cLeng = boxEls.length
boxEls.forEach((e, i)=>{
  const h = Math.round(i/cLeng*360)
  e.style.backgroundColor = 'hsl('+h+', 60%, 90%)'
})
/*
 * @Author          : 稻米鼠
 * @Date            : 2022-10-22 09:48:06
 * @LastEditTime    : 2022-10-26 13:26:55
 * @FilePath        : \Dataview\Bookmarks-dataview\view.js
 * @Description     : Obsidian Dataview 书签管理自定义视图
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/**
 * 获取图标链接
 *
 * @param {string} url
 * @returns {string}
 */
const get_icon = url=> `https://s2.googleusercontent.com/s2/favicons?domain=${ url.replace(/^(https?:\/\/[\w.-]*)(\/.*)?$/,'$1') }&sz=32`
/**
 * 获取缩略图链接
 *
 * @param {string} url
 * @returns {string}
 */
const get_screenshot = url=> `https://s0.wp.com/mshots/v1/${ encodeURIComponent(url) }?w=320&h=200`

/** @type {array} 数据源，默认当前页面 */
let pages = [dv.current()]
/** 如果有输入，并且设置了输入页面 */
if(input && input.pages){
  /** 不是数组，即单页面，构建数组 */
  pages = input.pages instanceof Array ? input.pages : [ input.pages ]
}
/** @type {array} 用来输出指定章节（分类），一个数组，如果空数组则显示所有章节 */
const sections = input && input.sections && input.sections.length ? input.sections : []
/** @type {number} 当前展开的分类序号 */
let unfold = input && input.unfold ? input.unfold : -1
/** @type {object} 书签数据对象 */
const navs = {}
/** @type {number} 书签总数量 */
let total = 0

/* 查询书签源，并过滤 */
pages.forEach(p=>{
  /** 有子元素的是每个书签的根节点 */
  p.file.lists.filter(e=>e.children.length)
  .forEach(e=>{
    /** @type {string} 章节名称 */
    const section = e.section.subpath
    /** 如果有分类限定，并且当前章节不在其中，则返回 */
    if(sections.length && !sections.includes(section)) return
    /** 如果当前分组不存在，则创建 */
    if(!navs[section]) navs[section] = []
    /** 解析并存储书签数据 */
    const url = e.children[1].text
    navs[section].push({
      title: e.text.split(/\n/)[0],
      desc: e.children[0].text,
      url,
      add: e.children[2].text,
      screenshot: e.children[3] ? e.children[3].text : get_screenshot(url),
      icon: e.children[4] ? e.children[4].text : get_icon(url),
      link: e.path+(e.blockId ? '#^'+e.blockId : ''),
    })
    /** 书签总数增加 */
    total++
  })
})
/** @type {array} 获取分组名称数组，这样可以确保分组顺序一致 */
const groups = Object.keys(navs)
/* 整理生成书签页结构代码 */
let code = ''
groups.forEach((group, i)=>{
  code += `<div class="bookmark-group-title" style="background-color: hsla(${i*15}, 100%, 50%, .1)">
    ${group.replace(/^\d+-/, '')+' ('+navs[group].length+'/'+total+')'}
    </div>
    <div class="bookmark-group"></div>`
})
/** @type {HTMLElement} 创建一个元素，然后把代码塞进去 */
const root = dv.el('div', '', {cls: 'bookmark-index'})
root.innerHTML = code

/**
 * 展开指定分组
 *
 * @param {number} index 要展开的分组序号
 */
const unfoldGroup = index=>{
  unfold = unfold === index ? -1 : index
  root.querySelectorAll('.bookmark-group').forEach((group, i)=>{
    if(i!==unfold){
      group.innerHTML = ''
      return
    }
    let groupCode = ''
    navs[groups[unfold]].forEach(e=>{
      groupCode += `
      <div class="bookmark-card">
        <div class="bookmark-info">
          <img class="bookmark-screenshot" src="${ e.screenshot }">
          <div class="bookmark-desc">${e.desc}</div>
        </div>
        <div class="bookmark-title">
          <img class="bookmark-icon" src="${ e.icon }">
          <a class="bookmark-link" href="${e.url}" title="${e.title}" target="_blank">${e.title}</a>
        </div>
        <div class="bookmark-url">
          <a class="bookmark-link" href="${e.url}" title="${e.url}" target="_blank">${e.url}</a>
        </div>
        <div class="bookmark-add">
          Add Time: <a data-href="${ e.link }" href="${ e.link }" class="internal-link bookmark-edit" target="_blank" rel="noopener">${ e.add }</a>
        </div>
      </div>
      `
    })
    group.innerHTML = groupCode
  })
}

/** 展开默认分组 */
unfoldGroup(unfold)

/** 给标题添加点击事件 */
root.querySelectorAll('.bookmark-group-title').forEach((title, i)=>{
  title.addEventListener('click', ()=>{ unfoldGroup(i) })
})
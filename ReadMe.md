# 自己的 Obsidian 模板

![last-commit](https://img.shields.io/github/last-commit/dmscode/Obsidian-Templates?style=for-the-badge) ![version](https://img.shields.io/static/v1?label=Version&message=0.0.57&color=40AEF0&style=for-the-badge)

## 简介

自用的一些 Obsidian 模板、脚本、片段等。需要搭配对应插件使用。

## 使用说明

可以 clone 整个仓库，本仓库尽量按照不影响用户原本保险库（Vault）的原则进行组织的，不过为了便于查看，这些文件夹都放在根目录了，也许你 clone 到保险库下的某个文件夹更为合理。

当然也可以只选用你需要的某个功能，复制对应文件，不过这样更新会稍显麻烦。

## 关于收费

[A cup of coffee.](https://afdian.net/a/daomishu)

毕竟，咖啡就是生产力。

## Table of Content

- [简介](#%E7%AE%80%E4%BB%8B)
- [使用说明](#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)
- [关于收费](#%E5%85%B3%E4%BA%8E%E6%94%B6%E8%B4%B9)
- [Table of Content](#Table-of-Content)
- [目录说明](#%E7%9B%AE%E5%BD%95%E8%AF%B4%E6%98%8E)
- [模板列表](#%E6%A8%A1%E6%9D%BF%E5%88%97%E8%A1%A8)
    - [书签缩略图列表](#%E4%B9%A6%E7%AD%BE%E7%BC%A9%E7%95%A5%E5%9B%BE%E5%88%97%E8%A1%A8)
    - [一日时间段标注](#%E4%B8%80%E6%97%A5%E6%97%B6%E9%97%B4%E6%AE%B5%E6%A0%87%E6%B3%A8)
    - [笔记热力图（Heatmap）](#%E7%AC%94%E8%AE%B0%E7%83%AD%E5%8A%9B%E5%9B%BEHeatmap)
    - [任务完成度](#%E4%BB%BB%E5%8A%A1%E5%AE%8C%E6%88%90%E5%BA%A6)
    - [自动打开入口笔记](#%E8%87%AA%E5%8A%A8%E6%89%93%E5%BC%80%E5%85%A5%E5%8F%A3%E7%AC%94%E8%AE%B0)
    - [侧边栏图标排序](#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%87%E6%8E%92%E5%BA%8F)
    - [笔记内容分栏](#%E7%AC%94%E8%AE%B0%E5%86%85%E5%AE%B9%E5%88%86%E6%A0%8F)
    - [禁止通行分割条](#%E7%A6%81%E6%AD%A2%E9%80%9A%E8%A1%8C%E5%88%86%E5%89%B2%E6%9D%A1)
    - [索引标签样式卡片](#%E7%B4%A2%E5%BC%95%E6%A0%87%E7%AD%BE%E6%A0%B7%E5%BC%8F%E5%8D%A1%E7%89%87)
    - [生成文字卡片](#%E7%94%9F%E6%88%90%E6%96%87%E5%AD%97%E5%8D%A1%E7%89%87)
    - [获取随机诗词](#%E8%8E%B7%E5%8F%96%E9%9A%8F%E6%9C%BA%E8%AF%97%E8%AF%8D)
    - [生成渐变背景笔记头图](#%E7%94%9F%E6%88%90%E6%B8%90%E5%8F%98%E8%83%8C%E6%99%AF%E7%AC%94%E8%AE%B0%E5%A4%B4%E5%9B%BE)
    - [获取一言](#%E8%8E%B7%E5%8F%96%E4%B8%80%E8%A8%80)
    - [获取今日日期](#%E8%8E%B7%E5%8F%96%E4%BB%8A%E6%97%A5%E6%97%A5%E6%9C%9F)
    - [获取历史上的今天](#%E8%8E%B7%E5%8F%96%E5%8E%86%E5%8F%B2%E4%B8%8A%E7%9A%84%E4%BB%8A%E5%A4%A9)
    - [获取天气](#%E8%8E%B7%E5%8F%96%E5%A4%A9%E6%B0%94)
    - [获取年进度](#%E8%8E%B7%E5%8F%96%E5%B9%B4%E8%BF%9B%E5%BA%A6)
    - [对选中行排序](#%E5%AF%B9%E9%80%89%E4%B8%AD%E8%A1%8C%E6%8E%92%E5%BA%8F)
    - [转换为大字符](#%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%A4%A7%E5%AD%97%E7%AC%A6)
- [技巧分享](#%E6%8A%80%E5%B7%A7%E5%88%86%E4%BA%AB)
- [计划](#%E8%AE%A1%E5%88%92)
    - [Next](#Next)
    - [Plan](#Plan)

## 目录说明

- `/Dataview`：Dataview 的自定义视图，每个文件夹对应一个功能，需要 [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件的支持
- `/Docs`：本仓库中模板的说明文档
- `/QuickAdd`：QuickAdd 的脚本，每个脚本对应一个功能，需要 [QuickAdd](https://github.com/chhoumann/quickadd) 插件的支持
- `/snippets`：Obsidian 的 CSS 片段，对应 `.obsidian/snippets` 文件夹（为了方便直接复制过去，所以这个文件夹没有大写），需在 `设置——外观——CSS 片段` 中启用对应的样式
- `/Templater`：Templater 的模板文件夹，每个模板对应一个功能，需要 [Templater](https://github.com/SilentVoid13/Templater) 插件的支持，**并将 Templater 的模板文件夹设置为此文件夹**
- `/Templater-Script`：Templater 的脚本文件夹，每个脚本对应一个功能，需要 [Templater](https://github.com/SilentVoid13/Templater) 插件的支持，**并将 Templater 的脚本文件夹设置为此文件夹**。脚本需要对应的调用方法，会在文档中写出

## 模板列表

不同于提交时间，这里列出的是每个文件的最后编辑时间，可以视为文件的版本号，用来对照你使用的模板是否有更新版本。

有一些功能可以用多种方式实现，各有优缺点，所以这里按功能划分，而不按照依赖插件划分，

### 书签缩略图列表

- 使用说明：[书签缩略图列表](./Docs/Dataview/Bookmarks.md)（待完善）
- 相关文件：
    - [/Dataview/Bookmarks/view.css](./Dataview/Bookmarks/view.css)<sup>2022-11-23 10:11:20</sup>
    - [/Dataview/Bookmarks/view.js](./Dataview/Bookmarks/view.js)<sup>2022-10-26 13:26:55</sup>

### 一日时间段标注

- 使用说明：[一日时间段标注](./Docs/Dataview/Day-Line.md)
- 相关文件：
    - [/Dataview/Day-Line/view.css](./Dataview/Day-Line/view.css)<sup>2022-11-23 15:55:12</sup>
    - [/Dataview/Day-Line/view.js](./Dataview/Day-Line/view.js)<sup>2022-11-23 15:55:23</sup>

### 笔记热力图（Heatmap）

- 使用说明：[笔记热力图（Heatmap）](./Docs/Dataview/Heatmap.md)
- 相关文件：
    - [/Dataview/Heatmap/view.js](./Dataview/Heatmap/view.js)<sup>2022-11-23 15:57:29</sup>

### 任务完成度

- 使用说明：[任务完成度](./Docs/Dataview/Task-Progress.md)
- 相关文件：
    - [/Dataview/Task-Progress/view.css](./Dataview/Task-Progress/view.css)<sup>2022-11-23 16:00:20</sup>
    - [/Dataview/Task-Progress/view.js](./Dataview/Task-Progress/view.js)<sup>2022-11-23 16:00:29</sup>

### 自动打开入口笔记

- 使用说明：[自动打开入口笔记](./Docs/QuickAdd/Open-Home-Page.md)
- 相关文件：
    - [/QuickAdd/Open-Home-Page.js](./QuickAdd/Open-Home-Page.js)<sup>2022-11-23 16:11:50</sup>

### 侧边栏图标排序

- 使用说明：[侧边栏图标排序](./Docs/Snippets/Side-Dock-Icon-Order.md)
- 相关文件：
    - [/snippets/Side-Dock-Icon-Order.css](./snippets/Side-Dock-Icon-Order.css)<sup>2022-11-23 20:32:32</sup>

### 笔记内容分栏

- 使用说明：[笔记内容分栏](./Docs/Snippets/Split-Page-Callout.md)
- 相关文件：
    - [/snippets/Split-Page-Callout.css](./snippets/Split-Page-Callout.css)<sup>2022-11-25 08:35:56</sup>

### 禁止通行分割条

- 使用说明：[禁止通行分割条](./Docs/Snippets/Stop-Callout.md)
- 相关文件：
    - [/snippets/Stop-Callout.css](./snippets/Stop-Callout.css)<sup>2022-11-23 20:35:24</sup>

### 索引标签样式卡片

- 使用说明：[索引标签样式卡片](./Docs/Snippets/Paper-Index-Callout.md)
- 相关文件：
    - [/snippets/Paper-Index-Callout.css](./snippets/Paper-Index-Callout.css)<sup>2022-11-23 20:37:59</sup>

### 生成文字卡片

- 使用说明：[生成文字卡片](./Docs/Templater/Generate-Tweet-Card.md)（待完善）
- 相关文件：
    - [/Templater-Scripts/Generate_Tweet_Card.js](./Templater-Scripts/Generate_Tweet_Card.js)<sup>2022-11-26 08:47:44</sup>

### 获取随机诗词

- 使用说明：[获取随机诗词](./Docs/Templater/Get-Poems.md)
- 相关文件：
    - [/Templater-Scripts/Get_Poems.js](./Templater-Scripts/Get_Poems.js)<sup>2022-11-26 08:47:50</sup>

### 生成渐变背景笔记头图

- 使用说明：[生成渐变背景笔记头图](./Docs/Templater/Add-Gradient-Header.md)
- 相关文件：
    - [/Templater-Scripts/Get_Random_Gradient.js](./Templater-Scripts/Get_Random_Gradient.js)<sup>2022-11-26 08:47:58</sup>
    - [/Templater/Add-Gradient-Header.md](./Templater/Add-Gradient-Header.md)

### 获取一言

- 使用说明：[获取一言](./Docs/Templater/Get-Sentence.md)
- 相关文件：
    - [/Templater-Scripts/Get_Sentence.js](./Templater-Scripts/Get_Sentence.js)<sup>2022-11-26 08:48:05</sup>

### 获取今日日期

- 使用说明：[获取今日日期](./Docs/Templater/Get-Today-Date.md)
- 相关文件：
    - [/Templater-Scripts/Get_Today_Date.js](./Templater-Scripts/Get_Today_Date.js)<sup>2022-11-26 08:48:12</sup>

### 获取历史上的今天

- 使用说明：[获取历史上的今天](./Docs/Templater/Get-Today-History.md)
- 相关文件：
    - [/Templater-Scripts/Get_Today_History.js](./Templater-Scripts/Get_Today_History.js)<sup>2022-11-26 08:48:21</sup>

### 获取天气

- 使用说明：[获取天气](./Docs/Templater/Get-Weather.md)
- 相关文件：
    - [/Templater-Scripts/Get_Weather.js](./Templater-Scripts/Get_Weather.js)<sup>2022-11-26 08:48:27</sup>

### 获取年进度

- 使用说明：[获取年进度](./Docs/Templater/Get-Year-Progress.md)
- 相关文件：
    - [/Templater-Scripts/Get_Year_Progress.js](./Templater-Scripts/Get_Year_Progress.js)<sup>2022-11-26 08:48:36</sup>

### 对选中行排序

- 使用说明：[对选中行排序](./Docs/Templater/Sort-Tasks-Lines.md)
- 相关文件：
    - [/Templater-Scripts/Sort_Tasks_Lines.js](./Templater-Scripts/Sort_Tasks_Lines.js)<sup>2022-11-26 08:48:47</sup>

### 转换为大字符

- 使用说明：[转换为大字符](./Docs/Templater/To-Big-Chars.md)
- 相关文件：
    - [/Templater-Scripts/To_Big_Chars.js](./Templater-Scripts/To_Big_Chars.js)<sup>2022-11-26 08:48:55</sup>
    - [/Templater/Add-Big-Chars.md](./Templater/Add-Big-Chars.md)
    - [/Templater/Add-Big-Chars-Date.md](./Templater/Add-Big-Chars-Date.md)
    - [/Templater/Add-Big-Chars-Time.md](./Templater/Add-Big-Chars-Time.md)

## 技巧分享

- [动态插入代码](./Docs/Usages/Dynamic-Insert-Code.md)
- [Dataview 自定义视图的使用方法](./Docs/Usages/Dataview-Custom-View.md)
- [CSS Snippets 的安装方法](./Docs/Usages/Install-CSS-Snippets.md)
- [Callout 样式的使用方法](./Docs/Usages/How-to-Use-Callout.md)
- [Templater 脚本的使用方法](./Docs/Usages/How-to-Use-Templater-Script.md)

## 计划

### Next

- [x] 笔记热力图（Heatmap）
- [ ] 生成文字卡片
- [ ] 书签缩略图列表
- [ ] 网页剪切缩略视图改为笔记卡片视图

### Plan
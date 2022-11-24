# 自己的 Obsidian 模板

![last-commit](https://img.shields.io/github/last-commit/dmscode/Obsidian-Templates?style=for-the-badge) ![version](https://img.shields.io/static/v1?label=Version&message=0.0.26&color=40AEF0&style=for-the-badge)

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
- [Table of Content](#Table%20of%20Content)
- [目录说明](#%E7%9B%AE%E5%BD%95%E8%AF%B4%E6%98%8E)
- [模板列表](#%E6%A8%A1%E6%9D%BF%E5%88%97%E8%A1%A8)
    - [书签缩略图列表](#%E4%B9%A6%E7%AD%BE%E7%BC%A9%E7%95%A5%E5%9B%BE%E5%88%97%E8%A1%A8)
    - [一日时间段标注](#%E4%B8%80%E6%97%A5%E6%97%B6%E9%97%B4%E6%AE%B5%E6%A0%87%E6%B3%A8)
    - [笔记热力图（Heatmap）](#%E7%AC%94%E8%AE%B0%E7%83%AD%E5%8A%9B%E5%9B%BEHeatmap)
    - [任务完成度](#%E4%BB%BB%E5%8A%A1%E5%AE%8C%E6%88%90%E5%BA%A6)
    - [自动打开入口笔记](#%E8%87%AA%E5%8A%A8%E6%89%93%E5%BC%80%E5%85%A5%E5%8F%A3%E7%AC%94%E8%AE%B0)
    - [侧边栏图标排序](#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%9B%BE%E6%A0%87%E6%8E%92%E5%BA%8F)
    - [禁止通行分割条](#%E7%A6%81%E6%AD%A2%E9%80%9A%E8%A1%8C%E5%88%86%E5%89%B2%E6%9D%A1)
    - [索引标签样式卡片](#%E7%B4%A2%E5%BC%95%E6%A0%87%E7%AD%BE%E6%A0%B7%E5%BC%8F%E5%8D%A1%E7%89%87)
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

- 使用说明：[书签缩略图列表](./Docs/Dataview/Bookmarks.md)
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
    - [/snippets/Side-Dock-Icon-Order..css](./snippets/Side-Dock-Icon-Order.css)<sup>2022-11-23 20:32:32</sup>

### 禁止通行分割条

- 使用说明：[禁止通行分割条](./Docs/Snippets/Stop-Callout.md)
- 相关文件：
    - [/snippets/Stop-Callout.css](./snippets/Stop-Callout.css)<sup>2022-11-23 20:35:24</sup>

### 索引标签样式卡片

- 使用说明：[索引标签样式卡片](./Docs/Snippets/Paper-Index-Callout.md)
- 相关文件：
    - [/snippets/Paper-Index-Callout.css](./snippets/Paper-Index-Callout.css)<sup>2022-11-23 20:37:59</sup>

## 计划

### Next

- [x] 相对规律的命名方式（首字母大写搭配短划线，这样容易读）
- [ ] 书写各个功能的对应文档
- [x] 拆分 CSS Snippets
- [ ] 笔记分栏归入 CSS Snippets
- [ ] 用 Dataview 动态插入样式的方法
- [ ] 网页剪切缩略视图改为笔记卡片视图

### Plan
# 自己的 Obsidian 模板

![last-commit](https://img.shields.io/github/last-commit/dmscode/Obsidian-Templates?style=for-the-badge) ![version](https://img.shields.io/static/v1?label=Version&message=0.0.13&color=40AEF0&style=for-the-badge)

## 简介

自用的一些 Obsidian 模板、脚本、片段等。需要搭配对应插件使用。

## 使用说明

可以 clone 整个仓库，本仓库尽量按照不影响用户原本保险库（Vault）的原则进行组织的，不过为了便于查看，这些文件夹都放在根目录了，也许你 clone 到保险库下的某个文件夹更为合理。

当然也可以只选用你需要的某个功能，复制对应文件，不过这样更新会稍显麻烦。

## 目录说明

- `/Dataview`：Dataview 的自定义视图，每个文件夹对应一个功能，需要 [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件的支持
- `Docs`：本仓库中模板的说明文档
- `QuickAdd`：QuickAdd 的脚本，每个脚本对应一个功能，需要 [QuickAdd](https://github.com/chhoumann/quickadd) 插件的支持
- `snippets`：Obsidian 的 CSS 片段，对应 `.obsidian/snippets` 文件夹，需在 `设置——外观——CSS 片段` 中启用对应的样式
- `Templater-Script`：Templater 的模板文件夹，每个模板对应一个功能，需要 [Templater](https://github.com/SilentVoid13/Templater) 插件的支持，**并将 Templater 的模板文件夹设置为此文件夹**
- `Templater-Script`：Templater 的脚本文件夹，每个脚本对应一个功能，需要 [Templater](https://github.com/SilentVoid13/Templater) 插件的支持，**并将 Templater 的脚本文件夹设置为此文件夹**。脚本需要对应的调用方法，会在文档中写出

## 模板列表

不同于提交时间，这里列出的是每个文件的最后编辑时间，可以视为文件的版本号，用来对照你使用的模板是否有更新版本。

### 书签缩略图列表

- 使用说明：[书签缩略图列表](./Docs/Dataview/Bookmarks.md)
- 相关文件：
    - `/Dataview/Bookmarks-dataview/view.css`<sup style="font-size: .8em; background: #40AEF0; line-height: 1em; padding: 3px 5px; border-radius: 3px; color: #FFF;">2022-11-23 10:11:20</sup>
  -  `/Dataview/Bookmarks-dataview/view.js`<sup style="font-size: .8em; background: #40AEF0; line-height: 1em; padding: 3px 5px; border-radius: 3px; color: #FFF;">2022-10-26 13:26:55</sup>
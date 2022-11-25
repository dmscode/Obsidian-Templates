# 自动打开入口笔记

当打开 Obsidian 的时候自动打开特定笔记。配合 [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) 插件还可以实现打开特定工作区，以及指定打开模式（阅读/编辑）等。

## 相关文件

[/QuickAdd/Open-Home-Page.js](../../QuickAdd/Open-Home-Page.js)

## 使用方法

修改代码中 open 后面的网址为目标笔记地址即可。在笔记列表中右键笔记可以复制对应的地址。

如果使用 Advanced URI，请阅读其文档，来添加各种参数。

然后， QuickAdd 里面创建一个宏，比如叫做 HomePage。怎么添加？

- 管理宏（Manage Macros）
- 填写名字，然后 Add macros

【Run on plugin load】是说是否在这个插件（QuickAdd）加载的时候就运行这个宏，基本上就是问是不是要开机（打开 Obsida）启动。那当然是要开启啊。

【Configure】是配置这个宏，点进去，选择对应的 script 然后 add ，就搞定了。
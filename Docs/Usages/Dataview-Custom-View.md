# Dataview 自定义视图的使用方法

首先，要有两个文件，`view.js` 和 `view.css` ，如果我给出的只有一个文件，那么建议自己创建另一个（空白文件）。

把它们放在同一个文件夹下，不要和其他文件混在一起，记住这个文件夹的路径。

Dataview 插件开启 `Enable JavaScript Queries` 选项。

然后在笔记中插入一个语言为 `dataviewjs` 的代码块，内容如下：

```dataviewjs
await dv.view('上面记得那个路径')
```

如果需要输入参数：

```dataviewjs
await dv.view('上面记得那个路径', { 我会在对应的文档中说明相关参数 })
```

学会这个基本格式之后再阅读对应功能的说明会比较容易理解。
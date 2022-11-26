# 对选中行排序

## 效果展示

似乎无法展示，就是选中一些行，可以对其进行升序排列，我用来快速整理人物列表的，不过目前只是初步实现，对于有子任务的列表完全没有支持。

## 相关文件

[/Templater-Scripts/Sort_Tasks_Lines.js](../../Templater-Scripts/Sort_Tasks_Lines.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.Sort_Tasks_Lines(tp) %>
```

使用时选中一些行，然后插入此模板即可。（及时检查，避免出错导致数据丢失。
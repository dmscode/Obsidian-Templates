# 获取随机诗词

## 效果展示

风驱急雨洒高城，  
云压轻雷殷地声。

—— 刘基  
《五月十九日大雨》

## 相关文件

[/Templater-Scripts/Get-Poems.js](../../Templater-Scripts/Get-Poems.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

### 独立模板文件

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.get_poems() %>
```

### 笔记中动态调用

因为输出内容中有换行格式，所以不支持动态调用。
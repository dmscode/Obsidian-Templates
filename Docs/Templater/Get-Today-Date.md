# 获取今日日期

## 效果展示

2022/11/26 十一月 初三 星期六

## 相关文件

[/Templater-Scripts/Get_Today_Date.js](../../Templater-Scripts/Get_Today_Date.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

### 独立模板文件

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.Get_Today_Date() %>
```

### 笔记中动态调用

在笔记中直接输入如下内容（无需代码块）：

```eta
<%+ tp.user.Get_Today_Date() %>
```

虽然动态调用输出的是单行文本，但是可以用 markdown 语法为其添加格式，比如：

```eta
## <%+ tp.user.Get_Today_Date() %>
```

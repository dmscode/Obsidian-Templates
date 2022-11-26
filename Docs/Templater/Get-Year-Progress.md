# 获取年进度

## 效果展示

Year progress: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 90.24%

## 相关文件

[/Templater-Scripts/Get_Year_Progress.js](../../Templater-Scripts/Get_Year_Progress.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

### 独立模板文件

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.Get_Year_Progress() %>
```

### 笔记中动态调用

```eta
<%+ tp.user.Get_Year_Progress() %>
```

### 细节问题

小括号里可以加入一个数字，来指定进度条的字符数量。

如果稍微高级一点，可以去代码中修改两种字符，换成任意喜欢的字符。

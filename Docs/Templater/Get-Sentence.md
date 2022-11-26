# 获取一言

## 效果展示

世间珍果更无加，玉雪肌肤罩绛纱。

## 相关文件

[/Templater-Scripts/Get_Sentence.js](../../Templater-Scripts/Get_Sentence.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

### 独立模板文件

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.Get_Sentence(tp) %>
```

使用时会弹出选择框，选择要插入的类型。默认类型为“一言”。

### 笔记中动态调用

在笔记中直接输入如下内容（无需代码块）：

```eta
<%+ tp.user.Get_Sentence(tp, "诗词") %>
```

后面双引号为指定的输出类型，可选："毒鸡汤"、"社会语录"、"舔狗日记"、"一言"、"诗词"。注意代码中双引号为英文标点。
# 获取天气

## 效果展示

天气：⛅️ 少云 气温：-1°C 风力：↙20km/h

月相：🌒 日出时间：07:03:29 日落时间：16:45:10

## 相关文件

[/Templater-Scripts/Get_Weather.js](../../Templater-Scripts/Get_Weather.js)

## 使用方法

首先请阅读：[Templater 脚本的使用方法](../Usages/How-to-Use-Templater-Script.md)

然后按照如下格式调用：

### 独立模板文件

在 Templater 的模板文件夹下新建文件，放入如下内容（无需代码块）：

```eta
<% tp.user.Get_Weather("shanghai") %>
```

城市使用地级市的拼音。

### 笔记中动态调用

展示效果中存在换行，但是动态调用无法换行，所以我通过两次调用来实现，这里使用了第二个参数定义输出的数据，详细可阅读： [https://github.com/chubin/wttr.in#one-line-output](https://github.com/chubin/wttr.in#one-line-output)

```eta
<%+ tp.user.Get_Weather("shanghai", "天气：%c %C 气温：%t 风力：%w") %>

<%+ tp.user.Get_Weather("shanghai", "月相：%m 日出时间：%S 日落时间：%s") %>
```

### 细节问题

此接口不稳定，时不时抽风，我还没找到好用的，免费的，无需注册的其他 Api 进行替代。

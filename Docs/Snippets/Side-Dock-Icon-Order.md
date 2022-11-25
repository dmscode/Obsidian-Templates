# 侧边栏图标排序

Obsidian 左侧图标是按照插件加载顺序排列的，所以导致可能每次打开顺序都不一致，不利于肌肉记忆。

通过自定义 CSS 片段可以固定顺序。

## 相关文件

[/snippets/Side-Dock-Icon-Order.css](../../snippets/Side-Dock-Icon-Order.css)

## 使用方法

首先请阅读：[CSS Snippets 的安装方法](../Usages/Install-CSS-Snippets.md)。

鼠标放在侧边栏图标上，会显示一个提示，记住这串文字（一般不长，以你的聪明才智应该能记得住）。

看上面文件，有这样的结构：

```css
.side-dock-actions .side-dock-ribbon-action[aria-label*="根据需求自定义"] {
  order: 10;
}
```

总之，把双引号里的内容修改为你刚才记住的内容就行了。

### 理解排序

`order: 10;` 是说这个图标的排序，数字越小越靠前。我已经预先写好了十个，应该足够日常使用了，所以你修改对应的文字就好。

其中的数字依次加 10 是为了可以向中间添加新的菜单，而不至于因为中间添加一个菜单导致所有的数字都需要修改。

### 隐藏图标

文件最底部几行是隐藏对应的菜单，同样修改双引号中的文字即可，如果不够可以照猫画虎的复制几行。

### 匹配变化的菜单项

比如 Remotely Save 这个插件的图标，在平时和同步时提示的文字是不相同的，但是都有 `Remotely Save`，那就填写这个就行了。当然你也可以用两条来分别对应两种状态，因为两种状态不会同时出现，所以给它们设定相同的 `order` 即可。

举例：

```css
.side-dock-actions .side-dock-ribbon-action[aria-label*="Remotely Save"] {
  order: 100;
}
.side-dock-actions .side-dock-ribbon-action[aria-label*="Remotely Save 正在由 manual 触发运行"] {
  order: 100;
}
```

（高手请勿吐槽此处举例，这只是为了最少修改，降低不懂 CSS 同学的出错几率）
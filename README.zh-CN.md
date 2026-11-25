# Prompt Game · 9 关学会给 AI 下指令

一个中英双语的互动小游戏，让完全不懂 AI 的人，边玩边学会怎么写提示词。

不用注册、不用 API key、没有后端，打开就能玩。

> English version: [README.md](README.md)

## 它是什么

一共 9 关，每关教一个提示词技巧：

1. 提示词的基本结构
2. 说清楚、直接一点
3. 给 AI 安排角色
4. 把资料和指令分开
5. 控制输出格式
6. 让 AI 一步步想
7. 给 AI 例子
8. 防止 AI 乱编
9. 搭一个复杂提示词

每关都是同一个节奏：**学 → 玩 → 判对错 → 得分 → 下一关**。进度和分数存在浏览器本地。

灵感来自 Anthropic 官方 [提示词工程互动教程](https://github.com/anthropics/prompt-eng-interactive-tutorial)。本站内容为原创改写并做成了游戏形式，想学得更深请读原教程。

## 为什么这样做

- **零依赖**：纯 HTML、CSS、JavaScript，没有构建步骤，不用 `npm install`。
- **哪里都能跑**：直接打开 `index.html`，或者用任意静态托管服务。
- **天生双语**：所有界面文案和关卡内容都有中英文两版。
- **开源可改**：MIT 协议，代码小、结构清晰。

## 本地运行

直接用浏览器打开 `index.html`，或者起一个本地服务：

```bash
python3 -m http.server 8080
```

然后访问 <http://localhost:8080>。

## 部署

这是纯静态站，任何静态托管都行：Vercel、Netlify、Cloudflare Pages，或者 GitHub Pages。

## 统计（看有多少人访问）

代码已经通过 `js/analytics.js` 埋好了事件（`page_view`、`game_start`、`level_open`、`level_complete`、`share_click`、`language_switch`）。

想看真实流量，选一个方案：

- **[Umami](https://umami.is)**：开源、隐私友好，国内国外都能访问。自己部署后，把它的 script 标签粘贴到 `index.html` 里 `js/analytics.js` 之前即可，代码不用改。
- **Vercel Analytics**：如果你部署在 Vercel，直接在后台开启。
- **Plausible**：付费托管方案。

## 目录结构

```text
index.html          入口页
css/style.css       全部样式
js/i18n.js          中英文案
js/levels.js        9 关内容
js/app.js           游戏流程与渲染
js/storage.js       本地进度存储
js/analytics.js     统计埋点
```

## 参与贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。欢迎的方向：更好的关卡内容、接入真实模型的沙盒、更多题型、移动端和可访问性优化。

## 许可证

[MIT](LICENSE)

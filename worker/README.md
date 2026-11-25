# 自由练习区后端（Cloudflare Worker）

这个 Worker 是自由练习区的“后厨”：前端把用户输入的提示词发到这里，这里再用藏在环境变量里的 DeepSeek key 去调模型，把结果返回。key 不会出现在前端或 GitHub 上。

## 部署步骤

1. 在终端里全局安装 Wrangler（Cloudflare 的命令行工具）：

   ```bash
   npm install -g wrangler
   ```

2. 登录你的 Cloudflare 账号：

   ```bash
   wrangler login
   ```

3. 进入 worker 目录，把 key 保存为 Worker 密钥（会提示你粘贴，粘贴后不会显示出来）：

   ```bash
   cd worker
   wrangler secret put DEEPSEEK_API_KEY
   ```

4. 部署：

   ```bash
   wrangler deploy
   ```

   部署成功后，终端会给出一个地址，类似：

   ```text
   https://ai-prompt-game-api.你的子域名.workers.dev
   ```

5. 把这个地址填到项目根目录的 `js/config.js` 里：

   ```js
   window.CONFIG = {
     API_ENDPOINT: "https://ai-prompt-game-api.你的子域名.workers.dev"
   };
   ```

   （注意：填完整地址即可，不需要再加 `/api/generate`，前端会自动补。）

## 成本与限流

- 模型是 `deepseek-chat`，每次最多输出 200 个 token，输入最长 500 字，单次成本极低。
- 目前只有“输入长度 + 输出长度”两层限制。如果想进一步防刷，可以后续加 Cloudflare KV 做“每个访客每天限次”。

## 安全提醒

- 不要在 `worker.js` 或前端代码里写死 key，只用 `wrangler secret` 保存。
- 如果 key 曾经在聊天或其它公开地方出现过，建议部署完成后去 DeepSeek 后台作废并重新生成一个。

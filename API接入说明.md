# 文学会客厅接口

默认模型 `deepseek-flash`，Base URL `https://api.deepseek.com`。密钥只放服务端，不提交 GitHub。

## 本地启动（Node.js 22+）

1. 复制 `.env.example` 为 `.env`，在 `AI_API_KEY=` 后填写你的 DeepSeek 密钥。
2. 在当前目录运行 `node --env-file=.env persona-server.mjs`。
3. 另一个终端运行 `python -m http.server 8080`，打开 `http://localhost:8080/#salon`。
4. 在会客厅“连接设置”填写 `http://localhost:8787/api/character-chat`。

GitHub Pages 仅运行静态网页。给所有访客使用时，需要把 `persona-server.mjs` 与 `characters.json` 部署至支持 Node.js 的服务器，配置上述环境变量并启用 HTTPS。将其 HTTPS 接口地址填入会客厅连接设置即可。若要默认对所有访客生效，可在 salon.js 中把 settings.endpoint 的空字符串默认值改成该 HTTPS 接口地址。无需将 API Key 交给访客。

## 请求

`POST /api/character-chat`，`Content-Type: application/json`

```json
{"character":"libai","messages":[{"role":"user","content":"失意时怎样面对自己？"}],"length":"short","thinking":false}
```

character：`libai` / `sushi` / `liqingzhao` / `luxun`。length：`short` / `medium` / `long`。最多12条历史消息，每条最多6000字符；请求最大32KB。

成功返回 `{"reply":"人物的回答"}`。错误返回 `{"error":"说明"}`，HTTP 状态码为400、403、413、429、502或503。`GET /health` 返回是否已填写密钥，不返回密钥本身。

当前限流为单实例、按连接来源IP每分钟10次，重启即清空。公开大规模部署应在反向代理处增加可信IP限流、每日额度和机器人防护；CORS并不等同于用户认证。不要盲目信任客户端的 X-Forwarded-For。

## 人物与模型替换

人物生平、性格提示、开场白和推荐话题集中在 `characters.json`，修改后同时更新服务器和静态文件。现有视觉为AI生成的四幅艺术演绎头像，并非3D模型、真实肖像或历史复原。以后可将 salon.js 的 portrait() 换成你的模型渲染器，保留角色ID与接口即可。

未连接API时，页面明确标示固定示例预览；示例回答不代表实时AI回答。实际多轮效果需要填写密钥后验证。参考官方文档：https://api-docs.deepseek.com/api/create-chat-completion/

## 人物语音

页面通过浏览器 Web Speech API 朗读AI回答，无需增加API密钥。默认按人物演绎气质选择设备中可用的中文声音，并设置语速、音高；可手动为每位人物选择声音。音色因操作系统和浏览器而异，不是历史人物原声。支持逐条朗读、停止、试听及自动朗读；切换人物和离开页面会停止播放。当前自动朗读默认关闭。尚未验证实体设备的扬声器输出，已用模拟语音接口检查调用和停止逻辑。

## Three.js背景

Three.js 0.180.0 随项目本地提供，许可证见 vendor/THREE-LICENSE.txt。背景动态可暂停；页面不可见或离开首页时停止渲染，开启减少动态效果或缺少WebGL时保留静态背景。

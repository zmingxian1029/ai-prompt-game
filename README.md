# Prompt Game · Learn to Prompt in 9 Levels

An interactive, bilingual (中文 / English) game that teaches complete beginners how to write good AI prompts, one small concept at a time.

No sign-up. No API key. No backend. Just open it and play.

> 中文说明见 [README.zh-CN.md](README.zh-CN.md)

## What it is

9 levels, each teaching one prompt-engineering technique:

1. Basic prompt structure
2. Being clear and direct
3. Assigning a role
4. Separating data from instructions
5. Controlling the output format
6. Thinking step by step
7. Showing examples
8. Avoiding hallucinations
9. Building a complex prompt

Each level follows the same loop: **learn → play → get feedback → score → next level**. Progress and scores are saved in your browser.

Inspired by Anthropic's official [Prompt Engineering Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial). The content here is original and adapted for a game format; go read the source for the full depth.

## Why it's built this way

- **Zero dependencies** — plain HTML, CSS, and JavaScript. No build step, no `npm install`.
- **Runs anywhere** — open `index.html` directly, or serve the folder with any static host.
- **Bilingual by design** — every string and every level exists in both Chinese and English.
- **Open and forkable** — MIT licensed, small and readable.

## Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit <http://localhost:8080>.

## Deploy

This is a static site, so any static host works:

- **Vercel / Netlify / Cloudflare Pages** — point them at this folder.
- **GitHub Pages** — enable Pages on the repo and select the root of `main`.

## Analytics (see who visits)

The code already emits events (`page_view`, `game_start`, `level_open`, `level_complete`, `share_click`, `language_switch`) through a tiny `js/analytics.js` shim.

To see real traffic numbers, pick one:

- **[Umami](https://umami.is)** — open source, privacy-friendly, works for both China and overseas users. Self-host it, then paste its script tag before `js/analytics.js` in `index.html`.
- **Vercel Analytics** — enable it in your Vercel dashboard if you deploy there.
- **Plausible** — a paid hosted alternative.

The shim automatically calls `umami.track(name, props)` when the Umami script is present, so no code changes are needed after pasting the script.

## Project structure

```text
index.html          entry page
css/style.css       all styles
js/i18n.js          Chinese / English strings
js/levels.js        9 levels of content
js/app.js           game flow and rendering
js/storage.js       localStorage progress
js/analytics.js     analytics event shim
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Ideas that are welcome:

- Better level content or new levels
- A live-model sandbox (serverless function + model API)
- More challenge types
- Accessibility and mobile polish

## License

[MIT](LICENSE)

(function () {
  var STR = {
    zh: {
      brand: "9 关学会给 AI 下指令",
      github: "GitHub",
      heroTitle: "9 关学会给 AI 下指令",
      heroSub: "一个互动小游戏，让你边玩边学会写提示词。不用注册，打开即玩。",
      start: "免费开玩",
      welcomeBadge: "给 AI 小白的互动教程",
      welcomeTitleBefore: "9 关学会",
      welcomeTitleHighlight: "给 AI 下指令",
      welcomeTitleAfter: "",
      welcomeSlogan: "不会写提示词？我们把它做成了游戏。",
      stat1Value: "9",
      stat1Label: "关",
      stat2Value: "~10",
      stat2Label: "分钟",
      stat3Value: "2",
      stat3Label: "种语言",
      welcomeDesc: "从「说清楚」一路打到「防乱编」，每关四步：学、玩、判、得。不用注册，打开即玩。",
      startJourney: "开启探索之旅",
      overviewBadge: "学习概览",
      overviewTitle: "9 个技巧，从新手到高级",
      overviewDesc: "每关一个提示词技巧，按难度分成三档。",
      tierRange: "第 {a}–{b} 关",
      loopNote: "每关四步，学 → 玩 → 判 → 得。",
      startLevel1: "从第 1 关开始",
      levelMapTitle: "关卡地图",
      levelPrefix: "第 {n} 关",
      tier_beginner: "新手",
      tier_intermediate: "中级",
      tier_advanced: "高级",
      back: "← 返回地图",
      learnTitle: "先学这一招",
      challengeTitle: "实战挑战",
      learnPoints: "要点",
      learnWhy: "为什么重要",
      badExample: "不推荐",
      goodExample: "推荐",
      sandboxTitle: "自由练习区",
      check: "检查答案",
      reset: "重排",
      tryAgain: "再试一次",
      next: "下一关",
      goChallenge: "去挑战",
      backToLearn: "← 返回学习",
      finish: "完成",
      completeMsg: "回答正确！",
      wrongMsg: "再想想，提示：",
      sortHint: "按正确顺序点击下方步骤",
      scoreLabel: "得分",
      progressLabel: "进度",
      sandboxNote: "演示版：这里展示预设示例。接入真实模型后，你可以输入任意内容实时生成。",
      sandboxPlaceholder: "在这里输入你的提示词，例如：帮我写一句产品介绍",
      sandboxRun: "生成回复",
      sandboxLoading: "生成中…",
      sandboxError: "出错了，请稍后再试。",
      sandboxTryExample: "试试例子",
      completionTitle: "恭喜通关！",
      completionSub: "你已经学会 9 个提示词技巧，现在可以给 AI 下更准确的指令了。",
      yourScore: "你的总分",
      share: "复制链接分享",
      copied: "好用！点击分享链接",
      playAgain: "再来一遍！",
      tierDone: "已完成 {a}/{b}",
      inspired: "灵感来自 Anthropic 官方提示词教程",
      badgePrefix: "徽章"
    },
    en: {
      brand: "Learn to Prompt in 9 Levels",
      github: "GitHub",
      heroTitle: "Learn to Prompt in 9 Levels",
      heroSub: "A game that teaches you prompt engineering, one level at a time. No sign-up, just play.",
      start: "Start playing",
      welcomeBadge: "An interactive tutorial for AI beginners",
      welcomeTitleBefore: "Learn to ",
      welcomeTitleHighlight: "Prompt",
      welcomeTitleAfter: " in 9 Levels",
      welcomeSlogan: "Can't write prompts? We turned it into a game.",
      stat1Value: "9",
      stat1Label: "levels",
      stat2Value: "~10",
      stat2Label: "min",
      stat3Value: "2",
      stat3Label: "languages",
      welcomeDesc: "From 'be clear' to 'avoid hallucinations', every level has four steps: learn, play, check, score. No sign-up, just play.",
      startJourney: "Start your journey",
      overviewBadge: "Learning overview",
      overviewTitle: "9 techniques, from beginner to advanced",
      overviewDesc: "Each level teaches one prompt technique, grouped by difficulty.",
      tierRange: "Levels {a}–{b}",
      loopNote: "Every level: learn → play → check → score.",
      startLevel1: "Start with Level 1",
      levelMapTitle: "Level map",
      levelPrefix: "Level {n}",
      tier_beginner: "Beginner",
      tier_intermediate: "Intermediate",
      tier_advanced: "Advanced",
      back: "← Back to map",
      learnTitle: "Learn this technique",
      challengeTitle: "Challenge",
      learnPoints: "Key points",
      learnWhy: "Why it matters",
      badExample: "Avoid",
      goodExample: "Better",
      sandboxTitle: "Free playground",
      check: "Check answer",
      reset: "Reset",
      tryAgain: "Try again",
      next: "Next level",
      goChallenge: "Start the challenge",
      backToLearn: "← Back to lesson",
      finish: "Finish",
      completeMsg: "Correct!",
      wrongMsg: "Not quite. Hint:",
      sortHint: "Click the steps in the correct order",
      scoreLabel: "Score",
      progressLabel: "Progress",
      sandboxNote: "Demo mode: showing preset examples. Once a live model is connected, you can type anything and get instant output.",
      sandboxPlaceholder: "Type a prompt here, e.g. write me a product intro",
      sandboxRun: "Generate",
      sandboxLoading: "Generating…",
      sandboxError: "Something went wrong. Please try again.",
      sandboxTryExample: "Try an example",
      completionTitle: "You finished all levels!",
      completionSub: "You now know 9 prompt techniques to give AI better instructions.",
      yourScore: "Your score",
      share: "Copy link to share",
      copied: "Nice! Click to share the link",
      playAgain: "Play again!",
      tierDone: "{a}/{b} done",
      inspired: "Inspired by Anthropic's official prompt engineering tutorial",
      badgePrefix: "Badges"
    }
  };

  var LS_KEY = "pg_lang";
  var lang = "zh";
  try { lang = localStorage.getItem(LS_KEY) || "zh"; } catch (e) {}

  function t(key, vars) {
    var s = (STR[lang] && STR[lang][key] != null) ? STR[lang][key] : (STR.zh[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split("{" + k + "}").join(vars[k]);
      });
    }
    return s;
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem(LS_KEY, l); } catch (e) {}
    applyDom();
  }

  function getLang() { return lang; }

  function applyDom() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      el.textContent = t(k);
    });
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }

  window.I18N = { t: t, setLang: setLang, getLang: getLang, applyDom: applyDom };
})();

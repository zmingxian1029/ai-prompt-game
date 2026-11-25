(function () {
  var I = window.I18N;
  var L = window.LEVELS;
  var S = window.Store;
  var A = window.Analytics;

  var $app = document.getElementById("app");
  var $langToggle = document.getElementById("langToggle");

  var completed = S.get("completed", []);
  var scores = S.get("scores", {});
  var view = "welcome";
  var levelStage = "learn";
  var currentTier = "beginner";

  function lang() { return I.getLang(); }
  function pick(obj) { return (obj && obj[lang()] != null) ? obj[lang()] : (obj ? obj.zh : ""); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }

  function isDone(id) { return completed.indexOf(id) !== -1; }
  function tierLabel(t) { return I.t("tier_" + t); }
  function tierClass(t) { return "tier-" + t; }
  function tierOf(id) {
    for (var i = 0; i < L.length; i++) { if (L[i].id === id) return L[i].tier; }
    return "beginner";
  }

  function firstUnfinished() {
    for (var i = 0; i < L.length; i++) {
      if (!isDone(L[i].id)) return L[i].id;
    }
    return null;
  }

  function totalScore() {
    var s = 0;
    Object.keys(scores).forEach(function (k) { s += scores[k] || 0; });
    return s;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function render() {
    var footer = document.querySelector(".footer");
    if (footer) footer.style.display = (view === "welcome") ? "none" : "";
    if (view === "welcome") renderWelcome();
    else if (view === "overview") renderOverview();
    else if (view === "transition") renderTransition();
    else if (view === "tier") renderTier();
    else if (view === "completion") renderCompletion();
    else renderLevel(view);
  }

  function renderWelcome() {
    var html = '<section class="welcome">'
      + '<div class="w-badge">' + esc(I.t("welcomeBadge")) + '</div>'
      + '<h1>' + esc(I.t("welcomeTitleBefore")) + '<span class="highlight">' + esc(I.t("welcomeTitleHighlight")) + '</span>' + esc(I.t("welcomeTitleAfter")) + '</h1>'
      + '<p class="w-slogan">' + esc(I.t("welcomeSlogan")) + '</p>'
      + '<div class="w-stats">'
      + '<div class="w-stat"><div class="w-stat-value">' + esc(I.t("stat1Value")) + '</div><div class="w-stat-label">' + esc(I.t("stat1Label")) + '</div></div>'
      + '<div class="w-stat"><div class="w-stat-value">' + esc(I.t("stat2Value")) + '</div><div class="w-stat-label">' + esc(I.t("stat2Label")) + '</div></div>'
      + '<div class="w-stat"><div class="w-stat-value">' + esc(I.t("stat3Value")) + '</div><div class="w-stat-label">' + esc(I.t("stat3Label")) + '</div></div>'
      + '</div>'
      + '<p class="w-desc">' + esc(I.t("welcomeDesc")) + '</p>'
      + '<button class="cta" id="startJourneyBtn">' + esc(I.t("startJourney")) + '</button>'
      + '<p class="w-source">' + esc(I.t("inspired")) + ' · <a href="https://github.com/anthropics/prompt-eng-interactive-tutorial" target="_blank" rel="noopener">anthropics/prompt-eng-interactive-tutorial</a></p>'
      + '<p class="w-dev">开发者：娴仔 | <a href="mailto:zmingxian1029@163.com">zmingxian1029@163.com</a></p>'
      + '</section>';
    $app.innerHTML = html;
    document.getElementById("startJourneyBtn").addEventListener("click", function () {
      A.track("start_journey", {});
      view = "overview";
      render();
    });
  }

  function renderOverview() {
    var tiers = ["beginner", "intermediate", "advanced"];
    var html = '<section class="overview">'
      + '<div class="w-badge">' + esc(I.t("overviewBadge")) + '</div>'
      + '<h1 class="overview-title">' + esc(I.t("overviewTitle")) + '</h1>'
      + '<p class="overview-desc">' + esc(I.t("overviewDesc")) + '</p>';

    tiers.forEach(function (t) {
      var lvs = L.filter(function (l) { return l.tier === t; });
      var range = lvs.length ? I.t("tierRange", { a: lvs[0].id, b: lvs[lvs.length - 1].id }) : "";
      html += '<button class="tier-card" type="button" data-tier="' + t + '">'
        + '<span class="tier-pill ' + tierClass(t) + '">' + esc(tierLabel(t)) + '</span>'
        + '<span class="tier-card-range">' + esc(range) + '</span>'
        + '<span class="tier-card-count">' + esc(I.t("levelsCount", { n: lvs.length })) + '</span>'
        + '<span class="tier-card-arrow">→</span>'
        + '</button>';
    });

    html += '<p class="loop-note">' + esc(I.t("loopNote")) + '</p>'
      + '<button class="cta" id="startLevel1Btn">' + esc(I.t("startLevel1")) + '</button>'
      + '</section>';
    $app.innerHTML = html;

    document.getElementById("startLevel1Btn").addEventListener("click", function () {
      var startId = firstUnfinished();
      if (startId === null) { view = "completion"; render(); return; }
      currentTier = tierOf(startId);
      view = "transition";
      levelStage = "learn";
      render();
    });
    document.querySelectorAll(".tier-card").forEach(function (el) {
      el.addEventListener("click", function () {
        currentTier = el.getAttribute("data-tier");
        view = "tier";
        A.track("tier_open", { tier: currentTier });
        render();
      });
    });
  }

  function renderTransition() {
    var t = currentTier;
    var lvs = L.filter(function (l) { return l.tier === t; });
    if (!lvs.length) { view = "overview"; render(); return; }

    var range = I.t("tierRange", { a: lvs[0].id, b: lvs[lvs.length - 1].id });
    var start = lvs.filter(function (l) { return !isDone(l.id); })[0] || lvs[0];

    var html = '<section class="transition-page">'
      + '<h1 class="transition-big">' + esc(I.t("transition_" + t + "_title")) + '</h1>'
      + '<p class="transition-small">' + esc(range) + '</p>'
      + '<button class="cta" id="transitionStartBtn">' + esc(I.t("transitionStart")) + '</button>'
      + '<button class="back transition-back" id="transitionBackBtn">' + esc(I.t("backToOverview")) + '</button>'
      + '</section>';
    $app.innerHTML = html;

    document.getElementById("transitionStartBtn").addEventListener("click", function () {
      view = start.id;
      levelStage = "learn";
      A.track("transition_start", { tier: t, level: start.id });
      render();
    });
    document.getElementById("transitionBackBtn").addEventListener("click", function () {
      view = "overview";
      render();
    });
  }

  function renderTier() {
    var t = currentTier;
    var lvs = L.filter(function (l) { return l.tier === t; });
    if (!lvs.length) { view = "overview"; render(); return; }

    var range = I.t("tierRange", { a: lvs[0].id, b: lvs[lvs.length - 1].id });
    var next = lvs.filter(function (l) { return !isDone(l.id); })[0] || lvs[0];

    var html = '<section class="tier-page">'
      + '<button class="back" id="backToOverviewBtn">' + esc(I.t("backToOverview")) + '</button>'
      + '<h2>' + esc(tierLabel(t)) + ' · ' + esc(range) + '</h2>'
      + '<p class="tier-page-desc">' + esc(I.t("tierPageDesc")) + '</p>'
      + '<div class="tier-levels">'
      + lvs.map(function (l) {
        return '<div class="tier-level' + (isDone(l.id) ? ' done' : '') + '" data-id="' + l.id + '">'
          + '<span class="tl-num">' + esc(I.t("levelPrefix", { n: l.id })) + '</span>'
          + '<span class="tl-title">' + esc(pick(l.title)) + '</span>'
          + '<span class="tl-desc">' + esc(pick(l.concept)) + '</span>'
          + (isDone(l.id) ? '<span class="tl-check">✓</span>' : '')
          + '</div>';
      }).join("")
      + '</div>'
      + '<button class="cta" id="startTierBtn">' + esc(I.t("tierStart", { n: next.id })) + '</button>'
      + '</section>';
    $app.innerHTML = html;

    document.getElementById("backToOverviewBtn").addEventListener("click", function () {
      view = "overview";
      render();
    });
    document.getElementById("startTierBtn").addEventListener("click", function () {
      view = next.id;
      levelStage = "learn";
      render();
    });
    document.querySelectorAll(".tier-level").forEach(function (el) {
      el.addEventListener("click", function () {
        view = parseInt(el.getAttribute("data-id"), 10);
        levelStage = "learn";
        A.track("level_open", { level: view });
        render();
      });
    });
  }

  function renderLevel(id) {
    var lv = null;
    for (var i = 0; i < L.length; i++) { if (L[i].id === id) { lv = L[i]; break; } }
    if (!lv) { view = "overview"; render(); return; }

    var done = isDone(id);
    var pct = Math.round((completed.length / L.length) * 100);
    var isChallenge = levelStage === "challenge";

    var html = '<div class="level-view">'
      + '<button class="back" id="backBtn">' + esc(isChallenge ? I.t("backToLearn") : I.t("back")) + '</button>'
      + '<h2>' + esc(I.t("levelPrefix", { n: lv.id })) + ' · ' + esc(pick(lv.title)) + '</h2>'
      + '<div class="tier-line"><span class="tier-pill ' + tierClass(lv.tier) + '">' + esc(tierLabel(lv.tier)) + '</span> ' + esc(pick(lv.concept)) + '</div>'
      + '<div class="progress-bar"><div class="fill" style="width:' + pct + '%"></div></div>'
      + '<div class="tier-line">' + esc(I.t("progressLabel")) + ': ' + completed.length + '/' + L.length + ' · ' + esc(I.t("scoreLabel")) + ': ' + totalScore() + '</div>';

    if (!isChallenge) {
      html += '<div class="card"><h3>' + esc(I.t("learnTitle")) + '</h3>'
        + '<div class="concept">' + esc(pick(lv.concept)) + '</div>'
        + '<p>' + nl2br(pick(lv.learn)) + '</p>'
        + (lv.points ? '<div class="points"><span class="points-title">' + esc(I.t("learnPoints")) + '</span><ul>' + lv.points.map(function (p) { return '<li>' + esc(pick(p)) + '</li>'; }).join("") + '</ul></div>' : '')
        + (lv.why ? '<div class="why">' + esc(I.t("learnWhy")) + '：' + esc(pick(lv.why)) + '</div>' : '')
        + '<div class="example-box">'
        + '<div class="col bad"><span class="label">✗ ' + esc(I.t("badExample")) + '</span>' + nl2br(pick(lv.example.bad)) + '</div>'
        + '<div class="col good"><span class="label">✓ ' + esc(I.t("goodExample")) + '</span>' + nl2br(pick(lv.example.good)) + '</div>'
        + '</div></div>'
        + '<div class="btn-row"><button class="btn" id="goChallengeBtn">' + esc(I.t("goChallenge")) + '</button></div>'
        + '</div>';
      $app.innerHTML = html;
      document.getElementById("backBtn").addEventListener("click", function () {
        view = "tier";
        currentTier = lv.tier;
        levelStage = "learn";
        render();
      });
      document.getElementById("goChallengeBtn").addEventListener("click", function () {
        levelStage = "challenge";
        A.track("challenge_start", { level: lv.id });
        render();
      });
      return;
    }

    html += '<div class="card" id="challengeCard"><h3>' + esc(I.t("challengeTitle")) + '</h3>'
      + '<p>' + esc(pick(lv.challenge.question)) + '</p>'
      + '<div id="challengeBody"></div>'
      + '<div class="btn-row"><button class="btn" id="checkBtn">' + esc(I.t("check")) + '</button><button class="btn btn-ghost" id="resetBtn">' + esc(I.t("reset")) + '</button></div>'
      + '<div class="feedback" id="feedback"></div>'
      + '</div>'
      + '<div class="btn-row">'
      + '<button class="btn btn-ghost" id="backToLearnBtn">' + esc(I.t("backToLearn")) + '</button>'
      + '<button class="btn" id="nextBtn" ' + (done ? "" : "disabled") + '>' + esc(id < L.length ? I.t("next") : I.t("finish")) + '</button>'
      + '</div></div>';
    $app.innerHTML = html;

    document.getElementById("backBtn").addEventListener("click", function () { levelStage = "learn"; render(); });
    document.getElementById("backToLearnBtn").addEventListener("click", function () { levelStage = "learn"; render(); });
    document.getElementById("nextBtn").addEventListener("click", function () {
      var curIdx = 0;
      for (var i = 0; i < L.length; i++) { if (L[i].id === id) { curIdx = i; break; } }
      if (curIdx === L.length - 1) { view = "completion"; render(); return; }

      var nextLevel = L[curIdx + 1];
      var nextTier = nextLevel.tier;
      currentTier = nextTier;
      levelStage = "learn";
      if (nextTier !== tierOf(id)) {
        view = "transition";
      } else {
        view = nextLevel.id;
      }
      render();
    });

    setupChallenge(lv, done);
  }

  function setupChallenge(lv, alreadyDone) {
    var body = document.getElementById("challengeBody");
    var checkBtn = document.getElementById("checkBtn");
    var resetBtn = document.getElementById("resetBtn");
    var feedback = document.getElementById("feedback");
    var ch = lv.challenge;

    var state = {
      answered: alreadyDone,
      attempts: 0,
      selected: null,
      pool: null,
      chosen: null
    };

    if (ch.type === "choose") {
      body.innerHTML = '<div class="challenge-options">'
        + ch.options.map(function (o, idx) {
          return '<button class="option" data-idx="' + idx + '">' + esc(pick(o)) + '</button>';
        }).join("")
        + '</div>';

      var opts = body.querySelectorAll(".option");
      opts.forEach(function (el) {
        el.addEventListener("click", function () {
          if (state.answered) return;
          state.selected = parseInt(el.getAttribute("data-idx"), 10);
          opts.forEach(function (o) { o.classList.remove("selected"); });
          el.classList.add("selected");
        });
      });

      checkBtn.addEventListener("click", function () {
        if (state.answered) return;
        if (state.selected === null) return;
        state.attempts++;
        var ok = state.selected === ch.correctIndex;
        opts.forEach(function (o, idx) {
          if (idx === ch.correctIndex) o.classList.add("correct");
          if (idx === state.selected && !ok) o.classList.add("wrong");
        });
        if (ok) {
          state.answered = true;
          markCompleted(lv, state.attempts === 1);
          feedback.className = "feedback show ok";
          feedback.innerHTML = "✓ " + esc(I.t("completeMsg"));
          enableNext(lv);
        } else {
          feedback.className = "feedback show no";
          feedback.innerHTML = esc(I.t("wrongMsg")) + " " + esc(pick(ch.explanation));
        }
      });
    } else if (ch.type === "sort") {
      state.pool = shuffle(ch.items);
      state.chosen = [];
      body.innerHTML = '<p class="note">' + esc(I.t("sortHint")) + '</p>'
        + '<div class="sort-area"><div class="sort-chosen" id="chosenArea"></div>'
        + '<div class="sort-pool" id="poolArea"></div></div>';
      renderSort(state);

      checkBtn.addEventListener("click", function () {
        if (state.answered) return;
        if (state.chosen.length !== ch.items.length) return;
        state.attempts++;
        var ok = true;
        for (var i = 0; i < ch.items.length; i++) {
          if (state.chosen[i].zh !== ch.items[i].zh) { ok = false; break; }
        }
        if (ok) {
          state.answered = true;
          markCompleted(lv, state.attempts === 1);
          feedback.className = "feedback show ok";
          feedback.innerHTML = "✓ " + esc(I.t("completeMsg"));
          enableNext(lv);
        } else {
          feedback.className = "feedback show no";
          feedback.innerHTML = esc(I.t("wrongMsg")) + " " + esc(pick(ch.explanation));
        }
      });
    }

    resetBtn.addEventListener("click", function () {
      if (ch.type === "sort") {
        state.pool = shuffle(ch.items);
        state.chosen = [];
        state.selected = null;
        feedback.className = "feedback";
        renderSort(state);
      } else {
        state.selected = null;
        feedback.className = "feedback";
        body.querySelectorAll(".option").forEach(function (o) {
          o.classList.remove("selected", "correct", "wrong");
        });
      }
    });

    if (alreadyDone) {
      feedback.className = "feedback show ok";
      feedback.innerHTML = "✓ " + esc(I.t("completeMsg"));
    }
  }

  function renderSort(state) {
    var chosenArea = document.getElementById("chosenArea");
    var poolArea = document.getElementById("poolArea");
    if (!chosenArea || !poolArea) return;
    chosenArea.innerHTML = state.chosen.map(function (it, idx) {
      return '<span class="chip picked" data-idx="' + idx + '">' + (idx + 1) + '. ' + esc(pick(it)) + '</span>';
    }).join("");
    poolArea.innerHTML = state.pool.map(function (it, idx) {
      return '<span class="chip" data-idx="' + idx + '">' + esc(pick(it)) + '</span>';
    }).join("");

    chosenArea.querySelectorAll(".chip").forEach(function (el) {
      el.addEventListener("click", function () {
        if (state.answered) return;
        var idx = parseInt(el.getAttribute("data-idx"), 10);
        var item = state.chosen.splice(idx, 1)[0];
        state.pool.push(item);
        renderSort(state);
      });
    });
    poolArea.querySelectorAll(".chip").forEach(function (el) {
      el.addEventListener("click", function () {
        if (state.answered) return;
        var idx = parseInt(el.getAttribute("data-idx"), 10);
        var item = state.pool.splice(idx, 1)[0];
        state.chosen.push(item);
        renderSort(state);
      });
    });
  }

  function markCompleted(lv, firstTry) {
    if (!isDone(lv.id)) {
      completed.push(lv.id);
      S.set("completed", completed);
    }
    if (!(lv.id in scores)) {
      scores[lv.id] = firstTry ? 100 : 60;
      S.set("scores", scores);
    }
    A.track("level_complete", { level: lv.id, firstTry: firstTry });
  }

  function enableNext(lv) {
    var next = document.getElementById("nextBtn");
    if (next) next.removeAttribute("disabled");
  }

  function renderCompletion() {
    var tiers = ["beginner", "intermediate", "advanced"];
    var tierRows = tiers.map(function (t) {
      var lvs = L.filter(function (l) { return l.tier === t; });
      var done = lvs.filter(function (l) { return isDone(l.id); }).length;
      return '<div class="ts-row">'
        + '<span class="ts-label"><span class="tier-pill ' + tierClass(t) + '">' + esc(tierLabel(t)) + '</span></span>'
        + '<div class="ts-bar"><div class="ts-fill" style="width:' + Math.round((done / lvs.length) * 100) + '%"></div></div>'
        + '<span class="ts-count">' + esc(I.t("tierDone", { a: done, b: lvs.length })) + '</span>'
        + '</div>';
    }).join("");

    var html = '<section class="completion">'
      + '<div class="big">🏆</div>'
      + '<h2>' + esc(I.t("completionTitle")) + '</h2>'
      + '<p>' + esc(I.t("completionSub")) + '</p>'
      + '<p><strong>' + esc(I.t("yourScore")) + '</strong>: ' + totalScore() + '</p>'
      + '<div class="tier-summary">' + tierRows + '</div>'
      + '<div class="btn-row" style="justify-content:center">'
      + '<button class="btn" id="shareBtn">' + esc(I.t("share")) + '</button>'
      + '<button class="btn btn-ghost" id="backHomeBtn">' + esc(I.t("playAgain")) + '</button>'
      + '</div></section>';
    $app.innerHTML = html;

    document.getElementById("shareBtn").addEventListener("click", function () {
      A.track("share_click", {});
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          var b = document.getElementById("shareBtn");
          b.textContent = I.t("copied");
        }).catch(function () {});
      }
    });
    document.getElementById("backHomeBtn").addEventListener("click", function () {
      completed = [];
      scores = {};
      S.set("completed", completed);
      S.set("scores", scores);
      A.track("play_again", {});
      view = "transition";
      currentTier = "beginner";
      levelStage = "learn";
      render();
    });
  }

  function init() {
    I.applyDom();
    updateLangButton();
    $langToggle.addEventListener("click", function () {
      var next = I.getLang() === "zh" ? "en" : "zh";
      I.setLang(next);
      updateLangButton();
      A.track("language_switch", { lang: next });
      render();
    });
    A.pageView();
    render();
  }

  function updateLangButton() {
    $langToggle.textContent = I.getLang() === "zh" ? "EN" : "中文";
  }

  init();
})();

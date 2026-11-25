(function () {
  function track(name, props) {
    try {
      if (window.umami && typeof window.umami.track === "function") {
        window.umami.track(name, props);
      }
      if (window.console) {
        console.debug("[analytics]", name, props || {});
      }
    } catch (e) {}
  }
  function pageView() {
    track("page_view", { path: window.location.pathname });
  }
  window.Analytics = { track: track, pageView: pageView };
})();

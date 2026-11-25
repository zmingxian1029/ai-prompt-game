(function () {
  function get(key, fallback) {
    try {
      var v = localStorage.getItem("pg_" + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  }
  function set(key, val) {
    try { localStorage.setItem("pg_" + key, JSON.stringify(val)); } catch (e) {}
  }
  window.Store = { get: get, set: set };
})();

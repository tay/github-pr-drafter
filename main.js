(function() {
  "use strict";
  var titleId = "pull_request_title";
  var bodyId = "pull_request_body";

  var titleEl = document.getElementById(titleId);
  var bodyEl = document.getElementById(bodyId);
  var cacheKey = getCacheKey(window.location.href);

  // TODO: Take into account different hosts, URL
  function getCacheKey(url) {
    var regex = /github.com\/([a-z-]+\/[a-z-\.]+)\/compare\/([a-z]+)...([a-z_]+)/;

    var result = url.match(regex);

    if (!result) {
      return null;
    }

    return [result[1], result[2], result[3]].join('|');
  }

  function set(cacheKey, values) {
    var jsonified = JSON.stringify(values);
    localStorage.setItem(cacheKey, jsonified);
  }

  function get(cacheKey) {
    var stored = localStorage.getItem(cacheKey);

    if (stored) {
      return JSON.parse(stored);
    }
  }

  function updateStore() {
    set(cacheKey, {
      title: titleEl.value,
      body: bodyEl.value
    });
  }

  function populateFromStore() {
    var stored = get(cacheKey);
    if (stored) {
      titleEl.setAttribute('value', stored.title);
      bodyEl.setAttribute('value', stored.body);
    }
  }

  function init() {
    populateFromStore();
    titleEl.addEventListener('input', updateStore);
    bodyEl.addEventListener('input', updateStore);
  }
  
  init();
}());
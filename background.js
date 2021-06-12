importScripts("storage.mjs");

const selectedTransitionTypes = [
  "link",
  "typed",
  "auto_bookmark",
  "manual_subframe",
  "generated",
  "reload",
  "keyword",
  "keyword_generated",
];

const value = { Hello: "World" };

chrome.storage.sync.set({ key: value }, function () {
  console.log(value);
});

chrome.storage.sync.get(["key"], function (result) {
  console.log(result.key);
});

chrome.webNavigation.onCommitted.addListener((e) => {
  if (selectedTransitionTypes.includes(e.transitionType)) {
    const visitedUrl = new StatisticsURL(new URL(e.url));

    addNewurl(visitedUrl);
  }
});

/*const registration = await navigator.serviceWorker.register("test.js", {
  type: "module",
});
*/

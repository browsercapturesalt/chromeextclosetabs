function checkTabs() {
  const urls = {};
  chrome.tabs.getAllInWindow(undefined, (tabs) => {
    for (const tab of tabs) {
      if (urls[tab.url]) {
        urls[tab.url]++;
        console.log("removing", tab.url, "multipilicity", urls[tab.url]);
        chrome.tabs.remove(tab.id);
      } else {
        urls[tab.url] = 1;
      }
    }
  });
}

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
chrome.runtime.onInstalled.addListener(() => {
  checkTabs();

  setInterval(checkTabs, 1000);

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: ".*" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

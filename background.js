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

  setTimeout(checkTabs, 1000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("watch");
  checkTabs();
});

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
chrome.runtime.onStartup.addListener(() => {
  console.log("startup");
  checkTabs();
});

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
  checkTabs();

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

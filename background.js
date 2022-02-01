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
  console.log("Runtime initialized.");
  checkTabs();
  setInterval(checkTabs, 1000);
});

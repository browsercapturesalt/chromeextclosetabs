function watch() {
  chrome.runtime.sendMessage({}, function (response) {});
  window.close();
}

document.getElementById("watch").addEventListener("click", watch);

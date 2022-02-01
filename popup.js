function watch() {
  chrome.runtime.sendMessage({}, function (response) {});
}

document.getElementById("watch").addEventListener("click", watch);

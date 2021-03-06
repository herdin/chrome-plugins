(function(){
  GTSdebug.log('hello, menu js');

  document.getElementById("loading")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    GTSdebug.log('active tab id -> ', tab.id);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      // function: googleTranslateSupportLoader,
      files: ['js/loading.js']
    });
    window.close();
  });

  document.getElementById("setting")
  .addEventListener("click", () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('options.html'),
    });
    window.close();
  });
})();

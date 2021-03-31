(function(){
  TWBdebug.log('hello, menu js');

  document.getElementById("deploy")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    TWBdebug.log('active tab id -> ', tab.id);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      // function: googleTranslateSupportLoader,
      files: ['js/deploy.js']
    });
    window.close();
  });


  document.getElementById("witnessed")
  .addEventListener("click", () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('witnessed.html'),
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

(function(){
  logger.name = 'menu.js';
  logger.log('hello, menu js');

  chrome.storage.sync.get('config', function({config}) {
    logger.log('get config', config);
    logger.config = config;
  });

  document.getElementById("deploy").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    logger.log('active tab id -> ', tab.id);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      // function: googleTranslateSupportLoader,
      files: ['js/deploy.js']
    });
    window.close();
  });

  document.getElementById("witnessed").addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('witnessed.html') });
    window.close();
  });

  document.getElementById("setting").addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    window.close();
  });

})();

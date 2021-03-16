(function(){
  console.log('hello, menu js');

  const googleTranslateSupportLoader = function() {
    console.log('preparing load..');
    const indicatorId = 'google-translate-support-indicator';
    if(document.getElementById(indicatorId)) {
      console.log('already prepared..');
      return;
    }
    let indicator = document.createElement('span');
    indicator.setAttribute('id', indicatorId);
    document.body.appendChild(indicator);
    console.log('indicator append done..');

    let popup;
    function getListener(urlInfo) {
      return function() {
        let searchTarget = document.getSelection().toString();
        let targetUrl =
          urlInfo.url +
          urlInfo.from + searchTarget +
          urlInfo.toLanguageKey + urlInfo.toLanguageValue;
        if(searchTarget) popup = window.open(targetUrl, 'google-translate-support-popup', urlInfo.css);
        else popup.close();
      }
    }

    chrome.storage.sync.get('urlInfo', ({urlInfo}) => {
      console.log('current urlInfo -> ', urlInfo);
      let listener = getListener(urlInfo);
      document.addEventListener('dblclick', listener, false);
      document.addEventListener('mouseup', listener, false);
    });
  };

  document.getElementById("loading")
  .addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('active tab id -> ', tab.id);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: googleTranslateSupportLoader,
    });
    window.close();
  });

  document.getElementById("setting")
  .addEventListener("click", async () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('options.html'),
    });
    window.close();
  });
})();

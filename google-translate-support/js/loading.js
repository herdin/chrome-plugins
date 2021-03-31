const GTSdebug = (function(){
  let debug = false;
  function active() {
    debug = true;
  }
  function deactive() {
    debug = false;
  }
  function log(txt, obj) {
    if(!debug) return;
    let current = new Date();
    let prefix = `${current.getFullYear()}-${(current.getMonth()+1+'').padStart(2, '0')}-${(current.getDate()+'').padStart(2, '0')}T${(current.getHours()+'').padStart(2, '0')}:${(current.getMinutes()+'').padStart(2, '0')}:${(current.getSeconds()+'').padStart(2, '0')}.${(current.getMilliseconds()+'').padStart(3, '0')} : `;
    if(obj) console.log(prefix + txt, obj);
    else console.log(prefix + txt);
  }
  return {
    log: log,
    name: 'module',
    active: active,
    deactive: deactive
  }
})();

(function() {
  GTSdebug.log('preparing load..');
  const indicatorId = 'google-translate-support-indicator';
  if(document.getElementById(indicatorId)) {
    GTSdebug.log('already prepared..');
    return;
  }
  let indicator = document.createElement('span');
  indicator.setAttribute('id', indicatorId);
  document.body.appendChild(indicator);
  GTSdebug.log('indicator append done..');

  let popup;
  let debounce = null;
  function getListener(gtsConfig) {
    return function() {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let searchTarget = document.getSelection().toString();
        GTSdebug.log('search target', searchTarget);
        if(!searchTarget || !searchTarget.trim()) return;
        let message = {
          searchTarget: searchTarget,
          type: 'put',
        };
        chrome.runtime.sendMessage(message, function(response) {
          GTSdebug.log('put response -> ', response);
        });

        let targetUrl =
          gtsConfig.url +
          gtsConfig.from + searchTarget +
          gtsConfig.toLanguageKey + gtsConfig.toLanguageValue;
        if(searchTarget) popup = window.open(targetUrl, 'google-translate-support-popup', gtsConfig.css);
        else popup.close();
      }, 200);
    }
  }

  chrome.storage.sync.get('gtsConfig', ({gtsConfig}) => {
    GTSdebug.log('current gtsConfig -> ', gtsConfig);
    let listener = getListener(gtsConfig);
    document.addEventListener('dblclick', listener, false);
    document.addEventListener('mouseup', listener, false);
  });
})();

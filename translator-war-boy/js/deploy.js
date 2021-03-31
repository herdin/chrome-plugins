(function() {
  const TWBdebug = (function(){
    let debug = true;
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
      name: 'deploy',
      active: active,
      deactive: deactive
    }
  })();

  TWBdebug.log('preparing load..');
  const indicatorId = 'google-translate-support-indicator';
  if(document.getElementById(indicatorId)) {
    TWBdebug.log('already prepared..');
    return;
  }
  let indicator = document.createElement('span');
  indicator.setAttribute('id', indicatorId);
  document.body.appendChild(indicator);
  TWBdebug.log('indicator append done..');

  let popup;
  let debounce = null;
  function getListener(twbConfig) {
    return function() {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let searchTarget = document.getSelection().toString();
        TWBdebug.log('search target', searchTarget);
        if(!searchTarget || !searchTarget.trim()) return;
        let message = {
          searchTarget: searchTarget,
          type: 'put',
        };
        chrome.runtime.sendMessage(message, function(response) {
          TWBdebug.log('put response -> ', response);
        });

        let targetUrl =
          twbConfig.url +
          twbConfig.from + searchTarget +
          twbConfig.toLanguageKey + twbConfig.toLanguageValue;
        if(searchTarget) popup = window.open(targetUrl, 'google-translate-support-popup', twbConfig.css);
        else popup.close();
      }, 200);
    }
  }

  chrome.storage.sync.get('twbConfig', ({twbConfig}) => {
    TWBdebug.log('current twbConfig -> ', twbConfig);
    twbConfig.debug? TWBdebug.active():TWBdebug.deactive();
    let listener = getListener(twbConfig);
    document.addEventListener('dblclick', listener, false);
    document.addEventListener('mouseup', listener, false);
  });
})();

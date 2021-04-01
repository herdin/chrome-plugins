(function() {
  const logger = (function(){
    let _level = 0;
    let _name = 'deploy.js';
    function log(txt, obj) {
      if(_level <= 0) return;
      let current = new Date();
      let prefix = `${current.getFullYear()}-${(current.getMonth()+1+'').padStart(2, '0')}-${(current.getDate()+'').padStart(2, '0')}T${(current.getHours()+'').padStart(2, '0')}:${(current.getMinutes()+'').padStart(2, '0')}:${(current.getSeconds()+'').padStart(2, '0')}.${(current.getMilliseconds()+'').padStart(3, '0')} : ${_name} : `;
      if(obj) console.log(prefix + txt, obj);
      else console.log(prefix + txt);
    }
    return {
      get name() { return _name; },
      set name(newName) { _name = newName; },
      log: log,
      active: (settingLevel = 1) => { _level = settingLevel; },
      deactive: () => { _level = 0; },
    }
  })();

  //in [options.js], must mathching with DELEGATE_SERVICE
  const DELEGATE_SERVICE = {
    GOOGLE: 'google',
    LONGMAN: 'longman',
  };

  logger.log('preparing deploy..');
  const indicatorId = 'translatorWarBoyIndicator';
  if(document.getElementById(indicatorId)) {
    logger.log('already deployed.');
    return;
  }
  let indicator = document.createElement('span');
  indicator.setAttribute('id', indicatorId);
  document.body.appendChild(indicator);
  logger.log('indicator append done.');

  chrome.storage.sync.get('config', ({config}) => {
    logger.log('get config -> ', config);
    config.debug? logger.active():logger.deactive();
    /* if current url not end with .pdf?
     * then add web listener
     */
    // let listener = getListener(config);
    let listener = getDefaultListener(config);

    document.addEventListener('dblclick', listener, false);
    document.addEventListener('mouseup', listener, false);
    /* else do nothing
     * because background contextMenus.onClicked listener do listen
     */
  });

  function getListener(config) {
    switch(config.delegateServiceName) {
      case DELEGATE_SERVICE.GOOGLE:  return googleListener(config);
      case DELEGATE_SERVICE.LONGMAN: return longmanListener(config);
      default: throw new Error('not applicable service name -> ' + config.delegateServiceName);
    }
  }//getListener

  //usage in listener
  let popup;
  let debounce = null;

  function getDefaultListener(config) {
    let popupConfig = null;
    switch(config.delegateServiceName) {
      case DELEGATE_SERVICE.GOOGLE: popupConfig = googlePopupConfigMaker(config); break;
      case DELEGATE_SERVICE.LONGMAN: popupConfig = longmanPopupConfigMaker(config); break;
      default: throw new Error('not applicable service name -> ' + config.delegateServiceName);
    }

    return function() {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let selectionInfo = getSelectionInfo();
        if(!selectionInfo.valid) return;
        sendMessage({ type: 'put', searchTarget: selectionInfo.selection }, (response) => logger.log('put response -> ', response));

        popupConfig.searchTarget= selectionInfo.selection;
        let targetUrl = popupConfig.targetUrl;
        let css = popupConfig.css;
        popup = window.open(targetUrl, 'translator-war-boy-popup', css);
      }, 200);
    };
  }

  function googlePopupConfigMaker(config) {
    const baseUrl = 'https://translate.google.com/?sl=auto&op=translate';
    const from = '&text=';
    const to = '&tl=';
    return {
      _searchTarget : '',
      set searchTarget(setSearchTarget) {
        _searchTarget = setSearchTarget;
      },
      get targetUrl() {
        return baseUrl + from + _searchTarget + to + config.googleToLanguage;
      },
      get css() {
        return 'width=500, height=500';
      }
    };
  }

  function longmanPopupConfigMaker(config) {
    const baseUrl = 'https://www.ldoceonline.com/dictionary';
    const mode = config.longmanToLanguage;
    return {
      _searchTarget : '',
      set searchTarget(setSearchTarget) {
        _searchTarget = setSearchTarget;
      },
      get targetUrl() {
        return baseUrl + mode + _searchTarget;
      },
      get css() {
        return 'width=500, height=500';
      }
    };
  }


  function googleListener(config) {
    logger.log('google listener', config);
    const googleConfig = {
      url : 'https://translate.google.com/?sl=auto&op=translate',
      from : '&text=',
      toLanguageKey : '&tl=',
      toLanguageValue : config.googleToLanguage,
      css : 'width=500, height=500',
    };

    return function() {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let selectionInfo = getSelectionInfo();
        if(!selectionInfo.valid) return;
        sendMessage({ type: 'put', searchTarget: selectionInfo.selection }, (response) => logger.log('put response -> ', response));

        let targetUrl =
          googleConfig.url +
          googleConfig.from + selectionInfo.selection +
          googleConfig.toLanguageKey + googleConfig.toLanguageValue;
        popup = window.open(targetUrl, 'translator-war-boy-popup', googleConfig.css);
      }, 200);
    };
  }//googleListener

  function longmanListener(config) {
    logger.log('longman listener', config);

    const longmanConfig = {
     url : 'https://www.ldoceonline.com/dictionary',
     toLanguageValue : config.longmanToLanguage,
     css : 'width=500, height=500',
    };

    return function() {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        let selectionInfo = getSelectionInfo();
        if(!selectionInfo.valid) return;
        sendMessage({ type: 'put', searchTarget: selectionInfo.selection }, (response) => logger.log('put response -> ', response));

        let targetUrl = longmanConfig.url + longmanConfig.toLanguageValue + selectionInfo.selection;
        popup = window.open(targetUrl, 'translator-war-boy-popup', longmanConfig.css);
      }, 200);
    };
  }//longmanListener

  function getSelectionInfo() {
    let selectionResult = {};
    let selection = document.getSelection().toString();
    logger.log('selection', selection);
    if(!selection || !selection.trim()) {
       if(popup) popup.close();
       selectionResult.valid = false;
    } else {
      selectionResult.valid = true;
      selectionResult.selection = selection.trim();
    }
    return selectionResult;
  }

  function sendMessage(messageObject, callback) {
    chrome.runtime.sendMessage(messageObject, (response) => {
        logger.log('put response -> ', response);
        if(callback) callback(response);
    });
  }

})();

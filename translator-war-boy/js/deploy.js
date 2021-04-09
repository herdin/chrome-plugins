(function() {

  const logger = (function(){
    let _loggingCount = 0;
    let _loggingLimit = 10;
    /* level = 0, deactive
     * level = 1, active
     * level > 1, not implements
     */
    let _level = 1;
    let _name = 'logger.js';
    function clear() {
      if(_loggingLimit > 0) {
        if(console && ++_loggingCount > _loggingLimit) {
          console.clear();
          _loggingCount = 0;
        }
      }
    }
    function log(txt, obj) {
      clear();
      if(_level <= 0) return;
      if(!console) return;

      let current = new Date();
      let prefix = `${current.getFullYear()}-${(current.getMonth()+1+'').padStart(2, '0')}-${(current.getDate()+'').padStart(2, '0')}T${(current.getHours()+'').padStart(2, '0')}:${(current.getMinutes()+'').padStart(2, '0')}:${(current.getSeconds()+'').padStart(2, '0')}.${(current.getMilliseconds()+'').padStart(3, '0')} : ${_name} : `;
      if(obj) console.log(prefix + txt, obj);
      else console.log(prefix + txt);
    }

    return {
      set config(_config) {
        console.log('check config', _config);
        if(_config.debug) _level = 1;
        else _level = 0;
      },
      active: (settingLevel = 1) => { _level = settingLevel; },
      deactive: () => { _level = 0; },
      get loggingLimit() { return _loggingLimit; },
      set loggingLimit(newLoggingLimit = 100) { _loggingLimit = newLoggingLimit; },
      get name() { return _name; },
      set name(newName) { _name = newName; },
      log: log,
    }
  })();

  logger.name = 'deploy.js';
  logger.log('hello, deploy.js');

  //in [options.js], must mathching with DELEGATE_SERVICE
  const DELEGATE_SERVICE = {
    GOOGLE: {
      popupConfig: googlePopupConfigMaker
    },
    LONGMAN: {
      popupConfig: longmanPopupConfigMaker
    },
  };

  const INTERVAL = {
    POLLING_STORAGE_FOR_DELAYED_CONFIG: 5000,
    POLLING_STORAGE_FOR_SELECTION_TEXT: 500,
  };

  //usage in default listener
  let popup;
  let debounce = null;
  let delayedConfig = null;

  chrome.storage.sync.get('config', ({config}) => {
    logger.log('get config for init -> ', config);
    logger.config = config;

    delayedConfig = config;
    pollingStorageForDelayedConfig();

    (location.href.indexOf('.pdf') > 0)?
      pdfDeploy():
      webDeploy();
  });

  function pollingStorageForDelayedConfig() {
    setInterval(() => {
      chrome.storage.sync.get('config', ({config}) => {
        logger.log('get config for interval -> ', config);
        delayedConfig = config;
      });
    }, INTERVAL.POLLING_STORAGE_FOR_DELAYED_CONFIG);
  }

  function pdfDeploy() {
    logger.log('pdf deploy.');

    sendMessage({ type: 'pdf', visible: true }, (response) => logger.log('pdf response -> ', response));
    let listener = getDefaultListener();

    setInterval(() => {
      chrome.storage.sync.get(['polling'], function({polling}) {
        if(!polling.selectionText) return;
        logger.log('get polling -> ', polling);

        let selectionText = decodeURI(polling.selectionText);
        document.getSelection().toString = () => selectionText;
        listener();
        polling.selectionText = '';
        chrome.storage.sync.set({'polling': polling});
      });
    }, INTERVAL.POLLING_STORAGE_FOR_SELECTION_TEXT);
  }

  function webDeploy() {
    logger.log('web deploy.');

    sendMessage({ type: 'pdf', visible: false }, (response) => logger.log('pdf response -> ', response));

    const indicatorId = 'translatorWarBoyIndicator';
    if(document.getElementById(indicatorId)) {
      logger.log('already deployed.');
      return;
    }

    let indicator = document.createElement('span');
    indicator.setAttribute('id', indicatorId);
    document.body.appendChild(indicator);
    logger.log('indicator append done.');

    let listener = getDefaultListener();
    document.addEventListener('dblclick', listener, false);
    document.addEventListener('mouseup', listener, false);
  }

  function getDefaultListener() {
    return function() {
      logger.log('delayed config -> ', delayedConfig);
      let popupConfig = DELEGATE_SERVICE[delayedConfig.delegateServiceName.toUpperCase()].popupConfig(delayedConfig);
      let selectionInfo = getSelectionInfo();
      if(!selectionInfo.valid) return;
      sendMessage({ type: 'put', searchTarget: selectionInfo.selection }, (response) => logger.log('put response -> ', response));

      popupConfig.searchTarget= selectionInfo.selection;
      let targetUrl = popupConfig.targetUrl;
      let css = popupConfig.css;
      popup = window.open(encodeURI(targetUrl), 'translator-war-boy-popup', css);
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

  function getSelectionInfo() {
    let selectionResult = {};
    let selection = document.getSelection().toString();
    if(!selection || !selection.trim()) {
       if(popup) popup.close();
       selectionResult.valid = false;
    } else {
      selectionResult.valid = true;
      selectionResult.selection = selection.trim().toLowerCase();
    }

    logger.log('selection info', selectionResult);
    return selectionResult;
  }

  function sendMessage(messageObject, callback) {
    chrome.runtime.sendMessage(messageObject, (response) => {
        logger.log('send response -> ', response);
        if(callback) callback(response);
    });
  }

})();

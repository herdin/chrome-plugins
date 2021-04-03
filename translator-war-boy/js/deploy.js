(function() {
  const logger = (function(){
    let _level = 1;
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

  chrome.storage.sync.get('config', ({config}) => {
    logger.log('get config -> ', config);
    config.debug?
      logger.active():
      logger.deactive();

    (location.href.indexOf('.pdf') > 0)?
      pdfDeploy(config):
      webDeploy(config);
  });


  function pdfDeploy(config) {
    logger.log('pdf deploy.');

    sendMessage({ type: 'pdf' }, (response) => logger.log('pdf response -> ', response));
    let listener = getDefaultListener(config);

    setInterval(() => {
      chrome.storage.sync.get('polling', function({polling}) {
        logger.log('get polling -> ', polling);
        if(!polling.selectionText) return;
        
        let selectionText = polling.selectionText;
        document.getSelection().toString = () => selectionText;
        listener();
        polling.selectionText = '';
        chrome.storage.sync.set({'polling': polling});
      });
    }, config.pollingInterval);
  }

  function webDeploy(config) {
    logger.log('web deploy.');

    const indicatorId = 'translatorWarBoyIndicator';
    if(document.getElementById(indicatorId)) {
      logger.log('already deployed.');
      return;
    }

    let indicator = document.createElement('span');
    indicator.setAttribute('id', indicatorId);
    document.body.appendChild(indicator);
    logger.log('indicator append done.');

    let listener = getDefaultListener(config);
    document.addEventListener('dblclick', listener, false);
    document.addEventListener('mouseup', listener, false);
  }

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
        logger.log('send response -> ', response);
        if(callback) callback(response);
    });
  }

})();

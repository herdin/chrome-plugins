(function() {
  logger.name = 'options.js';
  logger.log('hello, options js');

  //in [options.html], must mathching with [name attribute of Node] who has [dictionary class]
  const DELEGATE_SERVICE = {
    GOOGLE: 'google',
    LONGMAN: 'longman',
  };

  chrome.storage.sync.get('config', function({config}) {
    logger.log('get config', config);
    config.debug? logger.active():logger.deactive();
    init(config);
  });

  function init(config) {
    logger.log('init with config', config);
    const configuredServiceName = config.delegateServiceName;
    displayService(configuredServiceName);
    initService(configuredServiceName, config);

    let selectService = document.querySelector('#select-service');

    //select service option init
    for(key in DELEGATE_SERVICE) {
      let delegateServiceName = DELEGATE_SERVICE[key];
      let option = document.createElement('option');
      if(config.delegateServiceName == delegateServiceName) option.setAttribute('selected', 'selected');
      option.setAttribute('value', delegateServiceName);
      let text = document.createTextNode(delegateServiceName);
      option.appendChild(text);
      selectService.appendChild(option);
    }

    //service select box, add event listener
    selectService.addEventListener('change', (e) => {
      let serviceName = e.target.value;
      chrome.storage.sync.get('config', function({config}) {
        logger.log('get config', config);
        initService(serviceName, config);
      });
    });
  }//init

  function initService(targetServiceName, config) {
    switch (targetServiceName) {
      case DELEGATE_SERVICE.GOOGLE : defaultService(DELEGATE_SERVICE.GOOGLE, config, googleData()); break;
      case DELEGATE_SERVICE.LONGMAN: defaultService(DELEGATE_SERVICE.LONGMAN, config, longmanData()); break;
      default:
        throw new Error('not applicable service name -> ' + targetServiceName);
    }
  }

  function defaultService(delegateServiceName, config, codeInfoArr) {
    logger.log('service - ' + delegateServiceName + ' with config', config);
    displayService(delegateServiceName);
    updateDelegatingService(config, delegateServiceName);
    const CONTAINER_SELECTOR = '.service[name=' + delegateServiceName + '] .language-container';
    if(document.querySelector(CONTAINER_SELECTOR).children.length > 0) {
      logger.log('service - ' + delegateServiceName + ' already init');
      return;
    }

    let configuredCode = getConfiguredCodeWithServiceName(config, delegateServiceName);

    //configured to language set
    codeInfoArr.forEach(codeInfo => {
      let anchor = document.createElement('a');
      if(configuredCode == codeInfo.code) anchor.setAttribute('class', 'active');
      anchor.setAttribute('value', codeInfo.code);
      anchor.appendChild(document.createTextNode(codeInfo.desc));
      document.querySelector(CONTAINER_SELECTOR).appendChild(anchor);
    });

    //configuring to language
    Array.from(document.querySelectorAll(CONTAINER_SELECTOR + ' a'))
    .forEach(a => a.addEventListener('click', (e) => {
      logger.log('a clicked', e);
      //remove active class to current active item
      document.querySelector(CONTAINER_SELECTOR + ' .active').classList.remove('active');
      //add active class to clecked item
      e.target.classList.add('active');

      updateConfigWithServiceName(config, delegateServiceName, e.target.getAttribute('value'));
      logger.log('set config', config);
      chrome.storage.sync.set({'config': config});
    }));

    let debounceTimer = null;
    let debounce = (e) => {
      let searchLanguage = e.target.value;
      logger.log('before debounce -> ', searchLanguage);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        logger.log('after debounce -> ', searchLanguage);
        let languageNodeArr = Array.from(document.querySelectorAll(CONTAINER_SELECTOR + ' a'));
        if(!searchLanguage) {
          languageNodeArr.forEach(languageNode => languageNode.classList.remove('dim'));
          return;
        }

        languageNodeArr.forEach(languageNode => {
          //logger.log(languageNode);
          let languageDesc = languageNode.innerHTML;
          (languageDesc.toLowerCase().indexOf(searchLanguage.toLowerCase()) >= 0)?
            languageNode.classList.remove('dim'):
            languageNode.classList.add('dim')   ;
        });
      }, 200);
    };//debounce
    const TEXTBOX_SELECTOR = '.service[name=' + delegateServiceName + '] .textbox';
    document.querySelector(TEXTBOX_SELECTOR).addEventListener('keyup', debounce);
  }

  function updateConfigWithServiceName(config, targetServiceName, value) {
    switch (targetServiceName) {
      case DELEGATE_SERVICE.GOOGLE: config.googleToLanguage = value; break;
      case DELEGATE_SERVICE.LONGMAN: config.longmanToLanguage = value; break;
      default:
        throw new Error('not applicable service name -> ' + targetServiceName);
    }
  }

  function getConfiguredCodeWithServiceName(config, targetServiceName) {
    switch (targetServiceName) {
      case DELEGATE_SERVICE.GOOGLE: return config.googleToLanguage;
      case DELEGATE_SERVICE.LONGMAN: return config.longmanToLanguage;
      default:
        throw new Error('not applicable service name -> ' + targetServiceName);
    }
  }

  function googleData() {
    return [
      { code : 'af', desc : 'Afrikaans' },    { code : 'sq', desc : 'Albanian' },    { code : 'am', desc : 'Amharic' },    { code : 'ar', desc : 'Arabic' },
      { code : 'hy', desc : 'Armenian' },    { code : 'az', desc : 'Azerbaijani' },    { code : 'eu', desc : 'Basque' },    { code : 'be', desc : 'Belarusian' },
      { code : 'bn', desc : 'Bengali' },    { code : 'bs', desc : 'Bosnian' },    { code : 'bg', desc : 'Bulgarian' },    { code : 'ca', desc : 'Catalan' },
      { code : 'ceb', desc : 'Cebuano' },    { code : 'ny', desc : 'Chichewa' },    { code : 'zh-CN', desc : 'Chinese (Simplified)' },    { code : 'zh-TW', desc : 'Chinese (Traditional)' },
      { code : 'co', desc : 'Corsican' },    { code : 'hr', desc : 'Croatian' },    { code : 'cs', desc : 'Czech' },    { code : 'da', desc : 'Danish' },
      { code : 'nl', desc : 'Dutch' },    { code : 'en', desc : 'English' },    { code : 'eo', desc : 'Esperanto' },    { code : 'et', desc : 'Estonian' },
      { code : 'tl', desc : 'Filipino' },    { code : 'fi', desc : 'Finnish' },    { code : 'fr', desc : 'French' },    { code : 'fy', desc : 'Frisian' },
      { code : 'gl', desc : 'Galician' },    { code : 'ka', desc : 'Georgian' },    { code : 'de', desc : 'German' },    { code : 'el', desc : 'Greek' },
      { code : 'gu', desc : 'Gujarati' },    { code : 'ht', desc : 'Haitian Creole' },    { code : 'ha', desc : 'Hausa' },    { code : 'haw', desc : 'Hawaiian' },
      { code : 'iw', desc : 'Hebrew' },    { code : 'hi', desc : 'Hindi' },    { code : 'hmn', desc : 'Hmong' },    { code : 'hu', desc : 'Hungarian' },
      { code : 'is', desc : 'Icelandic' },    { code : 'ig', desc : 'Igbo' },    { code : 'id', desc : 'Indonesian' },    { code : 'ga', desc : 'Irish' },
      { code : 'it', desc : 'Italian' },    { code : 'ja', desc : 'Japanese' },    { code : 'jw', desc : 'Javanese' },    { code : 'kn', desc : 'Kannada' },
      { code : 'kk', desc : 'Kazakh' },    { code : 'km', desc : 'Khmer' },    { code : 'rw', desc : 'Kinyarwanda' },    { code : 'ko', desc : 'Korean' },
      { code : 'ku', desc : 'Kurdish (Kurmanji)' },    { code : 'ky', desc : 'Kyrgyz' },    { code : 'lo', desc : 'Lao' },    { code : 'la', desc : 'Latin' },
      { code : 'lv', desc : 'Latvian' },    { code : 'lt', desc : 'Lithuanian' },    { code : 'lb', desc : 'Luxembourgish' },    { code : 'mk', desc : 'Macedonian' },
      { code : 'mg', desc : 'Malagasy' },    { code : 'ms', desc : 'Malay' },    { code : 'ml', desc : 'Malayalam' },    { code : 'mt', desc : 'Maltese' },
      { code : 'mi', desc : 'Maori' },    { code : 'mr', desc : 'Marathi' },    { code : 'mn', desc : 'Mongolian' },    { code : 'my', desc : 'Myanmar (Burmese)' },
      { code : 'ne', desc : 'Nepali' },    { code : 'no', desc : 'Norwegian' },    { code : 'or', desc : 'Odia (Oriya)' },    { code : 'ps', desc : 'Pashto' },
      { code : 'fa', desc : 'Persian' },    { code : 'pl', desc : 'Polish' },    { code : 'pt', desc : 'Portuguese' },    { code : 'pa', desc : 'Punjabi' },
      { code : 'ro', desc : 'Romanian' },    { code : 'ru', desc : 'Russian' },    { code : 'sm', desc : 'Samoan' },    { code : 'gd', desc : 'Scots Gaelic' },
      { code : 'sr', desc : 'Serbian' },    { code : 'st', desc : 'Sesotho' },    { code : 'sn', desc : 'Shona' },    { code : 'sd', desc : 'Sindhi' },
      { code : 'si', desc : 'Sinhala' },    { code : 'sk', desc : 'Slovak' },    { code : 'sl', desc : 'Slovenian' },    { code : 'so', desc : 'Somali' },
      { code : 'es', desc : 'Spanish' },    { code : 'su', desc : 'Sundanese' },    { code : 'sw', desc : 'Swahili' },    { code : 'sv', desc : 'Swedish' },
      { code : 'tg', desc : 'Tajik' },    { code : 'ta', desc : 'Tamil' },    { code : 'tt', desc : 'Tatar' },    { code : 'te', desc : 'Telugu' },
      { code : 'th', desc : 'Thai' },    { code : 'tr', desc : 'Turkish' },    { code : 'tk', desc : 'Turkmen' },    { code : 'uk', desc : 'Ukrainian' },
      { code : 'ur', desc : 'Urdu' },    { code : 'ug', desc : 'Uyghur' },    { code : 'uz', desc : 'Uzbek' },    { code : 'vi', desc : 'Vietnamese' },
      { code : 'cy', desc : 'Welsh' },    { code : 'xh', desc : 'Xhosa' },    { code : 'yi', desc : 'Yiddish' },    { code : 'yo', desc : 'Yoruba' },
      { code : 'zu', desc : 'Zulu' }
    ];
  }

  function longmanData() {
    return [
      { code : '/',                 desc : 'English'            },
      { code : '/english-japanese/', desc : 'English - Japanese' },
      { code : '/english-korean/',   desc : 'English - Korean'   },
      { code : '/english-spanish/',  desc : 'English - Spanish'  },
      { code : '/japanese-english/', desc : 'Japanese - English' },
      { code : '/spanish-english/',  desc : 'Spanish - English'  },
    ];
  }

  function displayService(targetServiceName) {
    Array.from(document.querySelectorAll('.service')).forEach(service => {
      let serviceName = service.getAttribute('name');
      service.style.display = (targetServiceName == serviceName)? '':'none';
    });
  }

  function updateDelegatingService(config, targetServiceName) {
    config.delegateServiceName = targetServiceName;
    logger.log('set config', config);
    chrome.storage.sync.set({'config': config});
  }

})();

(function() {
  const debug = (function(){
    let active = false;
    function log(txt, obj) {
      if(!active) return;
      if(obj) console.log(txt, obj);
      else console.log(txt);
    }
    return {
      log: log
    }
  })();
  debug.log('hello, optioins js');
  /*
  Array.from(temp1.children)
  .filter(item => item.children.length > 1)
  .map(item => {
      return {code: item.getAttribute('data-language-code'), desc: item.children[1].innerText};
  })
  .reduce((acc, cur) => {
      return acc + `\n{ code : '${cur.code}', desc : '${cur.desc}' },`;
  }, '');
  */
  const langArr = [
    { code : 'af', desc : 'Afrikaans' },
    { code : 'sq', desc : 'Albanian' },
    { code : 'am', desc : 'Amharic' },
    { code : 'ar', desc : 'Arabic' },
    { code : 'hy', desc : 'Armenian' },
    { code : 'az', desc : 'Azerbaijani' },
    { code : 'eu', desc : 'Basque' },
    { code : 'be', desc : 'Belarusian' },
    { code : 'bn', desc : 'Bengali' },
    { code : 'bs', desc : 'Bosnian' },
    { code : 'bg', desc : 'Bulgarian' },
    { code : 'ca', desc : 'Catalan' },
    { code : 'ceb', desc : 'Cebuano' },
    { code : 'ny', desc : 'Chichewa' },
    { code : 'zh-CN', desc : 'Chinese (Simplified)' },
    { code : 'zh-TW', desc : 'Chinese (Traditional)' },
    { code : 'co', desc : 'Corsican' },
    { code : 'hr', desc : 'Croatian' },
    { code : 'cs', desc : 'Czech' },
    { code : 'da', desc : 'Danish' },
    { code : 'nl', desc : 'Dutch' },
    { code : 'en', desc : 'English' },
    { code : 'eo', desc : 'Esperanto' },
    { code : 'et', desc : 'Estonian' },
    { code : 'tl', desc : 'Filipino' },
    { code : 'fi', desc : 'Finnish' },
    { code : 'fr', desc : 'French' },
    { code : 'fy', desc : 'Frisian' },
    { code : 'gl', desc : 'Galician' },
    { code : 'ka', desc : 'Georgian' },
    { code : 'de', desc : 'German' },
    { code : 'el', desc : 'Greek' },
    { code : 'gu', desc : 'Gujarati' },
    { code : 'ht', desc : 'Haitian Creole' },
    { code : 'ha', desc : 'Hausa' },
    { code : 'haw', desc : 'Hawaiian' },
    { code : 'iw', desc : 'Hebrew' },
    { code : 'hi', desc : 'Hindi' },
    { code : 'hmn', desc : 'Hmong' },
    { code : 'hu', desc : 'Hungarian' },
    { code : 'is', desc : 'Icelandic' },
    { code : 'ig', desc : 'Igbo' },
    { code : 'id', desc : 'Indonesian' },
    { code : 'ga', desc : 'Irish' },
    { code : 'it', desc : 'Italian' },
    { code : 'ja', desc : 'Japanese' },
    { code : 'jw', desc : 'Javanese' },
    { code : 'kn', desc : 'Kannada' },
    { code : 'kk', desc : 'Kazakh' },
    { code : 'km', desc : 'Khmer' },
    { code : 'rw', desc : 'Kinyarwanda' },
    { code : 'ko', desc : 'Korean' },
    { code : 'ku', desc : 'Kurdish (Kurmanji)' },
    { code : 'ky', desc : 'Kyrgyz' },
    { code : 'lo', desc : 'Lao' },
    { code : 'la', desc : 'Latin' },
    { code : 'lv', desc : 'Latvian' },
    { code : 'lt', desc : 'Lithuanian' },
    { code : 'lb', desc : 'Luxembourgish' },
    { code : 'mk', desc : 'Macedonian' },
    { code : 'mg', desc : 'Malagasy' },
    { code : 'ms', desc : 'Malay' },
    { code : 'ml', desc : 'Malayalam' },
    { code : 'mt', desc : 'Maltese' },
    { code : 'mi', desc : 'Maori' },
    { code : 'mr', desc : 'Marathi' },
    { code : 'mn', desc : 'Mongolian' },
    { code : 'my', desc : 'Myanmar (Burmese)' },
    { code : 'ne', desc : 'Nepali' },
    { code : 'no', desc : 'Norwegian' },
    { code : 'or', desc : 'Odia (Oriya)' },
    { code : 'ps', desc : 'Pashto' },
    { code : 'fa', desc : 'Persian' },
    { code : 'pl', desc : 'Polish' },
    { code : 'pt', desc : 'Portuguese' },
    { code : 'pa', desc : 'Punjabi' },
    { code : 'ro', desc : 'Romanian' },
    { code : 'ru', desc : 'Russian' },
    { code : 'sm', desc : 'Samoan' },
    { code : 'gd', desc : 'Scots Gaelic' },
    { code : 'sr', desc : 'Serbian' },
    { code : 'st', desc : 'Sesotho' },
    { code : 'sn', desc : 'Shona' },
    { code : 'sd', desc : 'Sindhi' },
    { code : 'si', desc : 'Sinhala' },
    { code : 'sk', desc : 'Slovak' },
    { code : 'sl', desc : 'Slovenian' },
    { code : 'so', desc : 'Somali' },
    { code : 'es', desc : 'Spanish' },
    { code : 'su', desc : 'Sundanese' },
    { code : 'sw', desc : 'Swahili' },
    { code : 'sv', desc : 'Swedish' },
    { code : 'tg', desc : 'Tajik' },
    { code : 'ta', desc : 'Tamil' },
    { code : 'tt', desc : 'Tatar' },
    { code : 'te', desc : 'Telugu' },
    { code : 'th', desc : 'Thai' },
    { code : 'tr', desc : 'Turkish' },
    { code : 'tk', desc : 'Turkmen' },
    { code : 'uk', desc : 'Ukrainian' },
    { code : 'ur', desc : 'Urdu' },
    { code : 'ug', desc : 'Uyghur' },
    { code : 'uz', desc : 'Uzbek' },
    { code : 'vi', desc : 'Vietnamese' },
    { code : 'cy', desc : 'Welsh' },
    { code : 'xh', desc : 'Xhosa' },
    { code : 'yi', desc : 'Yiddish' },
    { code : 'yo', desc : 'Yoruba' },
    { code : 'zu', desc : 'Zulu' }
  ];

  function languageNodeInit(urlInfo) {
    debug.log(langArr);
    langArr.forEach(lang => {
      // let div = document.createElement('div');
      // div.setAttribute('class', 'formRow');
      // let radio = document.createElement('input');
      // radio.setAttribute('id', lang.code);
      // radio.setAttribute('type', 'radio');
      // radio.setAttribute('name', 'radiohead');
      // radio.setAttribute('class', 'option');
      // radio.setAttribute('value', lang.code);
      // let label = document.createElement('label');
      // label.setAttribute('for', lang.code);
      // label.setAttribute('class', 'cbLabel');
      // let text = document.createTextNode(lang.desc);
      // label.appendChild(text);
      // div.appendChild(radio);
      // div.appendChild(label);
      // document.querySelector('#language-container').appendChild(div);

      let anchor = document.createElement('a');
      // anchor.setAttribute('href', '#');
      if(urlInfo.toLanguageValue == lang.code) anchor.setAttribute('class', 'active');
      anchor.setAttribute('value', lang.code);
      let text = document.createTextNode(lang.desc);
      anchor.appendChild(text);
      document.querySelector('.language-container').appendChild(anchor);

    });

    Array.from(document.querySelectorAll('.content.options .language-container a'))
      .forEach(a => a.addEventListener('click', (e) => {
        document.querySelector('.language-container .active').classList.remove('active');
        e.target.classList.add('active');
        debug.log('a clicked', e);
        urlInfo.toLanguageValue = e.target.getAttribute('value');
        chrome.storage.sync.set({'urlInfo': urlInfo});
      }));
  }//init lanugage

  let debounceTimer = null;
  let debounce = (e) => {
    let searchLanguage = e.target.value;
    debug.log('debounce', searchLanguage);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      debug.log('search language', searchLanguage);
      let languageNodeArr = Array.from(document.querySelectorAll('.language-container a'));
      if(!searchLanguage) {
        languageNodeArr
        .forEach(languageNode => languageNode.classList.remove('dim'));
        return;
      }

      languageNodeArr
      .forEach(languageNode => {
        debug.log(languageNode);
        let languageFullText = languageNode.innerHTML;
        if(languageFullText.toLowerCase().indexOf(searchLanguage.toLowerCase()) >= 0) {
          languageNode.classList.remove('dim');
        } else {
          languageNode.classList.add('dim');
        }
      });
    }, 200);
  };
  document.querySelector('.content.options .textbox').addEventListener('keyup', debounce);

  chrome.storage.sync.get('urlInfo', function(result) {
    debug.log('default url info get', result.urlInfo);
    languageNodeInit(result.urlInfo);
  });

})();

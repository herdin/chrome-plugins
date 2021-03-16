/*
# google webstore dashboard
https://chrome.google.com/webstore/devconsole/

# icons
https://www.flaticon.com/free-icon/google_814187?term=google%20translate&page=1&position=25&page=1&position=25&related_id=814187&origin=search
*/
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

debug.log('hello, background js');
chrome.runtime.onInstalled.addListener(() => {
  debug.log('on installed..');
  const urlInfo = {
    url : 'https://translate.google.com/?sl=auto&op=translate',
    from : '&text=',
    toLanguageKey : '&tl=',
    toLanguageValue : 'en',
    css : 'width=500, height=500',
  };
  chrome.storage.sync.set({'urlInfo': urlInfo});
  debug.log('default url info set', urlInfo);
  chrome.storage.sync.get('urlInfo', function(result) {
    debug.log('default url info get', result.urlInfo);
  });
});

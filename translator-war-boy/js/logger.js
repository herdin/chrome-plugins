const logger = (function(){
  let _level = 0;
  let _name = 'module';
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

logger.log('hello, logger');

chrome.storage.sync.get('config', function({config}) {
  logger.log('get config', config);
  config.debug? logger.active():logger.deactive();
});

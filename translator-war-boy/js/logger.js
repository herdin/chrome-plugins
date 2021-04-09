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

logger.log('hello, logger');

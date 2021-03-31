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
GTSdebug.log('hello, debug log');

/* db.min.js start */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.db=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(b,c,d){"use strict";function e(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var f=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol?"symbol":typeof a};!function(b){function d(a){return a&&"object"===("undefined"==typeof a?"undefined":g(a))}function h(a){var b=Object.keys(a).sort();if(1===b.length){var c=b[0],d=a[c],e=void 0,f=void 0;switch(c){case"eq":e="only";break;case"gt":e="lowerBound",f=!0;break;case"lt":e="upperBound",f=!0;break;case"gte":e="lowerBound";break;case"lte":e="upperBound";break;default:throw new TypeError("`"+c+"` is not a valid key")}return[e,[d,f]]}var g=a[b[0]],h=a[b[1]],i=b.join("-");switch(i){case"gt-lt":case"gt-lte":case"gte-lt":case"gte-lte":return["bound",[g,h,"gt"===b[0],"lt"===b[1]]];default:throw new TypeError("`"+i+"` are conflicted keys")}}function i(a){if(a&&"object"===("undefined"==typeof a?"undefined":g(a))&&!(a instanceof j)){var b=h(a),c=f(b,2),d=c[0],i=c[1];return j[d].apply(j,e(i))}return a}var j=b.IDBKeyRange||b.webkitIDBKeyRange,k={readonly:"readonly",readwrite:"readwrite"},l=Object.prototype.hasOwnProperty,m=function(a){return a},n=b.indexedDB||b.webkitIndexedDB||b.mozIndexedDB||b.oIndexedDB||b.msIndexedDB||b.shimIndexedDB||function(){throw new Error("IndexedDB required")}(),o={},p=["abort","error","versionchange"],q=function(a,b,c,d){var f=this,i=null,l=function(d,f,h,l,m,n,o){return new Promise(function(p,q){var r=void 0;try{r=d?j[d].apply(j,e(f)):null}catch(s){return void q(s)}n=n||[],m=m||null;var t=[],u=0,v=[r],w=b.transaction(a,i?k.readwrite:k.readonly);w.onerror=function(a){return q(a)},w.onabort=function(a){return q(a)},w.oncomplete=function(){return p(t)};var x=w.objectStore(a),y="string"==typeof c?x.index(c):x;"count"!==h&&v.push(l||"next");var z=i?Object.keys(i):[],A=function(a){return z.forEach(function(b){var c=i[b];"function"==typeof c&&(c=c(a)),a[b]=c}),a};y[h].apply(y,v).onsuccess=function(a){var b=a.target.result;if("number"==typeof b)t=b;else if(b)if(null!==m&&m[0]>u)u=m[0],b.advance(m[0]);else if(null!==m&&u>=m[0]+m[1]);else{var c=function(){var a=!0,c="value"in b?b.value:b.key;try{n.forEach(function(b){a="function"==typeof b[0]?a&&b[0](c):a&&c[b[0]]===b[1]})}catch(d){return q(d),{v:void 0}}if(a){if(u++,i)try{c=A(c),b.update(c)}catch(d){return q(d),{v:void 0}}try{t.push(o(c))}catch(d){return q(d),{v:void 0}}}b["continue"]()}();if("object"===("undefined"==typeof c?"undefined":g(c)))return c.v}}})},n=function(a,b,c){var e=[],f="next",h="openCursor",j=null,k=m,n=!1,o=d||c,p=function(){return o?Promise.reject(o):l(a,b,h,n?f+"unique":f,j,e,k)},q=function(){return f=null,h="count",{execute:p}},r=function(){return h="openKeyCursor",{desc:u,distinct:v,execute:p,filter:t,limit:s,map:x}},s=function(a,b){return j=b?[a,b]:[0,a],o=j.some(function(a){return"number"!=typeof a})?new Error("limit() arguments must be numeric"):o,{desc:u,distinct:v,filter:t,keys:r,execute:p,map:x,modify:w}},t=function y(a,b){return e.push([a,b]),{desc:u,distinct:v,execute:p,filter:y,keys:r,limit:s,map:x,modify:w}},u=function(){return f="prev",{distinct:v,execute:p,filter:t,keys:r,limit:s,map:x,modify:w}},v=function(){return n=!0,{count:q,desc:u,execute:p,filter:t,keys:r,limit:s,map:x,modify:w}},w=function(a){return i=a&&"object"===("undefined"==typeof a?"undefined":g(a))?a:null,{execute:p}},x=function(a){return k=a,{count:q,desc:u,distinct:v,execute:p,filter:t,keys:r,limit:s,modify:w}};return{count:q,desc:u,distinct:v,execute:p,filter:t,keys:r,limit:s,map:x,modify:w}};["only","bound","upperBound","lowerBound"].forEach(function(a){f[a]=function(){return n(a,arguments)}}),this.range=function(a){var b=void 0,c=[null,null];try{c=h(a)}catch(d){b=d}return n.apply(void 0,e(c).concat([b]))},this.filter=function(){var a=n(null,null);return a.filter.apply(a,arguments)},this.all=function(){return this.filter()}},r=function(a,b,c,e){var f=this,g=!1;if(this.getIndexedDB=function(){return a},this.isClosed=function(){return g},this.query=function(b,c){var d=g?new Error("Database has been closed"):null;return new q(b,a,c,d)},this.add=function(b){for(var c=arguments.length,e=Array(c>1?c-1:0),f=1;c>f;f++)e[f-1]=arguments[f];return new Promise(function(c,f){if(g)return void f(new Error("Database has been closed"));var h=e.reduce(function(a,b){return a.concat(b)},[]),j=a.transaction(b,k.readwrite);j.onerror=function(a){a.preventDefault(),f(a)},j.onabort=function(a){return f(a)},j.oncomplete=function(){return c(h)};var m=j.objectStore(b);h.some(function(a){var b=void 0,c=void 0;if(d(a)&&l.call(a,"item")&&(c=a.key,a=a.item,null!=c))try{c=i(c)}catch(e){return f(e),!0}try{b=null!=c?m.add(a,c):m.add(a)}catch(e){return f(e),!0}b.onsuccess=function(b){if(d(a)){var c=b.target,e=c.source.keyPath;null===e&&(e="__id__"),l.call(a,e)||Object.defineProperty(a,e,{value:c.result,enumerable:!0})}}})})},this.update=function(b){for(var c=arguments.length,e=Array(c>1?c-1:0),f=1;c>f;f++)e[f-1]=arguments[f];return new Promise(function(c,f){if(g)return void f(new Error("Database has been closed"));var h=e.reduce(function(a,b){return a.concat(b)},[]),j=a.transaction(b,k.readwrite);j.onerror=function(a){a.preventDefault(),f(a)},j.onabort=function(a){return f(a)},j.oncomplete=function(){return c(h)};var m=j.objectStore(b);h.some(function(a){var b=void 0,c=void 0;if(d(a)&&l.call(a,"item")&&(c=a.key,a=a.item,null!=c))try{c=i(c)}catch(e){return f(e),!0}try{b=null!=c?m.put(a,c):m.put(a)}catch(g){return f(g),!0}b.onsuccess=function(b){if(d(a)){var c=b.target,e=c.source.keyPath;null===e&&(e="__id__"),l.call(a,e)||Object.defineProperty(a,e,{value:c.result,enumerable:!0})}}})})},this.put=function(){return this.update.apply(this,arguments)},this.remove=function(b,c){return new Promise(function(d,e){if(g)return void e(new Error("Database has been closed"));try{c=i(c)}catch(f){return void e(f)}var h=a.transaction(b,k.readwrite);h.onerror=function(a){a.preventDefault(),e(a)},h.onabort=function(a){return e(a)},h.oncomplete=function(){return d(c)};var j=h.objectStore(b);try{j["delete"](c)}catch(l){e(l)}})},this["delete"]=function(){return this.remove.apply(this,arguments)},this.clear=function(b){return new Promise(function(c,d){if(g)return void d(new Error("Database has been closed"));var e=a.transaction(b,k.readwrite);e.onerror=function(a){return d(a)},e.onabort=function(a){return d(a)},e.oncomplete=function(){return c()};var f=e.objectStore(b);f.clear()})},this.close=function(){return new Promise(function(d,e){return g?void e(new Error("Database has been closed")):(a.close(),g=!0,delete o[b][c],void d())})},this.get=function(b,c){return new Promise(function(d,e){if(g)return void e(new Error("Database has been closed"));try{c=i(c)}catch(f){return void e(f)}var h=a.transaction(b);h.onerror=function(a){a.preventDefault(),e(a)},h.onabort=function(a){return e(a)};var j=h.objectStore(b),k=void 0;try{k=j.get(c)}catch(l){e(l)}k.onsuccess=function(a){return d(a.target.result)}})},this.count=function(b,c){return new Promise(function(d,e){if(g)return void e(new Error("Database has been closed"));try{c=i(c)}catch(f){return void e(f)}var h=a.transaction(b);h.onerror=function(a){a.preventDefault(),e(a)},h.onabort=function(a){return e(a)};var j=h.objectStore(b),k=void 0;try{k=null==c?j.count():j.count(c)}catch(l){e(l)}k.onsuccess=function(a){return d(a.target.result)}})},this.addEventListener=function(b,c){if(!p.includes(b))throw new Error("Unrecognized event type "+b);return"error"===b?void a.addEventListener(b,function(a){a.preventDefault(),c(a)}):void a.addEventListener(b,c)},this.removeEventListener=function(b,c){if(!p.includes(b))throw new Error("Unrecognized event type "+b);a.removeEventListener(b,c)},p.forEach(function(a){this[a]=function(b){return this.addEventListener(a,b),this}},this),!e){var h=void 0;return[].some.call(a.objectStoreNames,function(a){if(f[a])return h=new Error('The store name, "'+a+'", which you have attempted to load, conflicts with db.js method names."'),f.close(),!0;f[a]={};var b=Object.keys(f);b.filter(function(a){return![].concat(p,["close","addEventListener","removeEventListener"]).includes(a)}).map(function(b){return f[a][b]=function(){for(var c=arguments.length,d=Array(c),e=0;c>e;e++)d[e]=arguments[e];return f[b].apply(f,[a].concat(d))}})}),h}},s=function(a,b,c,d,e,f){if(c&&0!==c.length){for(var h=0;h<d.objectStoreNames.length;h++){var i=d.objectStoreNames[h];l.call(c,i)||d.deleteObjectStore(i)}var j=void 0;return Object.keys(c).some(function(a){var e=c[a],f=void 0;if(d.objectStoreNames.contains(a))f=b.transaction.objectStore(a);else try{f=d.createObjectStore(a,e.key)}catch(h){return j=h,!0}Object.keys(e.indexes||{}).some(function(a){try{f.index(a)}catch(b){var c=e.indexes[a];c=c&&"object"===("undefined"==typeof c?"undefined":g(c))?c:{};try{f.createIndex(a,c.keyPath||c.key||a,c)}catch(d){return j=d,!0}}})}),j}},t=function(a,b,c,d){var e=a.target.result;o[b][c]=e;var f=new r(e,b,c,d);return f instanceof Error?Promise.reject(f):Promise.resolve(f)},u={version:"0.15.0",open:function(a){var b=a.server,c=a.version||1,d=a.schema,e=a.noServerMethods;return o[b]||(o[b]={}),new Promise(function(a,f){if(o[b][c])t({target:{result:o[b][c]}},b,c,e).then(a,f);else{var h=function(){if("function"==typeof d)try{d=d()}catch(g){return f(g),{v:void 0}}var h=n.open(b,c);h.onsuccess=function(d){return t(d,b,c,e).then(a,f)},h.onerror=function(a){a.preventDefault(),f(a)},h.onupgradeneeded=function(a){var e=s(a,h,d,a.target.result,b,c);e&&f(e)},h.onblocked=function(a){var d=new Promise(function(a,d){h.onsuccess=function(f){t(f,b,c,e).then(a,d)},h.onerror=function(a){return d(a)}});a.resume=d,f(a)}}();if("object"===("undefined"==typeof h?"undefined":g(h)))return h.v}})},"delete":function(a){return new Promise(function(b,c){var d=n.deleteDatabase(a);d.onsuccess=function(a){return b(a)},d.onerror=function(a){return c(a)},d.onblocked=function(a){a=null===a.newVersion||"undefined"==typeof Proxy?a:new Proxy(a,{get:function(a,b){return"newVersion"===b?null:a[b]}});var b=new Promise(function(b,c){d.onsuccess=function(c){"newVersion"in c||(c.newVersion=a.newVersion),"oldVersion"in c||(c.oldVersion=a.oldVersion),b(c)},d.onerror=function(a){return c(a)}});a.resume=b,c(a)}})},cmp:function(a,b){return new Promise(function(c,d){try{c(n.cmp(a,b))}catch(e){d(e)}})}};"undefined"!=typeof c&&"undefined"!=typeof c.exports?c.exports=u:"function"==typeof a&&a.amd?a(function(){return u}):b.db=u}(self)},{}]},{},[1])(1)});
/* db.min.js end */

/*
# extension
chrome://extensions/

# google webstore dashboard
https://chrome.google.com/webstore/devconsole/

#google extension doc
https://developer.chrome.com/docs/extensions/

# icons
https://www.flaticon.com/free-icon/google_814187?term=google%20translate&page=1&position=25&page=1&position=25&related_id=814187&origin=search

# web store description
While web browsing, in article, you may have suffer from unknown word or sentences or languages.
Just scroll or double click it! and find out what is is!
Also providing search log to check how many same word that I searched.

# db.js
https://github.com/aaronpowell/db.js
*/
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

GTSdebug.log('hello, background js');

function onInstalledListener() {
  GTSdebug.log('on installed..');
  const gtsConfig = {
    url : 'https://translate.google.com/?sl=auto&op=translate',
    from : '&text=',
    toLanguageKey : '&tl=',
    toLanguageValue : 'en',
    css : 'width=500, height=500',
  };
  chrome.storage.sync.set({'gtsConfig': gtsConfig});
  GTSdebug.log('default gtsConfig', gtsConfig);
  chrome.storage.sync.get('gtsConfig', function(result) {
    GTSdebug.log('default gtsConfig', result.gtsConfig);
  });
}

let SERVER = null;
let DROP_BEFORE_OPEN = false;
function openDatabase() {
  const DATABASE_NAME = 'googleTranslatingSupportData';
  if(SERVER != null) return Promise.resolve();

  let p = DROP_BEFORE_OPEN ?
    db.delete(DATABASE_NAME).then(() => GTSdebug.log('database deleted.', DATABASE_NAME)) :
    Promise.resolve();

  return p.then(() => {
    GTSdebug.log('database open..', DATABASE_NAME);
    return db.open({
      server: DATABASE_NAME,
      version: 1,
      schema: {
        searchTargets: {
          key: {
            keyPath: 'id',
            autoIncrement: true
          },
          indexes: { // Optionally add indexes
            searchTarget: {},
            updated: {}
          }
        }
      }
    });
  }).catch(function (err) {
    GTSdebug.log('database open error.', err);
      if (err.type === 'blocked') {
          oldConnection.close();
          return err.resume;
      }
      throw err;
  }).then((s) => {
    SERVER = s;
    GTSdebug.log('database open ok.', DATABASE_NAME);
  });
}

function isFieldEmpty(fieldName, field) {
  if(!field) {
    GTSdebug.log(fieldName + ' is empty', field);
    return true;
  }
  return false;
}

function putSearchTarget(searchTarget, sendResponse) {
  GTSdebug.log('put search target ->', searchTarget);
  if(isFieldEmpty('searchTarget', searchTarget)) return;
  searchTarget = searchTarget.trim();
  const dataLimit = 100;

  openDatabase()
  .then(() =>
    SERVER.searchTargets
    .query('searchTarget')
    .only(searchTarget)
    .execute()
  )
  .then((results) => {
    if(results.length)  return updateSearchTarget(results[0]);
    else                return addSearchTarget(searchTarget);
  })
  .then((saved) => {
    GTSdebug.log('put ok.', saved);
    let response = { status : 'ok' };
    response.data = [saved];
    sendResponse(response);
    return SERVER.searchTargets.count();
  })
  .catch((err) => {
    GTSdebug.log('put fail.', err);
    sendResponse(err);
  })
  .then((count) => {
    GTSdebug.log('count/dataLimit', count+'/'+dataLimit);
    if(dataLimit>=count) return Promise.resolve([]);

    return SERVER.searchTargets
    .query()
    .all()
    .limit(0, count-dataLimit)
    .execute()
  })
  .then(results => {
    results.forEach(result => {
      SERVER.searchTargets.remove(result.id)
      .then(removed => GTSdebug.log('removed', removed));
    });
  })
  ;
}

let addSearchTarget = (searchTarget) => {
  return SERVER.searchTargets
  .add({
    searchTarget: searchTarget,
    count: 1,
    updated: Date.now()
  });
}

let updateSearchTarget = (searchTargetObj) => {
  searchTargetObj.count = searchTargetObj.count + 1;
  searchTargetObj.updated = Date.now();
  return SERVER.searchTargets
  .update(searchTargetObj)
  ;
};

function getSearchTarget(sendResponse) {
  openDatabase()
  .then(() =>
    SERVER.searchTargets
    .query()
    .all()
    .execute()
  )
  .then(results => {
    let response = { status : 'ok' };
    response.data = results;
    GTSdebug.log('get ok.')
    sendResponse(response);
  })
  .catch((err) => {
    GTSdebug.log('get fail.', err);
    sendResponse(err);
  })
  ;
}

function clearSearchTarget(sendResponse) {
  openDatabase()
  .then(() =>
    SERVER.searchTargets
    .clear()
  )
  .then(() => {
    let response = { status : 'ok' };
    GTSdebug.log('clear ok.')
    sendResponse(response);
  })
  .catch((err) => {
    GTSdebug.log('clear fail.', err);
    sendResponse(err);
  })
  ;
}

function onMessageListener(request, sender, sendResponse) {
  GTSdebug.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  GTSdebug.log('request', request);
  let {type} = request;
  let response = { status : 'done' };
  switch(type) {
    case 'put':
      putSearchTarget(request.searchTarget, sendResponse);
      break;
    case 'get':
      getSearchTarget(sendResponse);
      break;
    case 'clear':
      clearSearchTarget(sendResponse);
      break;
    default:
      throw new Error('not applicable from ' + from);
      break;
  }
  // sendResponse(response);
  return true;
}


openDatabase()
.then(() => {
  SERVER.searchTargets.query().all().execute().then(results => GTSdebug.log(results));
})
;
chrome.runtime.onInstalled.addListener(onInstalledListener);
chrome.runtime.onMessage.addListener(onMessageListener);

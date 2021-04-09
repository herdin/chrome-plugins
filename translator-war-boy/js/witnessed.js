(function() {
  logger.name = 'witnessed.js';
  logger.log('hello, witnessed js');

  //COMPARATORS.<KEY> must mathching with config.witnessedComparatorKey value
  const COMPARATORS = {
    BY_COUNT_DESC: {
      desc: 'COUNT DESC',
      comparator: (s1, s2) => s2.count-s1.count
    },
    BY_UPDATED_DESC: {
      desc: 'UPDATED DESC',
      comparator: (s1, s2) => s2.updated-s1.updated
    },
    BY_TARGET_ASC: {
      desc: 'ALPHABETICAL ASC',
      comparator: (s1, s2) => (s1.target == s2.target)? 0: (s1.target < s2.target)? -1:1
    }
  };

  let searchTargetInfoArrCache = [];
  const selectComparator = document.querySelector('#select-comparator');
  let loggingContainer = document.querySelector('.witnessed-container');

  selectComparator.addEventListener('change', (e) => {
    let comparatorKey = e.target.selectedOptions[0].getAttribute('value');
    chrome.storage.sync.get('config', function({config}) {
      logger.log('get config', config);
      config.witnessedComparatorKey = comparatorKey;
      chrome.storage.sync.set({'config': config});
      initSearchTarget();
    });
  });

  chrome.storage.sync.get('config', function({config}) {
    logger.log('get config', config);
    logger.config = config;
    initComparator(config);
    initSearchTarget(true);
  });

  function initComparator(config) {
    //select service option init
    for(key in COMPARATORS) {
      let comparator = COMPARATORS[key];
      let option = document.createElement('option');
      if(key == config.witnessedComparatorKey) option.setAttribute('selected', 'selected');
      option.setAttribute('value', key);
      let text = document.createTextNode(comparator.desc);
      option.appendChild(text);
      selectComparator.appendChild(option);
    }
  }

  function initSearchTarget(reload = false) {
    logger.log('init search target, reload -> ', reload);

    let promise = null;

    if(reload) {
      promise = new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: 'get' }, function(response) {
          logger.log('get response -> ', response);
          searchTargetInfoArrCache = response.data;
          resolve();
        });
      });
    } else {
      promise = Promise.resolve();
    }
    promise.then(() => {
      reloadSearchTargetWithCach();
    });
  }

  function reloadSearchTargetWithCach() {
    logger.log('reload search target');

    //clear child of witnessed-container for update
    while(loggingContainer.firstChild) loggingContainer.removeChild(loggingContainer.firstChild);

    if(searchTargetInfoArrCache && searchTargetInfoArrCache.length <= 0) {
      loggingContainer.appendChild(document.createTextNode('clear.. like aqua cola..'));
      return;
    }

    let comparatorKey = selectComparator.querySelector('option:checked').getAttribute('value');
    searchTargetInfoArrCache.sort(COMPARATORS[comparatorKey].comparator);
    searchTargetInfoArrCache.forEach(searchTargetInfo => {
      let divSearchTarget = document.createElement('div');
      divSearchTarget.setAttribute('data-id', searchTargetInfo.id);
      divSearchTarget.setAttribute('data-target', searchTargetInfo.target);
      divSearchTarget.setAttribute('data-count', searchTargetInfo.count);
      divSearchTarget.setAttribute('data-updated', searchTargetInfo.updated);
      let target = searchTargetInfo.target;
      target = (target.length > 20)? target.substring(0, 20) + '...' : target;
      divSearchTarget.appendChild(document.createTextNode(target));
      loggingContainer.appendChild(divSearchTarget);
      let divCount = document.createElement('div');
      divCount.appendChild(document.createTextNode(searchTargetInfo.count));
      loggingContainer.appendChild(divCount);
      let a = document.createElement('a');
      a.classList.add('close');
      a.setAttribute('data-id', searchTargetInfo.id);
      a.addEventListener('click', (e) => {
        logger.log('remove', e);
        let deleteId = Number(e.target.getAttribute('data-id'));
        chrome.runtime.sendMessage({ type: 'delete', deleteId: deleteId }, function(response) {
          logger.log('delete response -> ', response);
          initSearchTarget(true);
        });
      });
      loggingContainer.appendChild(a);
    });
  }

  document.getElementById("clear").addEventListener("click", () => {
    logger.log('clear clicked');
    chrome.runtime.sendMessage({ type: 'clear' }, function(response) {
      logger.log('clear response -> ', response);
      initSearchTarget(true);
    });
  });

  document.getElementById("reload").addEventListener("click", () => {
    logger.log('reload clicked');
    initSearchTarget(true);
  });

})();

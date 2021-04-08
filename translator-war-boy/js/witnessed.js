(function() {
  logger.name = 'witnessed.js';
  logger.log('hello, witnessed js');
  const WITNESSED_CONTAINER_CLASS_SELECTOR = '.witnessed-container';
  init();

  function init() {
    let loggingContainer = document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR);
    //clear child of witnessed-container for update
    while(loggingContainer.firstChild) loggingContainer.removeChild(loggingContainer.firstChild);

    chrome.runtime.sendMessage({ type: 'get' }, function(response) {
      logger.log('get response -> ', response);
      let searchTargetInfoArr = response.data;
      if(searchTargetInfoArr.length <= 0) {
        document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR)
        .appendChild(document.createTextNode('clear.. like aqua cola..'));
      }
      searchTargetInfoArr.sort((s1, s2) => s2.count-s1.count);
      searchTargetInfoArr.forEach(searchTargetInfo => {
        let divSearchTarget = document.createElement('div');
        divSearchTarget.setAttribute('data-id', searchTargetInfo.id);
        divSearchTarget.setAttribute('data-target', searchTargetInfo.target);
        divSearchTarget.setAttribute('data-count', searchTargetInfo.count);
        divSearchTarget.setAttribute('data-updated', searchTargetInfo.updated);
        let target = searchTargetInfo.target;
        target = (target.length > 20)? target.substring(0, 20) + '...' : target;
        divSearchTarget.appendChild(document.createTextNode(target));
        document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR).appendChild(divSearchTarget);
        let divCount = document.createElement('div');
        divCount.appendChild(document.createTextNode(searchTargetInfo.count));
        document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR).appendChild(divCount);
        let a = document.createElement('a');
        a.classList.add('close');
        a.setAttribute('data-id', searchTargetInfo.id);
        a.addEventListener('click', removeHandler);
        document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR).appendChild(a);
      });
    });
  }

  function removeHandler(e) {
    logger.log('remove', e);
    let deleteId = Number(e.target.getAttribute('data-id'));
    chrome.runtime.sendMessage({ type: 'delete', deleteId: deleteId }, function(response) {
      logger.log('delete response -> ', response);
      init();
    });
  }

  document.getElementById("clear")
  .addEventListener("click", () => {
    logger.log('clear clicked');
    let parent = document.querySelector(WITNESSED_CONTAINER_CLASS_SELECTOR);
    chrome.runtime.sendMessage({ type: 'clear' }, function(response) {
      logger.log('clear response -> ', response);
      init();
    });
  });

})();

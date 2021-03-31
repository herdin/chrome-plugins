(function() {
  GTSdebug.log('hello, logging js');
  init();

  function init() {
    let loggingContainer = document.querySelector('.logging-container');
    //clear child of logging-container
    while(loggingContainer.firstChild) loggingContainer.removeChild(loggingContainer.firstChild);

    chrome.runtime.sendMessage({ type: 'get' }, function(response) {
      GTSdebug.log('get response -> ', response);
      let searchTargetInfoArr = response.data;
      searchTargetInfoArr.sort((s1, s2) => s2.count-s1.count);
      searchTargetInfoArr.forEach(searchTargetInfo => {
        let divSearchTarget = document.createElement('div');
        divSearchTarget.setAttribute('data-id', searchTargetInfo.id);
        divSearchTarget.setAttribute('data-searchTarget', searchTargetInfo.searchTarget);
        divSearchTarget.setAttribute('data-count', searchTargetInfo.count);
        divSearchTarget.setAttribute('data-updated', searchTargetInfo.updated);
        let searchTarget = searchTargetInfo.searchTarget;
        searchTarget = (searchTarget.length > 20)? searchTarget.substring(0, 20) + '...' : searchTarget;
        let textSearchTarget = document.createTextNode(searchTarget);
        divSearchTarget.appendChild(textSearchTarget);
        document.querySelector('.logging-container').appendChild(divSearchTarget);
        let divCount = document.createElement('div');
        divCount.appendChild(document.createTextNode(searchTargetInfo.count));
        document.querySelector('.logging-container').appendChild(divCount);
      });
    });
  }

  document.getElementById("clear")
  .addEventListener("click", () => {
    GTSdebug.log('clear clicked');
    let parent = document.querySelector('.logging-container');
    chrome.runtime.sendMessage({ type: 'clear' }, function(response) {
      GTSdebug.log('clear response -> ', response);
      init();
    });
  });

})();

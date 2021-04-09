(function() {
  logger.name = 'about.js';
  logger.log('hello, about js');

  chrome.storage.sync.get('config', function({config}) {
    logger.log('get config', config);
    logger.config = config;
  });

  document.querySelector('#toggle-donation').addEventListener('click', () => {
    let style = document.querySelector('.donation-container').style;
    if(style.display) style.display = '';
    else style.display = 'none';
  });
})();

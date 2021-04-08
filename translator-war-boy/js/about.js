(function() {
  logger.name = 'about.js';
  logger.log('hello, about js');

  document.querySelector('#toggle-donation').addEventListener('click', () => {
    let style = document.querySelector('.donation-container').style;
    if(style.display) style.display = '';
    else style.display = 'none';
  });
})();

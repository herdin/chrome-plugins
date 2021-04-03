console.log(`hello, deploy.js`);

console.log('add simple onetime requests listener')
chrome.runtime.onMessage.addListener(onMessageListener);
function onMessageListener(request, sender, sendResponse) {
  // console.log('request', request);
  // console.log('sender', sender)
  // console.log('sendResponse', sendResponse)
  // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  console.log('recv data', request);
  sendResponse(testData('active tab', 'hello'));
  return true;
}

console.log(`add long lived connections listener`);
chrome.runtime.onConnect.addListener(function(port) {
  console.log(`on connect`);
  port.onMessage.addListener(function(msg) {
    console.log('recv data', msg);
    port.postMessage(testData('active tab', 'hello'));
  });
});

console.log('add strage polling message listener');
setInterval(() => {
  chrome.storage.sync.get('polling', function({polling}) {
    console.log('get polling -> ', polling);
    if(!polling.selectionText) return;
    console.log('polling data init');
    chrome.storage.sync.set({'polling': { selectionText: ''}});
  });
}, 1000);

function testData(from, data) {
  let sendData = {
    from: from,
    data: data
  };
  console.log('send data', sendData)
  return sendData;
}

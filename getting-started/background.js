let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  console.log('hello, extention');

  console.log('storage set color', color);
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  console.log('polling data init')
  let polling = { selectionText: ''};
  chrome.storage.sync.set({'polling': polling});
  chrome.storage.sync.get('polling', function({polling}) {
    console.log('set polling -> ', polling);
  });

  console.log('context menu add');
  const contextMenuArr = [
    'simple_onetime_requests', 'long_lived_connections', 'storage_pooling_message'
  ];

  contextMenuArr.forEach(contextMenu => {
    chrome.contextMenus.create({
      id: contextMenu,
      title: contextMenu.replaceAll('_', ' '),
      contexts: ['selection'],
      visible: true,
    });
  });

});


chrome.contextMenus.onClicked.addListener((e) => {
  console.log('context menu clicked, event -> ', e);
  let menuItemId = e.menuItemId;
  let selectionText = e.selectionText;
  console.log('clicked menu item id ->', menuItemId);
  console.log('selection text -> ', selectionText)

  switch(menuItemId) {
    case 'simple_onetime_requests': simpleOnetimeRequests(selectionText); break;
    case 'long_lived_connections': longLivedConnections(selectionText); break;
    case 'storage_pooling_message': storagePollingMessage(selectionText); break;
    default:
      throw new Error('not applicable menu item id -> ', menuItemId);
  }
});

async function simpleOnetimeRequests(selectionText) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log('active tab id -> ', tab.id);
  chrome.tabs.sendMessage(tab.id, testData('background-simple-onetime', selectionText), (recvData) => console.log('recv data', recvData));
}

async function longLivedConnections(selectionText) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  var port = chrome.tabs.connect(tab.id, {name: 'long-lived-port'});
  port.onMessage.addListener(function(msg) {
    console.log('recv data', msg);
  });
  port.postMessage(testData('background-long-lived1', selectionText));
  port.postMessage(testData('background-long-lived2', selectionText));
  port.postMessage(testData('background-long-lived3', selectionText));
}

function storagePollingMessage(selectionText) {
  let polling = { selectionText: selectionText };
  chrome.storage.sync.set({'polling': polling});
}

function testData(from, data) {
  let sendData = {
    from: from,
    data: data
  };
  console.log('send data', sendData)
  return sendData;
}

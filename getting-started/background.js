let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  console.log('hello, extention');

  console.log('storage set color', color);
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  console.log('context menu add');
  chrome.contextMenus.create({
    id: "text_select",
    title: "select text",
    contexts: ["selection"],
    visible: false,
  });
});

chrome.contextMenus.onClicked.addListener((e) => {console.log('h', e);});

function handler(e) {
  console.log('handler', e);
}

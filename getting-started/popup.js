// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  console.log('popup, storage color -> ', color);
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  console.log('popup, button clicked');
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });

  console.log('context menu, update');
  chrome.contextMenus.update('text_select', {
    visible: true,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  console.log('setPageBackgroundColor');
  chrome.storage.sync.get("color", ({color}) => {
    console.log('storage color -> ', color);
    //document.body.style.backgroundColor = color;
  });
}

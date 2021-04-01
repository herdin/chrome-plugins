### 사전 설정 기능 추가
* https://www.ldoceonline.com/


### pdf 에서 쓰고싶다.
#### context menu (마우스 오른쪽 클릭 메뉴) 추가

`menifest.json` 에 `permissions` 추가

``` json
{
  //...
  "permissions": ["contextMenus"],
  //...
}
```

* service worker (background script) 에서
  * chrome.contextMenus.create 로 생성
  * chrome.contextMenus.onClicked.addListener 클릭 리스너 추가

``` javascript
chrome.contextMenus.create({
  id: "text_select",
  title: "select text",
  contexts: ["selection"],
  visible: true,
});

chrome.contextMenus.onClicked.addListener((e) => {console.log('h', e);});
```

리스너의 event 객체는 요딴식으로 생겼다. `menuItemId` 으로 이벤트를 구별하면 되겠다.

``` javascript
{
  editable: false,
  frameId: 0,
  menuItemId: "text_select",
  pageUrl: "https://nesoy.github.io/articles/2017-01/Git-Ignore",
  selectionText: "he doc/ directory"
}
```


### 도네이션 메뉴 추가



### description 다듬기
윤뱅 버전
```
If you are not a native English speaker, you may need to translate and find the meaning of words while googling.

Now, it is time to use a translator "War Boy" on your web. You just drag or scroll the words.

War Boy will immediately search them on Google translator and record everything you searched in the Witnessed section. So you can find how many times you have searched the words.
```

/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onMessage.addListener((msg, sender, sendRespnse) => {
    console.log(msg);
    console.log(sender);
    sendRespnse("From the background script!");
});

/******/ })()
;
//# sourceMappingURL=background.js.map
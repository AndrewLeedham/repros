(function (window, document) {
  let event;
  try {
    event = new window.CustomEvent("xrx-fw-ready", {
      detail: {},
      bubbles: true,
      cancelable: false,
    });
  } catch (e) {
    event = document.createEvent("Event");
    event.initEvent("xrx-fw-ready", true, false);
    event.detail = {};
  }
  document.dispatchEvent(event);
})(window, document);

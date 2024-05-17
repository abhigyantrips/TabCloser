chrome.runtime.onMessage.addListener(
  (message, _, sendResponse: (response: { hostname: string }) => void) => {
    if (message.type === "GET_URL_HOSTNAME") {
      sendResponse({ hostname: window.location.hostname });
    }

    if (message.type === "CLOSE") {
      window.close();
    }
  }
);

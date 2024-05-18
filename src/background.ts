import { getLocalStorage, setLocalStorage } from "@/lib/storage";

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameType !== "outermost_frame") return;

  const extensionEnabled = await getLocalStorage("EXTENSION_ENABLED");
  if (extensionEnabled === undefined) {
    setLocalStorage("EXTENSION_ENABLED", false);
  } else if (!extensionEnabled) return;

  const siteList = await getLocalStorage("EXTENSION_URL_LIST");
  if (!siteList) return;

  const url = new URL(details.url);

  if (
    siteList.includes(url.hostname) ||
    siteList.includes(url.hostname.replace("www.", ""))
  ) {
    chrome.tabs.remove(details.tabId);
  }
});

export {};

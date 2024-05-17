import { getLocalStorage, setLocalStorage } from "@/lib/storage";

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameType !== "outermost_frame") return;

  const extensionEnabled = getLocalStorage("EXTENSION_ENABLED");
  if (extensionEnabled === undefined) {
    setLocalStorage("EXTENSION_ENABLED", true);
  } else if (!extensionEnabled) return;

  const siteList = await getLocalStorage("EXTENSION_URL_LIST");
  if (!siteList) return;

  const url = new URL(details.url);
  const hostname = url.hostname;

  if (
    siteList.includes(hostname) ||
    siteList.includes(hostname.replace("www.", ""))
  ) {
    chrome.tabs.remove(details.tabId);
  }
});

export {};

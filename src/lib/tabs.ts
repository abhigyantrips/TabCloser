import { getLocalStorage } from "./storage";

export async function closeTabsOnEnabled() {
  const tabs = await chrome.tabs.query({});
  const siteList = await getLocalStorage("EXTENSION_URL_LIST");

  if (!siteList) return;

  tabs.forEach(function (tab) {
    const url = new URL(tab.url);

    if (
      siteList.includes(url.hostname) ||
      siteList.includes(url.hostname.replace("www.", ""))
    ) {
      chrome.tabs.remove(tab.id);
    }
  });
}

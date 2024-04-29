import { getLocalStorage } from '@/lib/storage';

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameType !== 'outermost_frame') return;

  const extensionEnabled = getLocalStorage('SITE_BLOCK_ENABLED');
  if (!extensionEnabled) return;

  const siteList = await getLocalStorage('SITE_BLOCK_URL_LIST');
  if (!siteList) return;

  const url = new URL(details.url);
  const origin = url.origin;

  if (siteList.includes(origin)) {
    chrome.tabs.remove(details.tabId);
  }
});

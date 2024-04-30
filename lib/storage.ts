import { LocalStorageItems } from '@/types';

type Data<T> = T extends 'EXTENSION_URL_LIST'
  ? LocalStorageItems['EXTENSION_URL_LIST']
  : LocalStorageItems['EXTENSION_ENABLED'];

export async function getLocalStorage<T extends keyof LocalStorageItems>(key: T): Promise<Data<T> | undefined> {
  return chrome.storage.local.get(key).then((value) => value[key]);
}

export async function setLocalStorage<T extends keyof LocalStorageItems>(key: T, values: Data<T>) {
  chrome.storage.local.set({ [key]: values });
}

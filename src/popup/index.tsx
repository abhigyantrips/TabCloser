import { Check, Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getLocalStorage, setLocalStorage } from "@/lib/storage";

import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";

export default function Popup() {
  const [hostname, setHostname] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        return;
      }

      const siteList = await getLocalStorage("EXTENSION_URL_LIST");
      const promise = chrome.tabs.sendMessage(tab.id, {
        type: "GET_URL_HOSTNAME",
      });
      promise
        .then((response) => {
          if (!response) return;

          if (
            siteList.includes(response.hostname) ||
            siteList.includes(response.hostname.replace("www.", ""))
          ) {
            setAdded(true);
          }

          setHostname(response.hostname);
        })
        .catch((e) => {
          setRestricted(true);
          console.log(tab.url, e);
        });

      const extensionEnabled = await getLocalStorage("EXTENSION_ENABLED");

      setEnabled(extensionEnabled ?? true);
    })();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-[150px] w-[300px] flex-col items-center justify-center gap-4 bg-background p-8">
        <h4 className="text-xl font-semibold">
          extension {enabled ? "enabled" : "disabled"}.
        </h4>
        <div className="flex gap-2">
          {added ? (
            <Button disabled>
              <Check className="mr-2 h-5 w-5" />
              Tab Added
            </Button>
          ) : (
            <Button
              disabled={restricted}
              onClick={async () => {
                const siteList = await getLocalStorage("EXTENSION_URL_LIST");
                setLocalStorage("EXTENSION_URL_LIST", [...siteList, hostname]);
                setRestricted(true);

                const [tab] = await chrome.tabs.query({
                  active: true,
                  currentWindow: true,
                });
                if (!tab.id) return;

                chrome.tabs.sendMessage(tab.id, { type: "CLOSE" });
              }}>
              <Plus className="mr-2 h-5 w-5" /> Add Tab to List
            </Button>
          )}
          <Button size="icon" onClick={() => chrome.runtime.openOptionsPage()}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

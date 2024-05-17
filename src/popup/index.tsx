import { Cog, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getLocalStorage } from "@/lib/storage";

import "@/styles/globals.css";

export default function Popup() {
  const [origin, setOrigin] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [restricted, setRestricted] = useState(false);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        return;
      }

      const promise = chrome.tabs.sendMessage(tab.id, {
        type: "GET_URL_ORIGIN",
      });
      promise
        .then((response) => {
          if (response) {
            setRestricted(false);
            setOrigin(response.origin);
          }
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
    <div className="flex h-[150px] w-[300px] flex-col items-center justify-center gap-4 bg-background p-8">
      <h4 className="text-xl font-semibold">
        Extension {enabled ? "Enabled" : "Disabled"}.
      </h4>
      <div className="flex gap-2">
        <Button disabled={restricted}>
          <Plus className="mr-2 h-5 w-5" /> Add Tab to List
        </Button>
        <Button size="icon" onClick={() => chrome.runtime.openOptionsPage()}>
          <Cog className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

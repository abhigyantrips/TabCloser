'use client';

import { Cog, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { getLocalStorage } from '@/lib/storage';

export default async function Popup() {
  const [origin, setOrigin] = useState('');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        return;
      }

      chrome.tabs.sendMessage(tab.id, { type: 'GET_URL_ORIGIN' }, (response) => {
        if (response) {
          setOrigin(response.origin);
        }
      });

      const extensionEnabled = await getLocalStorage('EXTENSION_ENABLED');

      setEnabled(extensionEnabled ?? true);
    })();
  }, []);

  return (
    <div className="m-6 flex flex-col items-center justify-center gap-4 bg-background">
      <h4>Extension {enabled ? 'Enabled' : 'Disabled'}.</h4>
      <div className="flex gap-2">
        <Button>
          <Plus className="mr-2 h-5 w-5" /> Add Tab to List
        </Button>
        <Button size="icon">
          <Cog className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

import Image from 'next/image';

import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  return (
    <header className="sticky inset-0 top-0 z-50 flex h-16 w-full flex-col items-center justify-around border-b bg-background/60 px-6 py-0 backdrop-blur-[5px] backdrop-saturate-[180%]">
      <nav className="container relative flex w-full flex-1 items-center">
        <div className="flex w-full items-center gap-6">
          <div className="flex flex-initial select-none flex-row items-center justify-start p-0">
            <Image
              src="/assets/icon-green-512.png"
              alt="Page Icon"
              className="dark:contrast-200 dark:grayscale"
              height={32}
              width={32}
            />
            <svg height="32" role="separator" viewBox="0 0 32 32" width="32">
              <path d="M22 5L9 28" className="stroke-foreground/50" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="text-xl font-bold">settings</span>
          </div>
        </div>
        <ThemeSwitcher />
      </nav>
    </header>
  );
}

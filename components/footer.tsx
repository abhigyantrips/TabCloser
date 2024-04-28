import Link from 'next/link';

import { extensionConfig } from '@/extension.config';

export function Footer() {
  return (
    <footer className="flex h-16 w-full border-t px-6 py-0">
      <div className="container flex w-full flex-1 flex-col items-center justify-between md:flex-row">
        <div className="py-3 text-center text-sm text-muted-foreground">
          <span>
            Created by{' '}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="underline transition-colors duration-150 hover:text-foreground"
              href={extensionConfig.author.site}
            >
              Abhigyan Trips
            </Link>
            .{' '}
          </span>
          <span>
            Source code on{' '}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="underline transition-colors duration-150 hover:text-foreground"
              href={extensionConfig.source}
            >
              GitHub
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}

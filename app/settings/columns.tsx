'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const columns: ColumnDef<{ url: string }>[] = [
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    id: 'delete',
    enableHiding: false,
    cell: ({ row }) => {
      const url = row.original;

      return (
        <Button variant="outline" size="icon" className="hover:bg-red-500 [&>*]:hover:stroke-white">
          <Trash className="h-5 w-5" />
          <span className="sr-only">Delete Item</span>
        </Button>
      );
    },
  },
];

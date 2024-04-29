'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<{ url: string }>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    id: 'delete',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button variant="outline" size="icon" className="hover:bg-red-500 [&>*]:hover:stroke-white">
          <Trash className="h-5 w-5" />
          <span className="sr-only">Delete Item</span>
        </Button>
      );
    },
  },
];

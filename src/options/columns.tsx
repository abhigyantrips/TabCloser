import type { ColumnDef } from "@tanstack/react-table";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

export const getColumns = ({
  onDelete,
}: {
  onDelete: (url: string) => void;
}): ColumnDef<{ id: number; url: string }>[] => [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-red-500 [&>*]:hover:stroke-white"
          onClick={() => onDelete(row.original.url)}>
          <Trash className="h-5 w-5" />
          <span className="sr-only">Delete Item</span>
        </Button>
      );
    },
  },
];

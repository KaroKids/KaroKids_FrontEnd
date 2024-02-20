"use client";

import * as React from "react";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "@/redux/productosActions";
import { useParams } from "react-router-dom";

const frameworks = [
  {
    value: "5 (2 años)",
    label: "5 (2 años)",
  },
  {
    value: "6 (3 años)",
    label: "6 (3 años)",
  },
  {
    value: "7 (4 años)",
    label: "7 (4 años)",
  },
  {
    value: "8 (6 años)",
    label: "8 (6 años)",
  },
  {
    value: "9 (8 años)",
    label: "9 (8 años)",
  },
];

export function Combobox() {
  const product = useSelector((state) => state.productos.detail);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    dispatch(getProductsById(id));
  }, []);

  let stock = product.stock;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-gray-200 border-2"
        >
          {value ? value : "Talle"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar talle..." />
          <CommandEmpty>Talle no encontrado.</CommandEmpty>
          <CommandGroup>
            {Object.entries(stock).map(([key, values]) => (
              <CommandItem
                key={key}
                value={key}
                onSelect={() => {
                  setValue(key);
                  setOpen(false);
                }}
              >
                {key}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

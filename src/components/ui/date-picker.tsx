"use client";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Input>) {
  const currentDate = props.value ? new Date(props.value as string) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild className="p-0">
        {children}
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={props.onChange as any}
          disabled={props.disabled}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}

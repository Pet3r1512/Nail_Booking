"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";

function capitalizeFirstLetters(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    if (date && date < tomorrow) {
      setWarning("Vui lòng đặt lịch bắt đầu từ ngày mai");
    } else {
      setWarning("");
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          <div>
            {date ? (
              capitalizeFirstLetters(format(date, "PPP", { locale: vi })) // Apply capitalization
            ) : (
              <span>Vui lòng chọn ngày</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
      {warning !== "" ? <p className="text-orange-600">{warning}</p> : <></>}
    </Popover>
  );
}

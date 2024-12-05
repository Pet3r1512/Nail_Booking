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
  const [error, setError] = useState("");

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    if (date && date < tomorrow) {
      setError("Vui lòng đặt lịch bắt đầu từ ngày mai");
    } else {
      setError("");
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal !border-[1.25px] !border-[#ededed]",
            !date && "text-muted-foreground",
            date && error !== "" ? "!border-green-400" : "",
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
      {error !== "" ? <p className="text-red-500">{error}</p> : <></>}
    </Popover>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/formStore";
import { Calendar } from "@/components/ui/calendar";
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { vi } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type BookingType = {
  id: string;
  date: string;
  time: string;
  customerId: number;
  createdAt: string;
};

function capitalizeFirstLetters(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(inputDate: Date) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function SlotPicker({
  setForm,
}: {
  setForm: React.Dispatch<SetStateAction<any>>;
}) {
  const { updateField } = useFormStore();
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<Date>(
    (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    })(),
  );
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [morningSlots, setMorningSlots] = useState(2);
  const [afternoonSlots, setAfternoonSlots] = useState(2);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    if (date && date < tomorrow) {
      setError("Vui lòng đặt lịch bắt đầu từ ngày mai");
    } else {
      setError("");
      setFormattedDate(formatDate(date));
      setForm((prev: any) => ({ ...prev, date: formatDate(date) }));
    }
  }, [date]);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8787/bookings/${formattedDate}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: formattedDate }),
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch slots");
        }
        const data = await response.json();
        const bookings: BookingType[] = data.bookings;

        let morningBookings = 0;
        let afternoonBookings = 0;

        bookings.forEach((booking) => {
          if (booking.time === "morning") {
            morningBookings++;
          } else {
            afternoonBookings++;
          }
        });

        setMorningSlots(2 - morningBookings);
        setAfternoonSlots(2 - afternoonBookings);
      } catch (error) {
        console.error(error);
        setError("Thất bại");
      } finally {
        setLoading(false);
      }
    };

    if (formattedDate) {
      fetchSlots();
    }
  }, [formattedDate]);

  const handleChange = (value: string) => {
    setTime(value);
    updateField("time", value);
    setForm((prev: any) => ({ ...prev, time: value }));
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="w-full flex flex-col gap-y-3">
        <label htmlFor="date">Ngày đặt hẹn</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal !border-[1.25px] !border-[#ededed]",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              <div>
                {date ? (
                  capitalizeFirstLetters(format(date, "PPP", { locale: vi }))
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
              fromDate={(() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow;
              })()}
              onSelect={(day: Date | undefined) => setDate(day || new Date())}
              initialFocus
            />
          </PopoverContent>
          {error !== "" && <p className="text-red-500">{error}</p>}
        </Popover>
      </div>
      <div className="w-full flex flex-col gap-y-3">
        <label htmlFor="time">Khung giờ</label>
        <Select
          value={time}
          disabled={afternoonSlots === 0 && morningSlots === 0}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={loading ? "Vui lòng đợi" : "Vui lòng chọn thời gian"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{"Thời gian"}</SelectLabel>
              <SelectItem disabled={morningSlots === 0} value="morning">
                {`Sáng (8:30 - 11:30) - Còn ${morningSlots} chỗ`}
              </SelectItem>
              <SelectItem disabled={afternoonSlots === 0} value="afternoon">
                {`Chiều (13:30 - 16:30) - Còn ${afternoonSlots} chỗ`}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

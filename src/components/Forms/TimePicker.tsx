import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function TimePicker() {
  const [slots, setSlots] = useState({
    morning: 0,
    afternoon: 2,
  });

  const handleChange = (value: string) => {
    if (value === "morning") {
      setSlots((prevSlots) => ({
        ...prevSlots,
        morning: prevSlots.morning - 1,
      }));
    } else if (value === "afternoon") {
      setSlots((prevSlots) => ({
        ...prevSlots,
        afternoon: prevSlots.afternoon - 1,
      }));
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vui lòng chọn thời gian" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Thời gian"}</SelectLabel>
          <SelectItem disabled={slots.morning == 0} value="morning">
            {"Sáng (8:30 - 11:30)"}
          </SelectItem>
          <SelectItem disabled={slots.afternoon == 0} value="afternoon">
            {"Chiều (13:30 - 16:30)"}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

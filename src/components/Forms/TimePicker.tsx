import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/store/formStore";
import { useState } from "react";

export function TimePicker() {
  const { updateField } = useFormStore();
  const { time, setTime } = useState<string>("");
  const [slots, setSlots] = useState({
    morning: 2,
    afternoon: 2,
  });

  const handleChange = (value: string) => {
    setTime(value);
    updateField("time", value);
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

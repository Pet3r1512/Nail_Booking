import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TimePicker() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vui lòng chọn thời gian" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{"Thời gian"}</SelectLabel>
          <SelectItem value="morning">{"Sáng (8:30 - 11:30)"}</SelectItem>
          <SelectItem value="afternoon">{"Chiều (13:30 - 16:30)"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

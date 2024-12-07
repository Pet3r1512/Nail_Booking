import { Input } from "@/components/ui/input";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import PhoneInput from "./PhoneInput";
import { useEffect, useState } from "react";
import { useFormStore } from "@/store/formStore";
import useDebounce from "@/hooks/useDebounce";

export default function BookingForm() {
  const { updateField } = useFormStore();
  const [name, setNameInput] = useState<string>("");
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    updateField("name", debouncedName);

  return (
    <section className="max-w-lg w-full bg-white shadow-2xl min-h-96 rounded-2xl p-5 lg:px-5 lg:py-14 flex flex-col">
      <form className="h-full w-full flex flex-col gap-y-6 items-center flex-1 pt-5 pb-8">
        <p className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">
          {"Đặt Lịch"}
        </p>
        <div className="w-full space-y-3">
          <label htmlFor="name">Họ và Tên</label>
          <Input
            id="name"
            className="inputs ring-0 border-[1.25px] border-[#ededed] focus-visible:ring-offset-0 focus-visible:ring-0"
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setNameInput(e.target.value)} // Update the local state
          />
        </div>
        <PhoneInput />
        <div className="w-full flex flex-col gap-y-3">
          <label htmlFor="date">Ngày đặt hẹn</label>
          <DatePicker />
        </div>
        <div className="w-full flex flex-col gap-y-3">
          <label htmlFor="time">Khung giờ</label>
          <TimePicker />
        </div>
      </form>
      <button className="bg-green-500 text-white px-3 py-2 rounded-2xl font-semibold">
        {"Xác Nhận"}
      </button>
    </section>
  );
}

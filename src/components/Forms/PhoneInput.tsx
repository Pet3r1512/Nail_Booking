import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function PhoneInput() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const debouncedPhoneNumber = useDebounce(phone, 500);
  const { updateField } = useFormStore();

  const validatePhoneNumber = (phone: string) => {
    const regex = /^0\d{9}$/;
    return regex.test(phone);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPhone(value);

    if (!validatePhoneNumber(value)) {
      setError("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
    } else {
      setError("");
    }
  };
  return (
    <div className="w-full space-y-3">
      <label htmlFor="phone">Số điện thoại</label>
      <Input
        className={cn(
          " inputs ring-0 border-[1.25px] border-[#ededed] focus-visible:ring-offset-0 focus-visible:ring-0",
          error === "" && phone !== "" && "border-green-400",
        )}
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="090*******"
      />
      {error !== "" && <p className="text-red-500">{error}</p>}
    </div>
  );
}

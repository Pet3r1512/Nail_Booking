/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { initFormData, useFormStore } from "@/store/formStore";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import SlotPicker from "./SlotPicker";
import PhoneInput from "./PhoneInput";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "../ui/toaster";

export default function BookingForm() {
  const { updateField } = useFormStore();
  const [name, setNameInput] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });
  const [allow, setAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    updateField("name", debouncedName);
    setForm((prev) => ({ ...prev, name: debouncedName }));
  }, [debouncedName]);

  useEffect(() => {
    if (form.name === "" || form.phoneNumber === "" || form.time === "") {
      setAllow(false);
    } else {
      setAllow(true);
    }
  }, [form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const response = await fetch("http://127.0.0.1:8787/bookings/", {
      const response = await fetch(
        "https://server.pttp15122002.workers.dev/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      if (!response.ok || error !== "") {
        setError("Thất bại");
        const data = await response.json();
        if (data.error === "Existed phone number with another name") {
          toast({
            variant: "destructive",
            className: "bg-red-500 text-white",
            title: "Thất Bại",
            description:
              "Quý khách đã đăng kí tên khác cùng với số điện thoại này!",
          });
        } else {
          toast({
            variant: "destructive",
            className: "bg-red-500 text-white",
            title: "Thất Bại",
            description: "Xin vui lòng thử lại!",
          });
        }
      }
      const data = await response.json();
      if (data.success) {
        toast({
          className: "bg-green-500 text-white",
          title: "Thành Công",
          description: "Xin cám ơn quý khách",
        });
        setForm(initFormData);
      }
    } catch (error) {
      setError("Thất bại");
    } finally {
      setLoading(false);
    }
  };

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
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <PhoneInput setForm={setForm} />
        <SlotPicker setForm={setForm} />
      </form>
      <button
        disabled={!allow}
        onClick={handleSubmit}
        className={cn(
          " text-white px-3 py-2 rounded-2xl font-semibold flex justify-center items-center",
          allow
            ? "bg-green-500 cursor-pointer"
            : "bg-gray-500 cursor-not-allowed",
        )}
      >
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <p>{"Xác Nhận"}</p>
        )}
      </button>
      <Toaster />
    </section>
  );
}

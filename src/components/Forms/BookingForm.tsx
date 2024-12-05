import { Input } from "@/components/ui/input";
import { DatePicker } from "../DatePicker";

export default function BookingForm() {
  return (
    <section className="max-w-lg w-full bg-white shadow-2xl min-h-96 rounded-2xl p-5 lg:px-5 lg:py-14 flex flex-col">
      <form className="h-full w-full flex flex-col gap-y-6 items-center flex-1 py-5">
        <p className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">
          {"Đặt Lịch"}
        </p>
        <div className="w-full space-y-3">
          <label htmlFor="name">Họ và Tên</label>
          <Input
            className="inputs ring-0 border-2 border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
            type="text"
            placeholder="Tên của bạn"
          />
        </div>
        <div className="w-full space-y-3">
          <label htmlFor="phone">Số điện thoại</label>
          <Input
            className=" inputs ring-0 border-2 border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
            type="tel"
            placeholder="090*******"
          />
        </div>
        <div className="w-full flex flex-col gap-y-3">
          <label htmlFor="date">Ngày đặt hẹn</label>
          <DatePicker />
        </div>
      </form>
      <button className="bg-green-500 text-white px-3 py-2 rounded-2xl font-semibold w-fit">
        {"Xác Nhận"}
      </button>
    </section>
  );
}

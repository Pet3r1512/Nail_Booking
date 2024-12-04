import { MapPin } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto py-5 lg:py-8 flex items-center justify-between px-5 lg:px-0">
      <Sidebar />
      <p className="font-extrabold text-lg md:text-xl lg:text-3xl text-primary cursor-default">
        Nail.Booking
      </p>
      <p className="hidden lg:flex items-center gap-x-2 cursor-default font-semibold lg:text-lg">
        <MapPin /> 73/14 Đường Số 1, p.11, q.Gò Vấp
      </p>
    </header>
  );
}

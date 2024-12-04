import { MapPin } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto py-5 lg:py-8 flex items-center justify-between">
      <Sidebar />
      <p className="font-extrabold lg:text-3xl text-primary cursor-default">
        Nail.Booking
      </p>
      <p className="flex items-center gap-x-2 cursor-default font-semibold lg:text-lg">
        <MapPin /> 73/14 Đường Số 1, p.11, q.Gò Vấp
      </p>
    </header>
  );
}

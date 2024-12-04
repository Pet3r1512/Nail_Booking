import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Header from "./Header";
import { MapPin } from "lucide-react";

export default function Page({
  children,
  className,
  pageName,
}: {
  children: ReactNode;
  className?: string;
  pageName?: string;
}) {
  return (
    <main className="bg-[#f8f9fa] bg-cover bg-center h-full">
      <p className="flex items-center justify-center gap-x-2 cursor-default font-semibold text-sm lg:hidden py-2 bg-primary text-white">
        <MapPin /> 73/14 Đường Số 1, p.11, q.Gò Vấp
      </p>
      <Header />
      <section
        className={cn(
          "flex flex-col mx-auto max-w-[1440px] min-h-screen",
          pageName,
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-6 min-h-screen",
            className,
          )}
        >
          {children}
        </div>
      </section>
    </main>
  );
}

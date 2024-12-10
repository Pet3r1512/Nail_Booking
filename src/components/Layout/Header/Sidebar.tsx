import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="lg:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] w-2/3 !rounded-l-none rounded-r-xl px-5 py-12 flex flex-col gap-y-5">
        <div className="flex items-center gap-x-2.5 font-semibold text-lg">
          <p className="text-primary font-bold">Zalo </p>
          <p>0918234767</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

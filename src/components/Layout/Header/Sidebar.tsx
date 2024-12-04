import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="lg:hidden relative top-8 left-5">
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh] w-2/3 !rounded-l-none rounded-r-xl px-5 py-12 flex flex-col gap-y-5"></DrawerContent>
    </Drawer>
  );
}

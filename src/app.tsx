import BookingForm from "./components/Forms/_index";
import Page from "./components/Layout/Page";
import { ToastProvider } from "./components/ui/toast";

function App() {
  return (
    <ToastProvider>
      <Page className="flex items-center justify-center py-10">
        <BookingForm />
      </Page>
    </ToastProvider>
  );
}

export default App;

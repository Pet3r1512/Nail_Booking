import { create } from "zustand";

interface FormData {
  name: string;
  phoneNumber: string;
  date: string;
  time: "morning" | "afternoon";
}

interface FormStore {
  formData: FormData;
  updateField: (
    field: keyof FormData,
    value: string | "morning" | "afternoon",
  ) => void;
  readForm: () => FormData; // Method to read the current form data
}

export const useFormStore = create<FormStore>((set, get) => ({
  formData: {
    name: "",
    phoneNumber: "",
    date: "",
    time: "morning", // Default value for time
  },
  updateField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  readForm: () => {
    return get().formData;
  },
}));

import { create } from "zustand";

export const initFormData: FormData = {
  name: "",
  phoneNumber: "",
  date: "",
  time: "",
};

export type FormData = {
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
};

interface FormStore {
  formData: FormData;
  updateField: (
    field: keyof FormData,
    value: string | "morning" | "afternoon",
  ) => void;
  readForm: () => FormData;
}

export const useFormStore = create<FormStore>((set, get) => ({
  formData: initFormData,
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

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
  isFormValid: boolean; // Add this property to track form validity
  updateField: (
    field: keyof FormData,
    value: string | "morning" | "afternoon",
  ) => void;
  readForm: () => FormData;
}

export const useFormStore = create<FormStore>((set, get) => ({
  formData: initFormData,
  isFormValid: false, // Default to false until all fields are filled
  updateField: (field, value) => {
    set((state) => {
      const updatedFormData = { ...state.formData, [field]: value };

      // Check if all fields are filled
      const isValid =
        updatedFormData.name !== "" &&
        updatedFormData.phoneNumber !== "" &&
        updatedFormData.date !== "" &&
        updatedFormData.time !== "";

      return {
        formData: updatedFormData,
        isFormValid: isValid, // Update the form validity
      };
    });
  },
  readForm: () => {
    return get().formData;
  },
}));

import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description must be at least 6 characters"),
});

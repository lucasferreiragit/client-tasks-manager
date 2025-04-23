import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description must be at least 6 characters"),
});

export default function CreateNewTask() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignee: "",
      status: "pending",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const disabled = formik.isSubmitting || !formik.isValid;

  return (
    <form
      className="p-3 bg-gray-400/30 grid w-1/3 gap-4 rounded-md mx-auto min-h-[400px]"
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="title">Title</label>
      <input type="text" name="title" onChange={formik.handleChange} />
      {formik.errors.title && (
        <span className="text-red-500">{formik.errors.title}</span>
      )}
      <label htmlFor="description">Description</label>
      <input type="text" name="description" onChange={formik.handleChange} />
      {formik.errors.description && (
        <span className="text-red-500">{formik.errors.description}</span>
      )}
      <label htmlFor="assignee">Assignee</label>
      <input type="text" name="assignee" onChange={formik.handleChange} />
      {formik.errors.assignee && (
        <span className="text-red-500">{formik.errors.assignee}</span>
      )}
      <button
        type="submit"
        className={twMerge(
          "bg-blue-500 text-white p-2 rounded-md",
          disabled ? "opacity-50 cursor-not-allowed" : ""
        )}
        disabled={disabled}
      >
        Create
      </button>
    </form>
  );
}

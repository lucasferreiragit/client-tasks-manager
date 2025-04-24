import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
import { useCreateTask } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import {
  PRIORITY_OPTIONS,
  DEFAULT_TASK_FORM_VALUES,
} from "../constants/taskConstants";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description must be at least 6 characters"),
});

export default function CreateNewTask() {
  const {
    mutate: createTask,
    isPending,
    error,
    isSuccess,
    data,
  } = useCreateTask();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: DEFAULT_TASK_FORM_VALUES,
    validationSchema,
    onSubmit: (values) => {
      createTask(values);
    },
  });

  const disabled = formik.isSubmitting || !formik.isValid;
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess) {
    // navigate to the new task
    const newTask = data;
    navigate(`/task/${newTask.id}`);
  }
  return (
    <form
      className={twMerge(
        "p-3 bg-gray-400/30 grid w-1/3 gap-4 rounded-md mx-auto min-h-[400px]",
        isPending ? "opacity-50 cursor-not-allowed" : ""
      )}
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
      <label htmlFor="priority">Priority</label>
      <select
        name="priority"
        onChange={formik.handleChange}
        value={formik.values.priority}
        className="border rounded p-2"
      >
        {Object.entries(PRIORITY_OPTIONS).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
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

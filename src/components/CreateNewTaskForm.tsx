import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import { useCreateTask } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

import {
  PRIORITY_OPTIONS,
  DEFAULT_TASK_FORM_VALUES,
} from "../constants/taskConstants";
import { taskValidationSchema } from "../constants/validationSchemas";

const Label = ({
  children,
  htmlFor,
  ...props
}: {
  children: React.ReactNode;
  htmlFor: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm sm:text-md font-semibold cursor-pointer"
      {...props}
    >
      {children}
    </label>
  );
};

const ErrorMessage = ({
  error = "",
  touched = false,
}: {
  error?: string;
  touched?: boolean;
}) => {
  if (!touched || !error) return null;
  return (
    <span className="text-red-500 ml-2 text-sm min-h-[14px]">{error}</span>
  );
};

export default function CreateNewTaskForm() {
  const { mutate: createTask, isPending, error, isSuccess } = useCreateTask();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: DEFAULT_TASK_FORM_VALUES,
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      createTask(values);
    },
  });

  const disabled = formik.isSubmitting || !formik.isValid;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    navigate(`/`);
  }
  return (
    <form
      className={twMerge(
        "shadow-lg grid gap-4 rounded-md mx-auto md:w-[45%] w-[90%] min-h-[600px] p-8 sm:p-16 bg-neutral-50",
        isPending ? "opacity-50 cursor-not-allowed" : ""
      )}
      onSubmit={formik.handleSubmit}
    >
      <div className="grid gap-0.5">
        <Label htmlFor="title-input">Title</Label>
        <input
          id="title-input"
          type="text"
          name="title"
          placeholder="Enter a title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={twMerge(
            "w-full rounded-md text-gray-500 text-sm py-0 md:py-1 outline-none ml-1 px-2 shadow-sm",
            formik.touched.title && formik.errors.title
              ? "outline-red-300 outline-1"
              : ""
          )}
        />
        <ErrorMessage
          error={formik.errors.title}
          touched={formik.touched.title}
        />
      </div>

      <div className="grid">
        <Label htmlFor="description-input">Description</Label>
        <textarea
          id="description-input"
          name="description"
          placeholder="Describe your task"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={twMerge(
            "w-full rounded-md text-gray-500 text-sm py-1 outline-none shadow-sm ml-1 px-2",
            formik.touched.description && formik.errors.description
              ? "outline-red-300 outline-1"
              : ""
          )}
        />
        <ErrorMessage
          error={formik.errors.description}
          touched={formik.touched.description}
        />
      </div>

      <div className="grid ">
        <Label htmlFor="priority-select">Priority</Label>
        <select
          id="priority-select"
          className={twMerge(
            "w-full rounded-md text-gray-500 text-sm bg-white ml-1"
          )}
          name="priority"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.priority}
        >
          {Object.entries(PRIORITY_OPTIONS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end justify-centerw-[70%]">
        <button
          type="submit"
          className={twMerge(
            "bg-sky-400 text-white p-2 rounded-md max-h-[40px] flex-1",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          disabled={disabled}
        >
          Create
        </button>
      </div>
    </form>
  );
}

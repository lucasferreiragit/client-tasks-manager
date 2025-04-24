import { Calendar } from "lucide-react";
import { Task } from "../types";
import Divider from "./ui/Divider";
import { ToastContainer, toast } from "react-toastify";
import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { useState, useEffect } from "react";
import { PRIORITY_OPTIONS } from "../constants/taskConstants";
import DetailItem from "./DetailItem";
import { useUpdateTask } from "../hooks/useTasks";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import { taskValidationSchema } from "../constants/validationSchemas";

const STATUS_OPTIONS = [
  { value: "false", label: "Pending" },
  { value: "true", label: "Completed" },
] as const;

export default function TaskDetailsCard({ task }: { task: Task }) {
  console.log("🚀 > TaskDetailsCard > task ==> ", task);
  const { mutate: updateTask, isPending, error, status } = useUpdateTask();
  const [editingField, setEditingField] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: String(task.completed),
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      updateTask({
        ...task,
        ...values,
        completed: values.completed === "true" ? true : false,
      });
    },
  });
  console.log("🚀 > TaskDetailsCard > formik.values ==> ", formik.values);

  useEffect(() => {
    if (status === "error") {
      toast.error("Failed to update task");
    }
    if (status === "success") {
      setEditingField(null);
      toast.success("Task updated successfully");
    }
  }, [status]);

  const hasChanges =
    formik.values.title !== task.title ||
    formik.values.description !== task.description ||
    formik.values.priority !== task.priority ||
    formik.values.completed !== String(task.completed);

  console.log(formik.values);

  const handleDoubleClick = (field: string) => () => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="grid gap-2">
        <DetailItem
          label="Title"
          value={formik.values.title}
          isEditing={editingField === "title"}
          onDoubleClick={handleDoubleClick("title")}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          name="title"
          type="input"
          error={formik.touched.title && formik.errors.title}
        />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem
          label="Description"
          value={formik.values.description}
          isEditing={editingField === "description"}
          onDoubleClick={handleDoubleClick("description")}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          name="description"
          error={formik.touched.description && formik.errors.description}
        />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem
          label="Priority"
          value={<PriorityChip priority={formik.values.priority} />}
          isEditing={editingField === "priority"}
          onDoubleClick={handleDoubleClick("priority")}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          name="priority"
          type="select"
          options={Object.entries(PRIORITY_OPTIONS).map(([value, label]) => ({
            value,
            label,
          }))}
          error={formik.touched.priority && formik.errors.priority}
        />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem
          label="Status"
          value={<StatusChip completed={formik.values.completed === "true"} />}
          isEditing={editingField === "completed"}
          onDoubleClick={handleDoubleClick("completed")}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          name="completed"
          type="select"
          options={STATUS_OPTIONS}
          error={formik.touched.completed && formik.errors.completed}
        />
        <Divider />
      </div>
      <div className="grid grid-cols-[auto_1fr] items-start gap-2">
        <DetailItem
          label="Created At"
          value={new Date(task.createdAt).toLocaleString()}
          icon={<Calendar className="w-4 h-4 text-gray-500" />}
        />
      </div>
      {hasChanges && (
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isPending || !formik.isValid}
            className={twMerge(
              "px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
              (isPending || !formik.isValid) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
      <ToastContainer />
    </form>
  );
}

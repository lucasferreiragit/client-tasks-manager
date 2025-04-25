import { Calendar, Loader2, Trash2 } from "lucide-react";
import { Task } from "../types";
import Divider from "./ui/Divider";
import { toast } from "react-toastify";
import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { useState } from "react";
import { PRIORITY_OPTIONS } from "../constants/taskConstants";
import DetailItem from "./DetailItem";
import { useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import { taskValidationSchema } from "../constants/validationSchemas";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "false", label: "Pending" },
  { value: "true", label: "Completed" },
] as const;

export default function TaskDetailsCard({ task }: { task: Task }) {
  const navigate = useNavigate();
  const { mutate: updateTask, isPending: isUpdatePending } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeletePending } = useDeleteTask();
  const [editingField, setEditingField] = useState<string | null>(null);

  const isPending = isUpdatePending || isDeletePending;

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: String(task.completed),
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values) => {
      updateTask(
        {
          ...task,
          ...values,
          completed: values.completed === "true" ? true : false,
        },
        {
          onSuccess: () => {
            toast.success("Task updated successfully");
          },
          onError: () => {
            toast.error("Failed to update task");
          },
        }
      );
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id, {
        onSuccess: () => {
          toast.success("Task deleted successfully");
          navigate("/");
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      });
    }
  };

  const hasChanges =
    formik.values.title !== task.title ||
    formik.values.description !== task.description ||
    formik.values.priority !== task.priority ||
    formik.values.completed !== String(task.completed);

  const handleDoubleClick = (field: string) => () => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-4 relative"
    >
      <div className="grid gap-2 ">
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
          rawValue={formik.values.priority}
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
          value={
            <StatusChip
              completed={formik.values.completed === "true"}
              readonly
            />
          }
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
      <div className="grid gap-2">
        <DetailItem label="Id" value={task.id} isEditable={false} />
        <Divider />
      </div>

      <div className="grid grid-cols-[auto_1fr] items-start gap-2">
        <DetailItem
          label="Creation date"
          value={new Date(task.createdAt).toLocaleString()}
          icon={<Calendar className="w-4 h-4 text-gray-500" />}
          isEditable={false}
        />
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeletePending || isPending}
          className={twMerge(
            "px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
            isDeletePending || isPending ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {isDeletePending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
        {hasChanges && (
          <button
            type="submit"
            disabled={isPending || !formik.isValid || isDeletePending}
            className={twMerge(
              "px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
              isPending || !formik.isValid
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            {isPending && !isDeletePending ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </form>
  );
}

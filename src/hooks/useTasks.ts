import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/taskService";
import { Task } from "../types";

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (filters: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: taskService.getTasks,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (newTask) => {
      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(taskKeys.lists(), (oldTasks = []) => [
        ...oldTasks,
        newTask,
      ]);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: (updatedTask) => {
      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(taskKeys.lists(), (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: (_, id) => {
      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(taskKeys.lists(), (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== id)
      );
      queryClient.removeQueries({ queryKey: taskKeys.detail(id) });
    },
  });
};

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskItem } from '../utils/handle-api';

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;
  editingTask: TaskItem | null;
  isModalVisible: boolean;
  setTasks: (tasks: TaskItem[]) => void;
  setLoading: (loading: boolean) => void;
  setEditingTask: (task: TaskItem | null) => void;
  setModalVisible: (visible: boolean) => void;
  addTaskStore: (text: string, completed: boolean, dueDate: string | null) => void;
  updateTaskStore: (id: string, text: string, completed: boolean, dueDate: string | null) => void;
  deleteTaskStore: (id: string) => void;
  clearAllTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      loading: false,
      editingTask: null,
      isModalVisible: false,
      setTasks: (tasks) => set({ tasks }),
      setLoading: (loading) => set({ loading }),
      setEditingTask: (task) => set({ editingTask: task }),
      setModalVisible: (visible) => set({ isModalVisible: visible }),
      addTaskStore: (text, completed, dueDate) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            _id: Math.random().toString(36).substring(7),
            text,
            completed,
            dueDate
          }
        ]
      })),
      updateTaskStore: (id, text, completed, dueDate) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? { ...task, text, completed, dueDate } : task
        )
      })),
      deleteTaskStore: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id)
      })),
      clearAllTasks: () => set({ tasks: [] })
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
);
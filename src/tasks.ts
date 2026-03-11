import fs from "fs/promises";
import path from "path";
import { Task } from "./types";

const FILE_PATH = path.join(__dirname, "tasks.json");

async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}

export async function addTask(title: string): Promise<void> {
  const tasks = await loadTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(`Task added: ${title}`);
}
import { Injectable } from '@angular/core';
import { Todo } from './task.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  todosChanged = new EventEmitter<Todo[]>();
  private todos: Todo[] = [];

  constructor() { }

  /**
   * Returns the current list of todos.
   * @returns {Todo[]} The list of todos.
   */
  getTodos(): Todo[] {
    return this.todos;
  }

  /**
   * Adds a new task to the list of todos.
   * @param {string} title - The title of the task.
   * @param {string} priority - The priority of the task.
   * @param {string} description - The description of the task.
   */
  addTask(title: string, priority: string, description: string): void {
    if (title != "" && typeof priority != "undefined" && description != ""){
      let todo = new Todo(title, priority, description, false);
      this.todos.push(todo);
    }
    else alert("Verify that you entered the data correctly");
  }

  
  /**
   * Deletes a task from the list of todos.
   * @param {number} index - The index of the task to be deleted.
   */
  deleteTask(index: number): void {
    this.todos.splice(index, 1);
  }

  /**
   * Toggles the 'completed' status of a task.
   * @param {number} index - The index of the task to toggle.
   */
  toggleDone(index: number): void {
    this.todos[index].completed = !this.todos[index].completed;
  }

  /**
   * Marks all tasks in the list as done.
   */
  markAllAsDone(): void {
    const updatedTodos = this.todos.map(todo => ({ ...todo, completed: true }));
    this.todos = updatedTodos;
    this.todosChanged.emit(this.todos);
  }
  
  /**
   * Deletes all completed tasks from the list of todos.
   */
  deleteAllCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todosChanged.emit(this.todos);
  }
}

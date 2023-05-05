import { Todo } from '../task.model';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatSelectChange } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  todos: Todo[] = [];
  editingIndex: number | null = null;
  
  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.taskService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }
   
  ngOnInit(): void {
    this.todos = this.taskService.getTodos();
  }

  /**
   * Adds a task to the task list.
   * @param {string} title - The title of the task.
   * @param {string} priority - The priority of the task.
   * @param {string} description - The description of the task.
   */
  onAddTask(title: string, priority: string, description: string): void {
    this.taskService.addTask(title, priority, description);
  }

  clearInputs(titleInput: any, priorityInput: any, descriptionInput: any): void {
    titleInput.value = '';
    priorityInput.value = null;
    descriptionInput.value = '';
  }

  /**
   * Deletes a task from the task list.
   * @param {number} index - The index of the task to be deleted.
   */
  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
  }

  /**
   * Toggles the 'completed' status of a task.
   * @param {number} index - The index of the task to toggle.
   */
  toggleDone(index: number): void {
    this.taskService.toggleDone(index);
  }

  /**
   * Opens the edit task dialog and updates the task in the task list.
   * @param {number} index - The index of the task to edit.
   */
  editTask(index: number): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '400px',
      height: '420px',
      data: this.todos[index],
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  /**
   * Marks all tasks as done.
   */
  markAllAsDone(): void {
    this.taskService.markAllAsDone();
  }
  
  /**
   * Deletes all completed tasks from the task list.
   */
  deleteAllCompleted(): void {
    this.taskService.deleteAllCompleted();
  }
  
  /**
   * Sorts the task list based on the selected option.
   * @param {MatSelectChange} event - The event containing the selected sorting option.
   * @param {MatSelect} selectComponent - The MatSelect component instance.
   */
  onSortChange(event: MatSelectChange, selectComponent: MatSelect): void {
    const sortBy = event.value;
    switch (sortBy) {
      case 'completed':
        this.todos.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
        break;
      case 'priority':
        this.todos.sort((a, b) => {
          if (a.priority === b.priority) {
            return 0;
          }
          if (a.priority === 'High') {
            return -1;
          }
          if (a.priority === 'Low') {
            return 1;
          }
          if (a.priority === 'Medium') {
            return b.priority === 'High' ? 1 : -1;
          }
          return 0;
        });
        break;
    }
    selectComponent.value = null;
  }
}
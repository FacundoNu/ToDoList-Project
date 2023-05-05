import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() todo: any;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Emits the 'delete' event for the parent component to handle.
   */
  deleteTodo(): void {
    this.delete.emit();
  }

  /**
   * Emits the 'edit' event for the parent component to handle.
   */
  editTodo(): void {
    this.edit.emit();
  }
}



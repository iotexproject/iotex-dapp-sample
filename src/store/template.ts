import { makeAutoObservable } from 'mobx';

export class TodoStore {
  todos = [
    { id: 1, text: 'Buy eggs', completed: true },
    { id: 2, text: 'Write a post', completed: false }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(text: string) {
    this.todos.push({ id: this.todos.length + 1, text, completed: false });
  }
  toggleTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }
  get remainingTodos(): number {
    return this.todos.filter((t) => !t.completed).length;
  }
}

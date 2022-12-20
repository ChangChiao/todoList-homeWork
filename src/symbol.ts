import { InjectionKey } from 'vue';
import { Todo } from "./types/todo";

export const TodoList: InjectionKey<Todo[]> = Symbol('Todo');
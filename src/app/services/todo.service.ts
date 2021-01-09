import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  today = new Date();
  todos: Todo[];
  todoSubject = new Subject<any[]>();
  urlBdd = environment.urlBdd;

  constructor(private httpClient: HttpClient){
    this.getTodoFromServer();
  }

  emitTodos(){
    this.todoSubject.next(this.todos); //.next() permet d'envoyer une valeur à notre observable
    }

  onChangeStatus(i: number){
    this.todos[i].todoStatus = !this.todos[i].todoStatus;
    this.emitTodos();
    this.saveTodoFromServer(); //Chaque fois que les données sont modifié "emitTodos()" sera appelé.
  }

  onChangeIsModif(i: number){
    this.todos[i].isModif = !this.todos[i].isModif;
    this.emitTodos();
    this.saveTodoFromServer(); //Chaque fois que les données sont modifié "emitTodos()" sera appelé.
  }

  getTodo(index: number){
    if(this.todos[index]){
      return this.todos[index];
    }
    return false;
  }


  addTodo(todo: Todo): void{
    this.todos.unshift(todo); //unshift ajoute le todo au début du tableau //.push ajoute un élément à la fin dans todos à chaque appel de addTodo
    this.emitTodos(); //Appel de emitTodos() pour mettre à jour le tableau
    this.saveTodoFromServer(); //Chaque fois que les données sont modifié "emitTodos()" sera appelé.
  }

  saveTodoFromServer(){
    this.httpClient.put(this.urlBdd, this.todos) //Ce service va nous retourner un observable
    .subscribe(
      () => {
        console.log("Données enregistrées avec succès");
      },
      (error) => {
        console.log("Erreur de sauvegarde : ", error);
      }
    );
  }

  getTodoFromServer(): void{
    this.httpClient.get<Todo[]>(this.urlBdd)
    .subscribe(
      (todoRecup: Todo[]) => {
        this.todos = todoRecup; //Mise des données dans le tableau des données this.todos qui est un tableau.
        this.emitTodos(); //Emettre les données pour indiqué qu'il y a eu une modifcation
      },
      (error) => {
        console.log("Erreur de récupération des données : ", error);
      },
      () => {
        console.log("Récupération des données terminées.");
      }
    )
  }
}

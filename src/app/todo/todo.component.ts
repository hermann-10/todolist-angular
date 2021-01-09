import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  today;
  todos;
  todosSub : Subscription;

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.today = this.todoService.today;
    this.todosSub = this.todoService.todoSubject.subscribe(//pour récupérer l'observable
      (value: any[]) => {
        this.todos = value;
      },
      (error) => {
        console.log("Erreur: ", error);
      },
      () => {
        console.log("Observable complétée");
      }
    );
    this.todoService.emitTodos();
  }

  onChangeStatus(i){
    this.todoService.onChangeStatus(i);
  }

  onChangeIsModif(i){
    this.todoService.onChangeIsModif(i);
  }

  onView(id: number){
    this.router.navigate(["single-todos", id]);
  }

  ngOnDestroy(){
    this.todosSub.unsubscribe(); //on se désabonne
  }

}

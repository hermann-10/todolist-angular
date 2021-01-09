import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css']
})
export class SingleTodoComponent implements OnInit {

  todo;
  error;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; //Car j'ai nommé "id" dans app.module dans la const Route
    this.todo = this.todoService.getTodo(+id); //Pour transofmrer l'id en type numerique j'ajoute un "+"
    if(!this.todo){
      this.error = "Identifiant incorrect";
    }
  }

  goBack(){
    this.router.navigate(["/todos"]);
  }

}

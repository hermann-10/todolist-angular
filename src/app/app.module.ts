import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';

export const ROUTES: Routes = [
  { path:'home', component: HomeComponent },
  { path:'todos', component: TodoComponent },
  { path:'not-found', component: NotFoundComponent },
  { path:'contact', component: ContactComponent },
  { path:'users', component: UsersComponent },
  { path:'add-user', component: AddUserComponent },
  { path:'add-todo', component: AddTodoComponent },
  { path:'single-todos/:id', component: SingleTodoComponent },
  { path:'', component: HomeComponent },
  { path:'**', pathMatch:'full', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoComponent,
    AddTodoComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

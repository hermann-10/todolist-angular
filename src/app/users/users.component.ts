import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];
  usersSubscription: Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    //this.users = this.userService.users;
    this.usersSubscription = this.userService.usersSub.subscribe(
      (usersRecup: User[]) => {
        console.log("userRecup", usersRecup)
        this.users = usersRecup;
      }
    );
    this.userService.emitUsers();
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}

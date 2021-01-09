import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm(){
    this.userForm = this.fb.group({
      firstname: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      lastname: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      email: this.fb.control("",[Validators.required, Validators.minLength(5)]),
      description: this.fb.control("",[Validators.required, Validators.minLength(5)]),
      dateBirth: this.fb.control("",[Validators.required, Validators.minLength(5)]),
      address: this.fb.group({
        street: this.fb.control("",[Validators.required]),
        state: this.fb.control("",[Validators.required]),
        codezip: this.fb.control("",[Validators.required]),
        city: this.fb.control("",[Validators.required]),
      }),
      aliases: this.fb.array([]),
    });
  }

  getAliases(): FormArray{
    return this.userForm.get("aliases") as FormArray;
  }

  addAliases(): void{
    this.getAliases().push(this.fb.control("",Validators.required));
  }

  onSubmit(): void{
    const dataUser = this.userForm.value;

    const address = new Address(dataUser.street,dataUser.city,dataUser.state,dataUser.city);
    const alias = dataUser.aliases ? dataUser.aliases : [];
    const newUser = new User(
          dataUser.firstname,
          dataUser.lastname,
          dataUser.email,
          dataUser.address,
          dataUser.description,
          dataUser.dateBirth,
          alias);
    this.userService.addUser(newUser);
    this.router.navigate(["users"]);
  }

}

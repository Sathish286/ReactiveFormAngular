import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactiveform';
  genders = ['male', 'female'];
  forBiddenUserName = ['sathish','Velmurugan']
  signUpForm:FormGroup

  ngOnInit(){
    this.signUpForm=new FormGroup({
      'username':new FormControl(null,[Validators.required,Validators.minLength(3),this.forbiddenNames.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'gender':new FormControl(null),
      'hobbies':new FormArray([])
    })
  }
  onSubmit(){
    console.log(this.signUpForm)
   
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control)
  }
  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

forbiddenNames(control:FormControl) : { [s:string]: Boolean}{
  if(this.forBiddenUserName.indexOf(control.value)!==-1){
    return {'forbiddenName':true};
  }
  return null;
}
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private apiURL = 'https://api.graph.cool/simple/v1/ck01jw54u1xi001430x42mpag'

  constructor(
    private http: HttpClient
  ){
    this.createUser();
    this.allUsers();
  }
  allUsers(): void{
    const body = {
      query: `
        query{
          allUsers{
            id
            name
            email
          }
        }
      `
    };
    this.http.post(this.apiURL, body)
      .subscribe(res => console.log('Query:', res))

  }
  createUser(): void{
    const body = {
      query: `
        mutation CreateNewUser($name: String!, $email: String!, $password: String!){
          createUser(name: $name, email: $email, password: $password, ){
            id
            name
            email
          }
        }
      `,
      variables: {
        name: 'Predator',
        email: "predatorvsalien@predator.com",
        password: "urrrhh"
      }
    };
    this.http.post(this.apiURL, body)
      .subscribe(res => console.log('Mutation: ', res));
  }
}

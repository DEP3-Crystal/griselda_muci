import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../model/Dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
    private http: HttpClient
  ) {

  }

  getDogs() {
    return this.http.get('http://localhost:3000/dogs') as Observable<Dog[]>
  }

  deleteDog(id: string) {
    return this.http.delete('http://localhost:3000/dogs/'+ id) as Observable<Dog>
  }

  updateDog(dog: Dog) {
    return this.http.put('http://localhost:3000/dogs/'+ dog.id, dog) as Observable<Dog>
  }



}

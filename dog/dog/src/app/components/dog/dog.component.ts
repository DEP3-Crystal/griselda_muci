import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dog } from 'src/app/model/Dog';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit, OnDestroy {

  @Input()
  dog: Dog = new Dog();

  @Output()
  getDogsEvent = new EventEmitter<string>();
  
  @Output()
  editDogsEvent = new EventEmitter<Dog>();

  dogDeleteSubscription = new Subscription();
  constructor(
    private dogService: DogService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.dogDeleteSubscription) {
      this.dogDeleteSubscription.unsubscribe();
    }
  }

  deleteDog() {
    this.dogDeleteSubscription = this.dogService.deleteDog(this.dog.id ? this.dog.id : '').subscribe(() => {
      this.triggerGetDogs();
    })
  }

  triggerEditDog() {
    this.editDogsEvent.emit(this.dog);
  }
  
  triggerGetDogs() {
    this.getDogsEvent.emit('');
  }

}

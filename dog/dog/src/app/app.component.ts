import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Dog } from './model/Dog';
import { Trans } from './model/Trans';
import { DogService } from './services/dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  dogSubscription = new Subscription();
  dogUpdateSubscription = new Subscription();
  dogList: Dog[] = [];
  selectedDogId: string = '';

  dogExample = {
    name: 'example',
    img: 'asdasd'
  }

  dogForm = new FormGroup({
    name: new FormControl(''),
    img: new FormControl(''),
  });

  constructor(
    private dogService: DogService
  ) {
  }

  ngOnInit() {

    this.getDogs();

  }

  getDogs() {
    this.dogSubscription = this.dogService.getDogs().subscribe((response) => {
      console.log(response);
      this.dogList = response;
    });
  }

  editDog(dog: Dog) {
    this.dogForm.controls.name.setValue(dog.name);
    this.dogForm.controls.img.setValue(dog.img);
    this.selectedDogId = dog.id ? dog.id : '';
  }

  updateDog() {
    const dog: Dog = {
      id: this.selectedDogId,
      name: this.dogForm.controls.name.value ? this.dogForm.controls.name.value : '',
      img: this.dogForm.controls.img.value ? this.dogForm.controls.img.value : '',
    }

    this.dogUpdateSubscription = this.dogService.updateDog(dog).subscribe(() => {
      this.getDogs();
    })
  }

  ngOnDestroy(): void {
    this.dogSubscription.unsubscribe();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { InterestApiService } from '../services/interest-api.service';
import { ShowInterestComponent } from './show-interest/show-interest.component';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  interests: any = [];

  @ViewChild(ShowInterestComponent) private showInterestComponent!: ShowInterestComponent;

  constructor(private interestService: InterestApiService) { }

  ngOnInit(): void {
    this.interestService.getInterestList().subscribe(interests => {
      this.interests = interests;
    }, error => {
      console.log(error);
    });
  }

  emitInterests(interests:any): void {
    this.interests = interests;
    this.showInterestComponent.ngOnInit();
  }
}
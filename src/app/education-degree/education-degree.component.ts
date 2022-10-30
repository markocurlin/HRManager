import { Component, OnInit, ViewChild } from '@angular/core';
import { EducationDegreeApiService } from '../services/education-degree-api.service';
import { ShowEducationDegreeComponent } from './show-education-degree/show-education-degree.component';

@Component({
  selector: 'app-education-degree',
  templateUrl: './education-degree.component.html',
  styleUrls: ['./education-degree.component.css']
})
export class EducationDegreeComponent implements OnInit {
  educationDegrees: any;

  @ViewChild(ShowEducationDegreeComponent) private showEducationDegreeComponent!: ShowEducationDegreeComponent;

  constructor(private educationDegreeService: EducationDegreeApiService) { }

  ngOnInit(): void {
    this.educationDegreeService.getEducationDegreeList().subscribe(educationDegrees => {
      this.educationDegrees = educationDegrees;
    }, error => {
      console.log(error);
    });
  }

  emitEducationDegrees(educationDegrees:any): void {
    this.educationDegrees = educationDegrees;
    this.showEducationDegreeComponent.ngOnInit();
  }
}
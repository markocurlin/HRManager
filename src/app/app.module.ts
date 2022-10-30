import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateApiService } from './services/candidate-api.service';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { FindCandidateComponent } from './candidate/find-candidate/find-candidate.component';
import { ShowCandidateComponent } from './candidate/show-candidate/show-candidate.component';
import { EditCandidateComponent } from './candidate/edit-candidate/edit-candidate.component';
import { AdminComponent } from './admin/admin.component';
import { EditInterviewComponent } from './interview/edit-interview/edit-interview.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { AlertComponent } from './alert/alert.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowInterviewComponent } from './interview/show-interview/show-interview.component';
import { CoreModule } from './core/core.module';
import { SigninRedirectCallbackComponent } from './home/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './home/signout-redirect-callback.component';
import { UnauthorizedComponent } from './home/unauthorized.component';
import { AddInterviewComponent } from './interview/add-interview/add-interview.component';
import { AddUserComponent } from './admin/user/add-user/add-user.component';
import { ShowUserComponent } from './admin/user/show-user/show-user.component';
import { SortableHeader } from './sortable-header/sortable-header';
import { AddInterestComponent } from './position/add-interest/add-interest.component';
import { ShowInterestComponent } from './position/show-interest/show-interest.component';
import { ShowEducationDegreeComponent } from './education-degree/show-education-degree/show-education-degree.component';
import { AddEducationDegreeComponent } from './education-degree/add-education-degree/add-education-degree.component';
import { InterestComponent } from './position/interest.component';
import { EducationDegreeComponent } from './education-degree/education-degree.component';
import { WorkingPlaceComponent } from './working-place/working-place.component';
import { AddWorkingPlaceComponent } from './working-place/add-working-place/add-working-place.component';
import { ShowWorkingPlaceComponent } from './working-place/show-working-place/show-working-place.component';
import { NgbDateCustomParserFormatter } from './date-fromatter/ngb-date-custom-parser-formatter';

@NgModule({
  declarations: [
    AppComponent,
    AddCandidateComponent,
    FindCandidateComponent,
    ShowCandidateComponent,
    EditCandidateComponent,
    AdminComponent,
    EditInterviewComponent,
    EditUserComponent,
    AlertComponent,
    ShowInterviewComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    UnauthorizedComponent,
    AddInterviewComponent,
    AddUserComponent,
    ShowUserComponent,
    SortableHeader,
    AddInterestComponent,
    ShowInterestComponent,
    ShowEducationDegreeComponent,
    AddEducationDegreeComponent,
    InterestComponent,
    EducationDegreeComponent,
    WorkingPlaceComponent,
    AddWorkingPlaceComponent,
    ShowWorkingPlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CoreModule,
  ],
  providers: [
    CandidateApiService,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
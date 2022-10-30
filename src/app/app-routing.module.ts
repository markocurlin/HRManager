import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { FindCandidateComponent } from './candidate/find-candidate/find-candidate.component';
import { EditCandidateComponent } from './candidate/edit-candidate/edit-candidate.component';
import { ShowCandidateComponent } from './candidate/show-candidate/show-candidate.component';
import { EditInterviewComponent } from './interview/edit-interview/edit-interview.component';
import { EditUserComponent } from './admin/user/edit-user/edit-user.component';
import { EducationDegreeComponent } from './education-degree/education-degree.component';
import { InterestComponent } from './position/interest.component';
import { WorkingPlaceComponent } from './working-place/working-place.component';
import { SigninRedirectCallbackComponent } from './home/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './home/signout-redirect-callback.component';
import { UnauthorizedComponent } from './home/unauthorized.component';
import { AdminRouteGuard } from './core/admin-route-guard';
import { EditRouteGuard } from './core/edit-route-guard';
import { RouteGuard } from './core/route-guard';

const routes: Routes = [
  { path: 'add-candidate-page', component: AddCandidateComponent, canActivate: [EditRouteGuard] },
  { path: 'show-candidate-page/:pageNumber/:sortOrder', component: ShowCandidateComponent, canActivate: [RouteGuard] },
  { path: 'find-candidate-page', component: FindCandidateComponent, canActivate: [RouteGuard] },
  { path: 'edit-candidate-page/:id', component: EditCandidateComponent, canActivate: [RouteGuard] },
  { path: 'edit-interview-page/:id', component: EditInterviewComponent, canActivate: [EditRouteGuard] },
  { path: 'admin-page/:pageNumber/:sortOrder', component: AdminComponent, canActivate: [AdminRouteGuard] },
  { path: 'education-degree-page/:pageNumber/:sortOrder', component: EducationDegreeComponent, canActivate: [AdminRouteGuard] },
  { path: 'interest-page/:pageNumber/:sortOrder', component: InterestComponent, canActivate: [AdminRouteGuard] },
  { path: 'working-place-page/:pageNumber/:sortOrder', component: WorkingPlaceComponent, canActivate: [AdminRouteGuard] },
  { path: 'edit-user-page/:id', component: EditUserComponent, canActivate: [AdminRouteGuard] },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
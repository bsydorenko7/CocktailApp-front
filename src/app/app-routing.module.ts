import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ModeratorComponent} from "./moderatorRegistration/moderator.component";
import {ModeratorVerificationComponent} from "./moderatorVerification/moderator.verification.component";
import {ModeratorPersonalComponent} from "./moderatorPersonal/moderator.personal.component";
import {ConfirmUserComponent} from "./registration/confirmUserComponent";
import {SearchfriendComponent} from "./searchfriend/searchfriend.component";
import {AuthService} from "./auth/auth.service";
import {RoleGuardGuard} from "./auth/role-guard.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'moderator',
    component: ModeratorComponent,
    canActivate: [RoleGuardGuard],
    data:{
      expectedRoles: ['Admin']
    }
  },
  {
    path: 'moderator/verification',
    component: ModeratorVerificationComponent
  },
  {
    path: 'moderator/edit',
    component: ModeratorPersonalComponent,
    canActivate: [RoleGuardGuard],
    data:{
      expectedRoles: ['Admin']
    }
  },
  {
    path: 'searchfriend',
    component: SearchfriendComponent,
    canActivate: [RoleGuardGuard],
    data:{
      expectedRoles: ['Confirmed']
    }
  },
  {
    path: "registration/verification",
    component: ConfirmUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

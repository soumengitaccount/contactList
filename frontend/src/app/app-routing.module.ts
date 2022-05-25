import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { ConntactListComponent } from './contact/conntact-list/conntact-list.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  {path:'', redirectTo: 'contacts', pathMatch: 'full'},
  {path:'contacts', component: ConntactListComponent, canActivate:[AuthGuard]},
  {path:'add-contacts', component: AddContactComponent, canActivate:[AuthGuard]},
  {path:'edit-contact/:id', component: EditContactComponent, canActivate:[AuthGuard]},
  {path:'sign-up', component: RegistrationComponent},
  {path:'sign-in', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

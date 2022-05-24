import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { ConntactListComponent } from './contact/conntact-list/conntact-list.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';

const routes: Routes = [

  {path:'', redirectTo: 'contacts', pathMatch: 'full'},
  {path:'contacts', component: ConntactListComponent},
  {path:'add-contacts', component: AddContactComponent},
  {path:'edit-contact/:id', component: EditContactComponent},
  {path:'sign-up', component: RegistrationComponent},
  {path:'sign-in', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

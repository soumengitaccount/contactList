import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConntactListComponent } from './contact/conntact-list/conntact-list.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterContactPipe } from './pipes/filter-contact.pipe';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ContactService } from './service/contact.service';
@NgModule({
  declarations: [
    AppComponent,
    ConntactListComponent,
    AddContactComponent,
    FilterContactPipe,
    EditContactComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers: [AuthService, AuthGuard, ContactService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

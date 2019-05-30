import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { ForgotPaswordComponent } from './components/forgot-pasword/forgot-pasword.component';
import { SigUpComponent } from './components/sig-up/sig-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
  { path: 'sign-in', component: SigInComponent },
  { path: 'register-user' , component: SigUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPaswordComponent },
  { path: 'verify-email-adress', component: VerifyEmailComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'books-list', component: BookListComponent   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

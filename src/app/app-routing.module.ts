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
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
  { path: 'sign-in', component: SigInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user' , component: SigUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPaswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-adress', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'edit-book/:id', component: EditBookComponent,canActivate: [AuthGuard] },
  { path: 'books-list', component: BookListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

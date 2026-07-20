import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Root } from './components/root/root';
import { Home } from './components/home/home';
import { Jobs } from './components/jobs/jobs';
import { Contact } from './components/contact/contact';

const routes: Routes = [
  {
    path: '', component: Root,
    children: [
      {path:'home', component: Home},
      {path:'jobs', component: Jobs},
      {path:'contact', component: Contact},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

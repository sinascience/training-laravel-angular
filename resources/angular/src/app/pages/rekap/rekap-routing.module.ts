import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RekapMenuComponent } from './components/rekap-menu/rekap-menu.component';


const routes: Routes = [
    { path: 'menu', component: RekapMenuComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RekapRoutingModule { }
import { TranslateSentencesComponent } from './translate-sentences/translate-sentences.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'menu', component: MenuComponentComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'translateSentences', component:  TranslateSentencesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

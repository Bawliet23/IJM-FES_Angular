import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {LoginGuard} from "../guard/login.guard";
import {IsSignedInGuard} from "../guard/is-signed-in.guard";
import {EtudiantsComponent} from "./etudiants/list/etudiants.component";
import {EtudiantCreateComponent} from "./etudiants/etudiant-create/etudiant-create.component";
import {ActivitesListComponent} from "./activites/activites-list/activites-list.component";
import {ActiviteCreateComponent} from "./activites/activite-create/activite-create.component";
import {EtudiantDetailsComponent} from "./etudiants/etudiant-details/etudiant-details.component";
import {ProfListComponent} from "./prof/prof-list/prof-list.component";
import {ProfCreateComponent} from "./prof/prof-create/prof-create.component";
import {ProfDetailsComponent} from "./prof/prof-details/prof-details.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ActiviteDetailsComponent} from "./activites/activite-details/activite-details.component";
import {ActiviteAddEtudiantsComponent} from "./activites/activite-add-etudiants/activite-add-etudiants.component";
import {PaimentsListComponent} from "./paiments/paiments-list/paiments-list.component";
import {PaimentCreateComponent} from "./paiments/paiment-create/paiment-create.component";
import {PaimentEditComponent} from "./paiments/paiment-edit/paiment-edit.component";
import {MatieresListComponent} from "./matieres/matieres-list/matieres-list.component";
import {MatiereCreateComponent} from "./matieres/matiere-create/matiere-create.component";
import {MatiereDetailsComponent} from "./matieres/matiere-details/matiere-details.component";
import {ExamensListComponent} from "./examens/examens-list/examens-list.component";
import {ActiviteAddHoraireComponent} from "./activites/activite-add-horaire/activite-add-horaire.component";
import {ProfAddHoraireComponent} from "./prof/prof-add-horaire/prof-add-horaire.component";
import {SallesListComponent} from "./Salles/salles-list/salles-list.component";
import {ExamCreateComponent} from "./examens/exam-create/exam-create.component";
import {ExamEditComponent} from "./examens/exam-edit/exam-edit.component";
import {ExamNotesComponent} from "./examens/exam-notes/exam-notes.component";
import {UtilisateursListComponent} from "./utilisateurs/utilisateurs-list/utilisateurs-list.component";

const routes: Routes = [
  {path: '',canActivate:[LoginGuard],children:[
      {path: '',component: HomeComponent},
      {path: 'home',component: HomeComponent},
      {path:'etudiants',children:[
          {path: '',component: EtudiantsComponent},
          {path: 'create',component: EtudiantCreateComponent},
          {path: ':id',component: EtudiantDetailsComponent},
        ]
      },
      {path:'professeurs',children:[
          {path: '',component: ProfListComponent},
          {path: 'create',component: ProfCreateComponent},
          {path: ':cin',component: ProfDetailsComponent},
          {path: ':cin/horaires/add',component: ProfAddHoraireComponent},
        ]
      },
      {path:'activites',children:[
          {path: '',component: ActivitesListComponent},
          {path: 'create',component: ActiviteCreateComponent},
          {path: ':id',component: ActiviteDetailsComponent},
          {path: ':id/etudiants/add',component: ActiviteAddEtudiantsComponent},
          {path: ':id/horaires/add',component: ActiviteAddHoraireComponent},
        ]
      },
      {path:'paiments',children:[
          {path: '',component: PaimentsListComponent},
          {path: 'create',component:PaimentCreateComponent},
          {path: ':id/edit',component:PaimentEditComponent}
        ]
      },
      {path:'matieres',children:[
          {path: '',component: MatieresListComponent},
          {path: 'create',component:MatiereCreateComponent},
          {path: ':nom',component:MatiereDetailsComponent}
        ]
      },
      {path:'examens',children:[
          {path: '',component: ExamensListComponent},
          {path: 'create',component:ExamCreateComponent},
          {path: ':id/edit',component:ExamEditComponent},
          {path: ':id/notes',component:ExamNotesComponent}
        ]
      },
      {path:'salles',children:[
          {path: '',component: SallesListComponent},
        ]
      },
      {path:'utilisateurs',children:[
          {path: '',component: UtilisateursListComponent},
        ]
      }
    ]},
  {path: '404', component: NotFoundComponent},
  {path: 'login',component: AuthComponent,canActivate:[IsSignedInGuard]},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

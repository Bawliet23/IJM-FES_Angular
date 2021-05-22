import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "../services/http-interceptor.service";
import {LoginGuard} from "../guard/login.guard";
import { EtudiantsComponent } from './etudiants/list/etudiants.component';
import { EtudiantCreateComponent } from './etudiants/etudiant-create/etudiant-create.component';
import { ActivitesListComponent } from './activites/activites-list/activites-list.component';
import { ActiviteCreateComponent } from './activites/activite-create/activite-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { EtudiantDetailsComponent } from './etudiants/etudiant-details/etudiant-details.component';
import { ProfListComponent } from './prof/prof-list/prof-list.component';
import { ProfCreateComponent } from './prof/prof-create/prof-create.component';
import { ProfDetailsComponent } from './prof/prof-details/prof-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ActiviteDetailsComponent } from './activites/activite-details/activite-details.component';
import {LoaderInterceptorService} from "../services/LoaderInterceptorService";
import { LoaderComponent } from './loader/loader.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ActiviteAddEtudiantsComponent } from './activites/activite-add-etudiants/activite-add-etudiants.component';
import { PaimentsListComponent } from './paiments/paiments-list/paiments-list.component';
import { PaimentCreateComponent } from './paiments/paiment-create/paiment-create.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { PaimentEditComponent } from './paiments/paiment-edit/paiment-edit.component';
import { MatieresListComponent } from './matieres/matieres-list/matieres-list.component';
import { MatiereCreateComponent } from './matieres/matiere-create/matiere-create.component';
import { MatiereDetailsComponent } from './matieres/matiere-details/matiere-details.component';
import { ExamensListComponent } from './examens/examens-list/examens-list.component';
import { ActiviteAddHoraireComponent } from './activites/activite-add-horaire/activite-add-horaire.component';
import { ProfAddHoraireComponent } from './prof/prof-add-horaire/prof-add-horaire.component';
import { SallesListComponent } from './Salles/salles-list/salles-list.component';
import { ExamCreateComponent } from './examens/exam-create/exam-create.component';
import { ExamEditComponent } from './examens/exam-edit/exam-edit.component';
import { ExamNotesComponent } from './examens/exam-notes/exam-notes.component';
import { UtilisateursListComponent } from './utilisateurs/utilisateurs-list/utilisateurs-list.component';
import { MenuComponent } from './menu/menu.component';
import { CaisseComponent } from './charts/caisse/caisse.component';
import { ChartsModule } from 'ng2-charts';
import { SpinnerOverlayComponentComponent } from './spinner-overlay-component/spinner-overlay-component.component';
import { SpinnerOverlayService } from 'src/services/spinner-overlay-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    EtudiantsComponent,
    EtudiantCreateComponent,
    ActivitesListComponent,
    ActiviteCreateComponent,
    EtudiantDetailsComponent,
    ProfListComponent,
    ProfCreateComponent,
    ProfDetailsComponent,
    NotFoundComponent,
    ActiviteDetailsComponent,
    LoaderComponent,
    ActiviteAddEtudiantsComponent,
    PaimentsListComponent,
    PaimentCreateComponent,
    PaimentEditComponent,
    MatieresListComponent,
    MatiereCreateComponent,
    MatiereDetailsComponent,
    ExamensListComponent,
    ActiviteAddHoraireComponent,
    ProfAddHoraireComponent,
    SallesListComponent,
    ExamCreateComponent,
    ExamEditComponent,
    ExamNotesComponent,
    UtilisateursListComponent,
    MenuComponent,
    CaisseComponent,
    SpinnerOverlayComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ChartsModule,MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class Activite {

  id:number;
  nom:string;
  description:string;
  gratuit:boolean;
  type:string;//groupe or individu

  private Salle:any;
  private TypeEtudiant:any;
  niveau_id:any;
  matiere_id:any;
  matiere: any;
  niveau: any;
  typeEtudiant: any;
  prixEnfant: any;
  prixAdult: any;
  prof: any;
  horaires: null;

  constructor(){}
}

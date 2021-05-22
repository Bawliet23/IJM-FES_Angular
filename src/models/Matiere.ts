export class Matiere {

  nom:String;
  description:String;
  prixEnfant:number;
  prixAdult:number;
  photo:any;
  niveaux:any

  constructor(nom: String) {
    this.nom = nom;
  }
}

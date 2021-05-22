export class Prof {

  cin:string;
  nom:string;
  prenom:string;
  dateNaissance:any;
  age:number;
  adresse:string;
  tele:string;
  email:string;
  diplomes:string;


  constructor(cin: string, nom: string, prenom: string, dateNaissance: any, adresse: string, tele: string, email: string, diplomes: string) {
    this.cin = cin;
    this.nom = nom;
    this.prenom = prenom;
    this.dateNaissance = dateNaissance;
    this.adresse = adresse;
    this.tele = tele;
    this.email = email;
    this.diplomes = diplomes;
  }
}

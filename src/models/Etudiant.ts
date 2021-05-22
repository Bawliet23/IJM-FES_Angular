import {Type} from "./Type";

export class Etudiant {

  id:number;
  numero:number;
  nom:string;
  nomArabe:string;
  prenom:string;
  prenomArabe:string;
  dateNaissance:any;
  metier:string;
  age:number;
  adresse:string;
  remarque:string;
  tele1:string;
  tele2:string;
  photo:any;
  dateInscription:any;
  type:any;
  notes:any;
  paiments:any;

  constructor(id: number, numero: number, metier:string, remarque:string,nom: string, nomArabe: string, prenom: string, prenomArabe: string, dateNaissance: any, adresse: string, tele1: string, tele2: string, photo: any, dateInscription: any, type: any) {
    this.id = id;
    this.numero = numero;
    this.nom = nom;
    this.nomArabe = nomArabe;
    this.prenom = prenom;
    this.prenomArabe = prenomArabe;
    this.dateNaissance = dateNaissance;
    this.metier=metier;
    this.remarque=remarque;
    this.adresse = adresse;
    this.tele1 = tele1;
    this.tele2 = tele2;
    this.photo = photo;
    this.dateInscription = dateInscription;
    this.type = type;
  }

}

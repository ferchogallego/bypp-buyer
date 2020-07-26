import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';
import { User } from 'firebase';
import { FileI } from '../shared/file.interface';
import { finalize } from 'rxjs/operators';
import { CompanyI } from '../shared/company.interface';
import { UserI } from '../shared/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private filePath: any;
  private downloadURL: string;
  public user: User;
  private orderCollection: AngularFirestoreCollection<User>;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: AngularFireStorage,
              private http: HttpClient) { }

  login(email: string, password: string){
    try{
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  register(email: string, password: string){
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  createUserData(id: string, user: any){
    return this.db.collection<User>('users').doc(id).set(user);
  }

  logout(){
    try {
      this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  loadUserData(id: any, datos: any, tipo: string){
    if (tipo === 'buyerPerson') {
      const prodObj: UserI = {
        uid: datos.uid,
        email: datos.email,
        name: datos.name,
        document: datos.document,
        numDocument: datos.numDocument,
        imgDocument: this.downloadURL,
        address: datos.address,
        city: datos.city,
        country: datos.country,
        phone: datos.phone,
        roll: tipo,
        fileRef: this.filePath,
        relationship: 'Independent'
      };
      return this.db.collection('users').doc(id).set(prodObj);
    }
    if (tipo === 'buyerCompany') {
      const prodObj: CompanyI = {
        uid: datos.uid,
        email: datos.email,
        name: datos.name,
        representative: datos.representative,
        numNit: datos.numNit,
        imgNit: this.downloadURL,
        phone: datos.phone,
        address: datos.address,
        city: datos.city,
        country: datos.country,
        roll: tipo,
        fileRef: this.filePath
      };
      return this.db.collection('users').doc(id).set(prodObj);
    }
  }

  private uploadImageDocument(id: any, datos: any, tipo: string, image: FileI){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.loadUserData(id, datos, tipo);
        });
      })
    ).subscribe();
 }

 filterUser(id: any, datos: any, tipo: string, image: FileI){
  this.uploadImageDocument(id, datos, tipo, image );
 }

 userData(id: any){
  return this.db.collection('users').doc(id).valueChanges();
 }

 paises(){
  return this.http.get('../../../assets/json/countries.json');
}
departmentos(){
 return this.http.get('../../../assets/json/states.json');
}
}

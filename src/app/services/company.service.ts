import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../shared/file.interface';
import { Request } from '../shared/request.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  sctor: string;
  category: string;
  subcategory: string;
  tipo: string;
  userId: string;
  nameUser: string;
  rollUser: string;
  private filePath: any;
  private downloadURL: string;
  // para abrir cotizaciones
  requestId: string;
  quoteId: string;
  // marcadores
  markerState: number;
  requestState: string;

   // profile
   imgUrl: string;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { }

  companyData(id: any){
    return this.db.collection('users').doc(id).valueChanges();
  }
  loadEconomySectors(){
    return this.db.collection('economic_sectors').valueChanges();
  }
  loadCategories(categoria: string){
    return this.db.collection('categories').doc(categoria).valueChanges();
  }
  loadSubcategories(subcategoria: string){
    return this.db.collection('subcategories')
                  .doc(subcategoria)
                  .collection(subcategoria)
                  .valueChanges();
  }

  uploadImageDocument(image: FileI, solicitud: any){
    this.filePath = `request/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.loadRequestData(solicitud);
          console.log(this.downloadURL);
        });
      })
    ).subscribe();
 }

 loadRequestData(solicitud: any){
  if (this.rollUser === 'buyerCompany') {
    const prodObj: Request = {
      usuario: solicitud.usuario,
      sector: solicitud.sector,
      categoria: solicitud.categoria,
      subcategoria: solicitud.subcategoria,
      cantidad: solicitud.cantidad,
      direccion: solicitud.direccion,
      ciudad: solicitud.ciudad,
      fecha: solicitud.fecha,
      pais: solicitud.pais,
      producto: solicitud.producto,
      referencia: solicitud.referencia,
      descripcion: solicitud.descripcion,
      imagen: this.downloadURL,
      marca: solicitud.marca,
      fileRef: this.filePath
     };
    return this.db.collection('solicitudes').add(prodObj);
  }
 }
 filterRequest(image: FileI, solicitud: any){
  this.uploadImageDocument(image, solicitud );
 }

 loadRequestSentUser(solicitudes: Request, uid: string){
   return this.db.collection('solicitudes/', ref => ref
                 .where('usuario', '==', uid)
                 .where('estado', '==', 'Activa')).snapshotChanges()
                 .pipe(
                  map(actions =>
                   actions.map(resp => {
                   const data = resp.payload.doc.data() as Request;
                   const id = resp.payload.doc.id;
                   return {id, ...data};
                   }))
                  );
 }
 loadAllRequestSentUser(uid: string){
  return this.db.collection('solicitudes/', ref => ref
                .where('usuario', '==', uid))
                .snapshotChanges()
                .pipe(
                 map(actions =>
                  actions.map(resp => {
                  const data = resp.payload.doc.data() as Request;
                  const id = resp.payload.doc.id;
                  return {id, ...data};
                  }))
                 );
}

 countInterestinRequest(idRequest: string){
    return this.db.collection('interes/', ref => ref
                  .where('request', '==', idRequest))
                  .valueChanges();
 }

 updateRequestState(id: string){
   return this.db.collection('solicitudes').doc(id).update({estado: 'Papelera'});
 }
 updateRequestCondition(id: string, condition: string){
  return this.db.collection('solicitudes').doc(id).update({condicion: condition});
}

loadConditionRequest(id: string){
  return this.db.collection('solicitudes').doc(id).valueChanges();
}

markAcceptedRequest(id: string, seller: string, quote: string){
  return this.db.collection('solicitudes').doc(id).update({
    estado: 'Adjudicada',
    vendedor: seller,
    cotizacion: quote,
    adjudicacion: new Date()
  });
}

 loadRequesDataById(id: string){
  return this.db.collection('solicitudes').doc(id).valueChanges();
 }

 updateRequestById(id: string, request: Request){
  return this.db.collection('solicitudes').doc(id).update(request);
 }

 loadQuotationsById(idRequest: string){
   return this.db.collection('cotizaciones/', ref => ref
   .where('solicitud', '==', idRequest))
   .snapshotChanges()
                 .pipe(
                  map(actions =>
                   actions.map(resp => {
                   const data = resp.payload.doc.data() as Request;
                   const id = resp.payload.doc.id;
                   return {id, ...data};
                   }))
                  );
 }

 loadAllQuotationByBuyer(){
     return this.db.collection('cotizaciones/', ref => ref
                   .where('destinatario', '==', this.userId))
                   .valueChanges();
 }

 openQuoteDetailById(idQuote: string){
   return this.db.collection('cotizaciones').doc(idQuote).valueChanges();
 }

 markQuoteConsult(idQuote: string, idRequest: string, buyer: string){
  return this.db.collection('marcadores').add({
    solicitud: idRequest,
    cotizacion: idQuote,
    comprador: buyer
  });
 }

 countMarkersGeneral(solicitud: string, userId: string){
  return this.db.collection('marcadores/', ref => ref
                .where('solicitud', '==', solicitud)
                .where('comprador', '==', userId))
                .valueChanges();
 }

 countMarkers(solicitud: string, userId: string, cotizacion: string ){
  return this.db.collection('marcadores/', ref => ref
                .where('solicitud', '==', solicitud)
                .where('comprador', '==', userId)
                .where('cotizacion', '==', cotizacion))
                .valueChanges();
 }

 checkMarker(idQuote: string){
  return this.db.collection('cotizaciones').doc(idQuote)
                .update({marcador: 'Si'});
 }

 loadDataSeller(idSeller: string){
   return this.db.collection('sellerUser').doc(idSeller).valueChanges();
 }

 quoteSelectedTrue(id: string){
  return this.db.collection('cotizaciones').doc(id).update({adjudicada: 'true'});
 }

 simpleUpdateProfileUser(nombre: string, telefono: string){
  return this.db.collection('users')
                .doc(this.userId)
                .update({
                  name: nombre,
                  phone: telefono
                });
}

private updateProfileUser(nombre: string, telefono: string){
  return this.db.collection('users')
                .doc(this.userId)
                .update({
                  imgProfile: this.imgUrl,
                  name: nombre,
                  phone: telefono
                });
}

uploadImageProfile(image: FileI, nombre: string, telefono: string){
  this.filePath = `profile/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe( urlImage => {
        this.imgUrl = urlImage;
        this.updateProfileUser(nombre, telefono);
      });
    })
  ).subscribe();
}

}


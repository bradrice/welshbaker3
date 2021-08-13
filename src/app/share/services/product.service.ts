import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IDoc } from '../../interface/docItem';
import { AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private flavorVal = new BehaviorSubject<number>(0);
  flavorVal$ = this.flavorVal.asObservable(); 
  welshcakeref: AngularFirestoreCollection<IDoc>;
  chocdipref: AngularFirestoreCollection<IDoc>;
  sconeref: AngularFirestoreCollection<IDoc>;
  extrasref: AngularFirestoreCollection<IDoc>;
  shortbreadref: AngularFirestoreCollection<IDoc>;
  welshcakes$: Observable<any>;
  welshcakesSnap$: Observable<any>;
  chocdipped$: Observable<any>;
  scones$: Observable<any>;
  sconeSnap$: Observable<any>;
  extras$: Observable<any>;
  extrasSnap$: Observable<any>;
  shortbread$: Observable<any>;
  shortbreadSnap$: Observable<any>;
  chocdippedSnap$: Observable<any>;
  welshcakeArray: Observable<any[]>;
  productsRef: AngularFirestoreCollection<IDoc>|undefined;

  constructor( private db: AngularFirestore ) {
    this.welshcakeref = db.collection<IDoc>('welshcakes', ref => ref.orderBy('productId', 'asc'));
    
    this.welshcakes$ = this.welshcakeref.valueChanges();
    this.welshcakesSnap$ = this.welshcakeref.snapshotChanges();
    this.chocdipref = db.collection<IDoc>('chocDipped', ref => ref.orderBy('productId', 'asc'));
    this.chocdipped$ = this.chocdipref.valueChanges();
    this.chocdippedSnap$ = this.chocdipref.snapshotChanges();
    this.sconeref = db.collection<IDoc>('scones', ref => ref.orderBy('productId', 'asc'));
    this.scones$ = this.sconeref.valueChanges();
    this.sconeSnap$ = this.sconeref.snapshotChanges();
    this.extrasref = db.collection<IDoc>('extras', ref => ref.orderBy('productId', 'asc'));
    this.extras$ = this.extrasref.valueChanges();
    this.extrasSnap$ = this.extrasref.snapshotChanges();
    this.shortbreadref = db.collection<IDoc>('shortbread', ref => ref.orderBy('productId', 'asc'));
    this.shortbread$ = this.shortbreadref.valueChanges();
    this.shortbreadSnap$ = this.shortbreadref.snapshotChanges();
   }


   getItem(type:any, id:any): Observable<any> {
     console.log('In product service, retrieving object', type, id);
     let document:AngularFirestoreDocument;
     switch(type) 
     {
       case 'welshcakes':
          document = this.db.doc('welshcakes/' + id);
        break;

        case 'chocDipped':
          document = this.db.doc('chocDipped/' + id);
         break;

        case 'extras':
          document = this.db.doc('extras/' + id);
         break;

        case 'scones':
          document = this.db.doc('scones/' + id);
         break;

        case 'shortbread':
          document = this.db.doc('shortbread/' + id);
         break;
         default:
           document = this.db.doc('welshcakes/'+ id);
     }
     return document.valueChanges();
   }
   
  setItem(type:string, id:string, data:any) {
     console.log('In product service, retrieving object', type, id);
     let document;
     switch(type) 
     {
       case 'welshcakes':
          document = this.db.doc('welshcakes/' + id);
        break;

        case 'chocDipped':
          document = this.db.doc('chocDipped/' + id);
         break;

        case 'extras':
          document = this.db.doc('extras/' + id);
         break;

        case 'scones':
          document = this.db.doc('scones/' + id);
         break;

        case 'shortbread':
          document = this.db.doc('shortbread/' + id);
         break;
     }
     let obj = document?.set(data);
     return obj;
   }

  createItem(type:string, data:any){
    console.log(type, data);
    let collection;
     switch(type) 
     {
       case 'welshcakes':
          collection = this.welshcakeref;
        break;

        case 'chocDipped':
          collection = this.chocdipref;
         break;

        case 'extras':
          collection = this.extrasref;
         break;

        case 'scones':
          collection = this.sconeref;
         break;

        case 'shortbread':
          collection = this.shortbreadref;
         break;
     }
     let obj = collection?.add(data)
     .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      //obj = docRef.id;
  })
      .catch(function(error) {
      console.error("Error adding document: ", error);
  });
     return obj;
  }

  deleteItem(type:string, id:string): Promise<void>|undefined {
    console.log('In product service, deleting object', type, id);
    let collection;
    switch(type) 
    {
      case 'welshcakes':
          collection = this.welshcakeref;
        break;

        case 'chocDipped':
          collection = this.chocdipref;
         break;

        case 'extras':
          collection = this.extrasref;
         break;

        case 'scones':
          collection = this.sconeref;
         break;

        case 'shortbread':
          collection = this.shortbreadref;
         break;
    }
    return collection?.doc(id)?.delete();
  }

  changeFlavorData(data: number) {
    console.log('In changeFlavorData: ', data);
    this.flavorVal.next(data);
  }

  getWelshcakes(): Observable<any[]> {
    this.welshcakesSnap$.subscribe((items) =>{
      let flavoritems = items.map((item:any) => {
        item.category = 'flavor';
        item.id = item.payload.doc.id;
        item.data = item.payload.doc.data();
        return item;
      });
      this.welshcakeArray = of(flavoritems);
    });
    return this.welshcakeArray;
  }
  

}

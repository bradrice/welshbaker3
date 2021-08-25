import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { boxItem } from '../../interface/boxItem';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../../share/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '../../share/services/auth.service';
import { map } from 'rxjs/operators';
import { IDoc } from 'src/app/interface/docItem';
import { IExtra } from 'src/app/interface/docItem';
import { INote } from 'src/app/interface/iNote';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  boxesRef: AngularFirestoreCollection<boxItem[]>;
  items: AngularFirestoreCollection<any[]>;
  productsRef;
  welshcakes: IDoc[];
  welshCakesSub;
  shortbread: IDoc[];
  shortbreadSub;
  scones: IDoc[];
  sconesSub;
  extras: IExtra[];
  extrasSub;
  chocdipped: IDoc[];
  chocdippedSub;
  notes: INote[];
  boxes$: Observable<any>;
  boxesSub;
  box_sizes:Observable<any[]>;
  boxSizesSub;
  boxfull = false;
  showExtras = false;
  model = {};
  product: any;
  boxItems: boxItem[] = [];
  isboxset = false;
  flavorval: number;
  flavorValSub;
  extraitems: boxItem[];
  canSubmit = false;
  sconeslist: [];
  currBox: boxItem;
  currItem: string;
  anonuser: Observable<null>;
  loginForm: FormGroup;
  // user: Observable<firebase.auth.User>;

  constructor(
    private db: AngularFirestore, 
    private dialog: MatDialog,  
    private productService: ProductService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    public fb: FormBuilder,
    public authService: NgAuthService,
    private _router: Router
    ) {
      // for development
    //let success = this.authService.login('brad@bradrice.com', '123Welsh*Baker');
    // this.boxesRef = db.collection<boxItem[]>('boxsize', ref=> ref.orderBy('order')) ;

  }

  ngOnInit() {
    // this.login();
    this.route.queryParams
      .subscribe(params => {
        // console.log(params); // {order: "popular"}
        if(params){
          this.currItem = params.product;
        }
      });
      
    
    this.product = {};
    
    this.getWelshcakesist();
    this.getSconesList();
    this.getShortbreadList();
    this.getChocDipList();
    this.getExtrasList();
    this.getNotesList();

    this.flavorValSub = this.productService.flavorVal$.subscribe(val => {
      console.log("flavor val will be: ", val);
    })
  }

  getWelshcakesist() {
    this.productService.welshcakeref.snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log(items);
      this.welshcakes = items;
    });
  }

  getSconesList() {
    this.productService.sconeref.snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log(items);
      this.scones = items;
    });
  }

  getShortbreadList() {
    this.productService.shortbreadref.snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log(items);
      this.shortbread = items;
    });
  }

  getChocDipList() {
    this.productService.chocdipref.snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log(items);
      this.chocdipped = items;
    });
  }

  getExtrasList() {
    this.productService.extrasref.snapshotChanges().pipe(
      map(changes => 
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log(items);
      this.extras = items;
    });
  }
  
  getNotesList() {
    this.productService.notesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(items => {
      console.log("notes", items);
      this.notes = items;
    });
  
  }

  updateItem(id, type){
    console.log(id, type);
    this._router.navigate(["edit", type, id]);
  }
  
  updateNote(id){
    console.log(id);
    this._router.navigate(["editnote", id]);
  }
  
  updateExtra(id){
    console.log("update extra", id);
    this._router.navigate(["editextra", id]);
  }

  addItem(type){
    console.log(type);
    this._router.navigate(["edit", type]);
  }

  addNote(){
    this._router.navigate(["editnote"]);
  }
  
  addExtra(){
    this._router.navigate(["editextra"]);
  }

  logout(){
    this.authService.SignOut();
  }

  ngOnDestroy() {
    console.log("In on Destroy");
  }

}

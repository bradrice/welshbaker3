import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { boxItem, extraItem } from '../../interface/boxItem';
import { INote } from '../../interface/iNote';
import {MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
// import { matTabGroup} from "@angular/material/tabs";
import { ProductService } from '../../share/services/product.service';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ActivatedRoute } from '@angular/router';
'use strict';

const initialValue = 0;
const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity;
@Component({
  selector: 'app-boxfill',
  templateUrl: './boxfill.component.html',
  styleUrls: ['./boxfill.component.scss']
})
export class BoxfillComponent implements OnInit {

  title = 'welshbaker2';
  isLinear = false;
  boxesRef: AngularFirestoreCollection<boxItem[]>;
  items: AngularFirestoreCollection<any[]>;
  productsRef;
  welshcakes: Observable<any[]>;
  shortbread: Observable<any[]>;
  scones: Observable<any[]>;
  extras: Observable<any[]>;
  chocdipped: Observable<any[]>;
  boxes$: Observable<any>;
  notes$: Observable<any>;
  notes: INote[];
  box_sizes:Observable<any[]>;
  my = {'num': 0, 'num2': '', 'totalval': 0, 'totalAllowed': 0, 'currentTotal': 0, 'flavorLeft': 0, 'extraAllowed': 0, 'flavorAllowed': 0, 'extraval': 0, 'flavorval': 0, 'extraLeft': 0};
  boxfull = false;
  showExtras = false;
  model = {};
  product: any;
  boxItems: boxItem[] = [];
  isboxset = false;
  flavorval: number;
  extraitems: boxItem[];
  @ViewChild('cartform', {static: true}) cartform: ElementRef;
  canSubmit = false;
  sconeslist: [];
  currBox: boxItem;
  currItem: string;
  anonuser: Observable<null>;
  isLoading: boolean;


  constructor(
    private db: AngularFirestore, 
    private dialog: MatDialog,  
    private productService: ProductService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth
    ) {

  }


  ngOnInit() {
    this.isLoading = true;
    // this.login();
    this.afAuth.signInAnonymously()
  .then(() => {
    // Signed in..
    console.log("Signed in anonymously");
    this.boxesRef = this.db.collection<boxItem[]>('boxsize', ref=> ref.orderBy('order'));
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        if(params){
          this.currItem = params.PRODUCT;
        }
      });
      
    this.boxes$ = this.boxesRef.valueChanges();
    console.dir(this.box_sizes);
    this.boxes$.subscribe(items => {
      let boxitems = items.map(item => {
        console.log(item, this.currItem);
        if (item.productId === this.currItem) {
          this.currBox = item;
          this.setSelected(item);
        }
        return item;
      });
      if(boxitems.length > 0){
        this.isLoading = false;
      }
      this.box_sizes = of(boxitems);
    });
    this.product = {};
    this.productService.welshcakes$.subscribe(items => {
      let flavoritems:any[] = items.map((item:any) => {
        item.category = 'flavor';
        return item;
      }).filter((item:any) => {
        return item.active === true;
      });
      this.welshcakes = of(flavoritems);
    });

    this.productService.chocdipped$.subscribe(items => {
      let flavoritems = items.map((item:any) => {
        item.category = 'flavor';
        return item;
      }).filter((item:any) => {
        return item.active === true;
      });
      this.chocdipped = of(flavoritems);
    });

    this.productService.scones$.subscribe(items => {
      let flavoritems = items.map((item:any) => {
        item.category = 'flavor';
        return item;
      }).filter((item:any) => {
        return item.active === true;
      });
      this.sconeslist = flavoritems;
      this.scones = of(flavoritems);
    });

    this.productService.shortbread$.subscribe(items => {
      let flavoritems = items.map((item:any) => {
        item.category = 'flavor';
        return item;
      }).filter((item:any) => {
        return item.active === true;
      });
      this.shortbread = of(flavoritems);
    });

    this.productService.extras$.subscribe(items => {
      this.extraitems = items.map((item:any) => {
        item.category = 'extra';
        return item;
      }).filter((item:any) => {
        return item.active === true;
      });
      this.extras = of(this.extraitems);
    })
    
    this.productService.notes$.subscribe(items => {
      this.notes = items.sort((a:INote,b:INote)  => {
        return a.order-b.order;
      });
      console.log(this.notes);     
    });

    // console.log(this.productService);

    this.productService.flavorVal$.subscribe(val => {
      console.log("flavor val will be: ", val);
    })  
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
    
  }

  setBoxSize(boxsize: MatRadioChange){
    console.log(boxsize.value.YourOption);
    this.isboxset = true;
    this.boxfull = false;
    this.canSubmit = false;
    this.my.flavorAllowed = +boxsize.value.quantity;
    this.my.extraAllowed = +boxsize.value.extra;
    this.product['price'] = boxsize.value.price;
    this.product['catalogId'] = boxsize.value.catalogId;
    this.product['productId'] = boxsize.value.productId;
    this.product['YourOption'] = boxsize.value.YourOption;
    console.log(this.product);
    console.log("flavors allowed", this.my.flavorAllowed, this.my.flavorval);
    console.log(this.my.flavorval > this.my.flavorAllowed);

    console.log("checking logic for flavors", this.my.flavorval, this.my.flavorAllowed);

    if(this.my.flavorval > this.my.flavorAllowed){
      console.log('too many flavors');
      this.removeFlavors();
    }

    if(this.my.extraAllowed === 0 || this.my.extraval > this.my.extraAllowed){
      console.log('too many extras');
      this.removeExtras();
    }
    
    console.log(this.my);

    // if(this.product.productId === '1001' || this.product.productId === '1002') {
    //   this.removeScones();
    // }
  }

  setSelected(box){
    console.log(box);
    this.isboxset = true;
    this.boxfull = false;
    this.canSubmit = false;
    this.my.flavorAllowed = +box.quantity;
    this.my.extraAllowed = +box.extra;
    this.product['price'] = box.price;
    this.product['catalogId'] = box.catalogId;
    this.product['productId'] = box.productId;
    this.product['YourOption'] = box.YourOption;
    console.log(this.product);
    console.log(this.my);
  }

  addToCart(){
    console.log(this.cartform.nativeElement);
    this.cartform.nativeElement.submit();
  }

  addFlavorToBox($event){
    if(this.isboxset){
      this.my.flavorval = +this.my.flavorval + 1;
    const item = $event;
    // console.log(item.title);
    let bItem: boxItem = {title: "", quantity: 0, productId: '0', category: '', soldout: false};
      bItem.title = item.title;
      bItem.quantity = 1;
      bItem.productId = item.productId;
      bItem.soldout = item.soldout;
      item.ExcludedId ? bItem.ExcludedId = item.ExcludedId: bItem.ExcludedId = [];
      console.log("bItem", bItem, this.product.productId);
      console.log(bItem.ExcludedId?.indexOf(this.product.productId));
      if(bItem.soldout === true){
      this.openGenericDialog('Sorry, this item is currently sold out')
      this.my.flavorval = +this.my.flavorval - 1;
      return;
      };
    if ( bItem.ExcludedId?.indexOf(this.product.productId) !== -1 ) {
      this.openGenericDialog('Sorry, Scones can only be added to boxes of 11 or more packs and boxes with extras.');
      const newflavorval = this.boxItems.reduce(reducer, initialValue);
      console.log(newflavorval);
      this.my.flavorval = newflavorval;
      return;
    }
    if(this.my.flavorval <= this.my.flavorAllowed) {
      console.log('we can add a flavor');
        if(this.boxItems.length === 0){
          let boxitems:any[] = [];
          boxitems[0] = bItem;
          this.boxItems = boxitems;
        }
        else if(this.boxItems.find((item) => {return item.productId === bItem.productId})) {
          let tmpItems = this.boxItems.map(element => {
            if(element.productId === bItem.productId){
              element.quantity = +element.quantity + 1;
            }
            return element;
          });
          this.boxItems = tmpItems;
        }
        else { 
          let boxitems = [...this.boxItems];
          let currIndex = this.boxItems.length;
          boxitems[currIndex] = bItem;
          this.boxItems = boxitems;
        }
      } else if (this.my.extraAllowed > 0) {
        this.openGenericDialog("You've selected the maximum number of Yummies. Have you added all of your extras?")
      } else {
        this.checkBoxFull();
      }
    }  else {
      console.log("Pop a select a box modal");
      this.openGenericDialog('You have not selected a box size. Please select the size of box before adding items.');
    }
    console.log(this.boxItems, this.my);
    this.setCartReady();
    this.my.currentTotal = this.my.extraval + this.my.flavorval;
    console.log(this.boxItems);
    }

    addExtraToBox(extra){
      if(this.isboxset){
        //do add extra
        console.log("The amount of extras allowed: ", this.my.extraAllowed);
        let bItem: extraItem = {title: "", quantity: 0, productId: '0', category: 'extra', soldout: false, maxlimit: 4};
        bItem.title = extra.title;
        bItem.quantity = 1;
        bItem.productId = extra.productId;
        bItem.soldout = extra.soldout;
        bItem.maxlimit = extra.maxlimit;
        if(bItem.soldout === true){
          this.openGenericDialog('Sorry, this item is currently sold out')
          return;
          };
        if(this.my.extraAllowed > 0) {
          this.my.extraval = +this.my.extraval + 1;
          if(this.my.extraval <= this.my.extraAllowed && this.my.extraAllowed > 0) {
            if(this.boxItems.length === 0){
              let boxitems:any[] = [];
              boxitems[0] = bItem;
              this.boxItems = boxitems;
            }
            else if(this.boxItems.find((item) => {return item.productId === bItem.productId})) {
              let tmpItems = this.boxItems.map(element => {
                if(element.productId === bItem.productId){
                  if(element.quantity < bItem.maxlimit){
                  element.quantity = +element.quantity + 1;
                  } else {
          this.my.extraval = +this.my.extraval - 1;
                     this.openGenericDialog(` Sorry, only ${bItem.maxlimit} of this extra can fit in this box`)
                  }
                }
                return element;
              });
              this.boxItems = tmpItems;
            }
            else { 
              // this.boxItems.push(bItem) 
              let boxitems = [...this.boxItems];
              let currIndex = this.boxItems.length;
              boxitems[currIndex] = bItem;
              this.boxItems = boxitems;
            }
          } else if (this.my.flavorval < this.my.flavorAllowed) {
            this.my.extraval = +this.my.extraAllowed;
            console.log(this.my.extraval);
            this.openGenericDialog("You've selected the maximum number of Extras. Have you added all  of your yummies?")
          } else {
            this.checkBoxFull();
          }
        } else {
          this.openGenericDialog("Sorry, this box allows no extras");
        }      
      } else {
        this.openGenericDialog('You have not selected a box size. Please select the size of box before adding items.');
      }
      this.setCartReady();
      this.my.currentTotal = this.my.extraval + this.my.flavorval;
    }

    removeExtras(){
      let newItems = this.boxItems.filter(item => {
        return item.category !== 'extra';
      });
      this.boxItems = newItems;
      this.my.extraval = 0;
      this.my.currentTotal = this.my.extraval + this.my.flavorval;
      this.checkBoxFull();
    }

    removeScones() {
      console.log("have to check if there are scones and remove them", this.sconeslist, this.boxItems);
      let sconesids = this.sconeslist.map((item: any) => {return item.productId});
      console.log(sconesids);
      var arr = this.boxItems.filter(item => {
        console.log(item.productId);
        return sconesids.indexOf(item.productId) === -1;
      });
      console.log(arr);
      this.boxItems = arr;
      const newflavorval = this.boxItems.reduce(reducer, initialValue);
      console.log(newflavorval);
      // this.my.flavorval = newflavorval;
      this.my.currentTotal = this.my.extraval + newflavorval;
      this.checkBoxFull();
    }



    removeFlavors(){
      console.log('removing flavors');
      let newItems = this.boxItems.filter(item => {
        return item.category !== '';
      });
      this.boxItems = newItems;
      this.my.flavorval = 0;
      this.my.currentTotal = this.my.extraval + this.my.flavorval;
      this.checkBoxFull();
    }

    checkBoxFull(){
      if ( this.checkFlavorFull() && this.checkExtraFull() ) {
        this.boxfull = true;
        this.canSubmit = true;
        this.openGenericDialog('Your box is filled');
      }
      else {
        this.canSubmit = false;
        this.boxfull = false;
      }
    }

    checkExtraFull(){
      if ( this.my.extraval >= +this.my.extraAllowed){
        this.my.extraval = +this.my.extraAllowed;
        return true;
      } else {
        this.boxfull = false;
        return false;
      }
    }

    checkFlavorFull() {
      if ( this.my.flavorval >= this.my.flavorAllowed){
        this.my.flavorval = this.my.flavorAllowed;
        return true;
      } else {
        this.boxfull = false;
        return false;
      }
    }

    setCartReady() {
      if ( this.checkFlavorFull() && this.checkExtraFull() ) {
        this.boxfull = true;
        this.canSubmit = true;
      }
    }

    decrement(id:string){
      console.log(id);
      this.boxfull = false;
      this.my.flavorval = this.my.flavorval - 1;
      let newArray = this.boxItems.map(item => {
        if(item.productId === id){
          item.quantity = item.quantity - 1;
        }
        return item;
      }).filter(item => {
        return item.quantity > 0;
      });
      console.log(newArray);
      this.boxItems = newArray;
      this.checkBoxFull();
    }

    decrementExtra(id:string){
      console.log(id);
      this.boxfull = false;
      this.my.extraval = this.my.extraval - 1;
      let newArray = this.boxItems.map(item => {
        if(item.productId === id){
          item.quantity = item.quantity - 1;
        }
        return item;
      }).filter(item => {
        return item.quantity > 0;
      });
      console.log(newArray);
      this.boxItems = newArray;
      this.checkBoxFull();
    }

    removeRow(id:string){
      let newArray:any[] = [];
      this.boxfull = false;
      console.log("remove: ", id);
      newArray = this.boxItems.filter((item)=>{
        if(item.productId === id){
          this.my.flavorval = this.my.flavorval - item.quantity;
          console.log("my flavorval: ", this.my.flavorval);
        }
        return item.productId !== id;
      });
      console.log(newArray);
      this.boxItems = newArray;
      this.my.currentTotal = this.my.extraval + this.my.flavorval;
      // this.checkBoxFull();
      this.checkBoxFull();
    }

    openGenericDialog(data: String): void {
      const dialogRef = this.dialog.open(GenericDialogComponent, {
        width: '250px',
        data: { dialogText: data }
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        console.log('The dialog was closed');
      });
    }

    showImage(img: String): void {
      console.log(img);
      const dialogRef = this.dialog.open(ImageDialogComponent, {
        width: '300px',
        data: { imgRef: img }
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        console.log('The dialog was closed');
      });
    }

}



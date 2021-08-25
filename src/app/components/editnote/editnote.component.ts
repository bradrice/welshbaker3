import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '../../share/services/auth.service';
import { ProductService } from 'src/app/share/services/product.service';
// import { AngularFireAuth } from '@angualar/fire';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
//import { IDoc } from '../../interface/docItem';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
//import { ISuccess } from '../../interface/successItem';
import { Subscription, Observable } from 'rxjs';

export const numberValidator = (control: FormControl) => {
  if (parseInt(control.value) > 0 && parseInt(control.value) < 10 ) {
    return null
  } else {
    return true;
  }
}



@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})
export class EditNoteComponent implements OnInit, AfterViewInit {
  id:string | null;
  sub:Subscription;
  docsub:Subscription;
  type:string;
  document$:any;
  document:any;
  form: FormGroup;
  fields: FormlyFieldConfig[];
  message: string;
  deletesub;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    // public afAuth: AngularFireAuth,
    public fb: FormBuilder,
    public authService: NgAuthService) { }

  ngOnInit() {
  this.form = new FormGroup({});
  this.fields = [
    {
    key: 'note',
    type: 'input',
    templateOptions: {
      label: 'Note',
      placeholder: 'Note',
    },
    validators: {
      validation: [Validators.required]
    },
  },
  {
    key: 'order',
    type: 'input',
    templateOptions: {
      label: 'Order',
      type: 'number',
      placeholder: 'Order',
      min: 0,
      max: 10
    },
    validators: {
      validation: [Validators.required, numberValidator ]
    },
    validation: {
      messages: {
        required: 'Product Id is required and needs to be a number',
        min: "Must be a nubmer larger than 0",
        max: "Must be a number smaller than 11"
      }
    }
  }
];
    this.sub = this.route.paramMap.subscribe((params:any) => { 
    this.id = params.get('id');
    if(this.id){
    this.document$ =  this.productService.getNote(this.id);
      this.docsub = this.document$.subscribe((item:any) => {
        console.log(item);
        if(item){
          this.document = item;
        } else {
          // this.router.navigate(['admin/'])
          this.message = "Please select an item for editing";

        }
       
      });
     } else {
       this.document = {note: '', order: ''};
     }
   });
    }

  ngAfterViewInit(){
}

submit() {
  console.log("submitted", this.id);
  if(this.id){
  this.productService.setNote(this.id, this.document);
  setTimeout(() => {
    this.router.navigate(['/admin']);
    }, 1000);
  } else {
    let obj = this.productService.createNote(this.document);
    if(obj !== undefined){
      setTimeout(() => {
        this.router.navigate(['/admin']);
        }, 1000);
    }
  }
}

deleteNote(id:string|null){
  console.log(id);
  if(id){
  let newItems = this.productService.deleteNote(id)?.then(() => {
    this.message = "Successfully deleted";
    console.log(this.message);
      setTimeout(() => {
      this.router.navigate(['/admin']);
      }, 1000);
  }).catch(function(error) {
    console.error("Error deleting document: ", error, newItems);
  });
  }
}
      

goToAdmin() {
  this.router.navigate(['/admin']);
}
}

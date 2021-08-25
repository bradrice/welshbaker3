import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgAuthService } from '../../share/services/auth.service';
import { ProductService } from 'src/app/share/services/product.service';
// import { AngularFireAuth } from '@angualar/fire';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import { IDoc } from '../../interface/docItem';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
//import { ISuccess } from '../../interface/successItem';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-editextra',
  templateUrl: './editextra.component.html',
  styleUrls: ['./editextra.component.scss']
})
export class EditExtraComponent implements OnInit, AfterViewInit {
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
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'Title',
      placeholder: 'Title',
    },
    validators: {
      validation: [Validators.required]
    },
    validation: {
      messages: {
        required: 'Title is required'
      }
    }
  },
  {
    key: 'productId',
    type: 'input',
    templateOptions: {
      label: 'Product Id',
      placeholder: 'Product Id',
    },
    validators: {
      validation: [Validators.required]
    },
    validation: {
      messages: {
        required: 'Product Id is required'
      }
    }
  },
  {
    key: 'image',
    type: 'input',
    templateOptions: {
      label: 'Image Path',
      placeholder: 'Image Path',
    }
  },
  {
    key: 'active',
    type: 'radio',
    templateOptions: {
      label: 'Active',
      options: [{value: 'True', key: true}, {value: 'False', key: false}]
    },
    validators: {
      validation: [Validators.required]
    },
    validation: {
      messages: {
        required: 'One must be selected'
      }
    }
  },
  {
    key: 'soldout',
    type: 'radio',
    templateOptions: {
      label: 'Sold Out',
      options: [{value: 'True', key: true}, {value: 'False', key: false}]
    },
    validators: {
      validation: [Validators.required]
    },
    validation: {
      messages: {
        required: 'One must be selected'
      }
    }
  },
  {
    key: 'maxlimit',
    type: 'input',
    templateOptions: {
      label: 'Maximum allowed',
      type: 'number',
      placeholder: 'Maximum allowed',
      min: 0,
      max: 10
    },
    validators: {
      validation: [Validators.required]
    },
    validation: {
      messages: {
        required: 'A maximum must be set, anything above 4 is no-limit'
      }
    }
  }
];
    this.sub = this.route.paramMap.subscribe((params:any) => { 
    this.id = params.get('id');
    this.type = params.get('type');
    if(this.id){
    this.document$ =  this.productService.getItem('extras', this.id);
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
       this.document = {title: '', productId: '', image: '', active: false};
     }
   });
    }

  ngAfterViewInit(){
}

submit() {
  console.log("submitted");
  // console.log(this.type, this.id, this.document);
  if(this.id){
  this.productService.setItem(this.type, this.id, this.document);
  setTimeout(() => {
    this.router.navigate(['/admin']);
    }, 1000);
  } else {
    let obj = this.productService.createItem(this.type, this.document);
    if(obj){
      setTimeout(() => {
        this.router.navigate(['/admin']);
        }, 1000);
    }
  }
}

deleteItem(id:string){
  console.log(this.type, id);
  if(id){
  let newItems = this.productService.deleteItem(this.type, id)?.then(() => {
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

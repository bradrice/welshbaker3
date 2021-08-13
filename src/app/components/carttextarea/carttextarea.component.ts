import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carttextarea',
  templateUrl: './carttextarea.component.html',
  styleUrls: ['./carttextarea.component.scss']
})
export class CarttextareaComponent implements OnInit, OnChanges {

  @Input() boxitems: any;
  @Input() option: string;
  @Input() currTotal: number;
  textstring: string;
  sortedItems: [];

  constructor() { }

  ngOnInit() {
   this.textstring = "";
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes);
    // 
    if(changes.boxitems && changes.boxitems.currentValue.length > 0){
      let flavors = changes.boxitems.currentValue.filter(item => {
        return item.category === '';
      });
      let extras = changes.boxitems.currentValue.filter(item => {
        return item.category === 'extra';
      });
      // console.log(flavors, extras);
      this.textstring = "";
      for (let i = 0; i < flavors.length; i++) {
          this.textstring += flavors[i].title + " (" + flavors[i].quantity + ")\n";
        }
        for (let i = 0; i < extras.length; i++) {
          this.textstring += extras[i].title + " (" + extras[i].quantity + ")\n";
        }
    } else {
      this.textstring =  "~~~";
    }
    console.log(this.textstring);
  }

}

import { Component, OnInit } from '@angular/core';
import  { Item } from '../../item';
import {DataService} from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
  providers:[DataService]
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList : Item[]=[];
  selectedItem : Item;
  toggleForm : boolean = false;
  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
       .subscribe(items =>{
          this.shoppingItemList = items;
            console.log('data from dataservice: '+ this.shoppingItemList);
    });
  }
  
  addItem(form){
   // console.log(form.value);
    let newItem: Item ={
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBrought:false
    }
    this.dataService.addShoppingItem(newItem)
      .subscribe(item =>{
        console.log(item);
        this.getItems();
      });
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
      .subscribe(data =>{
        console.log(data);
          if(data.n == 1){
            for(var i=0;i<this.shoppingItemList.length;i++){
              if(id == this.shoppingItemList[i]._id){
                this.shoppingItemList.splice(i,1);
              }
            }
          }
      });
  }

  editItem(form){
    let newItem : Item ={ 
      _id : this.selectedItem._id,
      itemName :form.value.itemName,
      itemQuantity :form.value.itemQuantity,
      itemBrought :form.value.itemBrought
    }
    this.dataService.updateShoppingItem(newItem)
     .subscribe(result => {
       console.log('Original Item to be updated with old values: '+ result);
         this.getItems();
    });
    this.toggleForm = !this.toggleForm;
  }

  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  ngOnInit() {
    this.getItems();
  }

}

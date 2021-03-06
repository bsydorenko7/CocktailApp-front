import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemInventory} from "../../../api/system-inventory";
import {environment} from "../../../../environments/environment";
import {KitchenwareInfo} from "./KitchenwareModel";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-kitchenware-list',
  templateUrl: './kitchenware-list.component.html',
  styleUrls: ['./kitchenware-list.component.css']
})
export class KitchenwareListComponent implements OnInit, OnDestroy {

  searchValue: string;
  kitchenwares: KitchenwareInfo[] = [];
  sorted: Boolean = true;
  objectSubscription: Subscription;
  serverResponse: Subscription;

  constructor(private systemInventory: SystemInventory) { }

  ngOnInit() {
    this.objectSubscription = this.systemInventory.listKitchenware().subscribe((data: KitchenwareInfo[]) => this.kitchenwares = data);
  }

  ngOnDestroy() {
    this.objectSubscription.unsubscribe();
    this.serverResponse.unsubscribe();
  }

  search(searchValue) {
    this.objectSubscription.unsubscribe();
    this.objectSubscription = this.systemInventory.searchKitchenware(searchValue).subscribe((data: KitchenwareInfo[]) => this.kitchenwares = data);
  }

  removeKitchenware (id: Number) {
    if (!(this.serverResponse == undefined)) this.serverResponse.unsubscribe();
    this.serverResponse = this.systemInventory.removeKitchenware(id).subscribe(
      data => {
        if (data == true) {
          for (var i = 0; i < this.kitchenwares.length; i++) {
            if (this.kitchenwares[i].id == id) this.kitchenwares[i].active = false;
          }
        }
      }
    );
  }

  relocateAdd() {
    location.href = environment.frontUrl + "/kitchenwares/add"
  }

  sort() {
    if (this.sorted) this.kitchenwares.sort((a, b) => a.name.localeCompare(b.name.toString()))
    else this.kitchenwares.sort((a, b) => b.name.localeCompare(a.name.toString()))
    this.sorted = !this.sorted;
  }

  filter(data) {
    this.objectSubscription.unsubscribe();
    this.objectSubscription = this.systemInventory.filterKitchenware(data.type, data.category, data.active).subscribe( data => this.kitchenwares = data);

  }

}

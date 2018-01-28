import { Component, OnInit} from '@angular/core';
import { HttpService} from './http.service';
import {Info} from './info';

   
@Component({
    selector: 'app-root',
    template: `
    <div class="block-list">
        <div *ngFor="let item of info; let i = index;" class="list" [class.status_false]="item.status" (click)="toggle(item)">
           
                <p>Наименование: {{item?.title}}</p>
                <p>Описание: {{item?.desc}}</p>
                <button class="button-del" (click)="remove(i)">Del</button>
            
        </div>
    </div>
    <div class="add-element">
        <input #NewInfoTitle type="text">
        <input #NewInfoText type="text">
        <button (click)="add(NewInfoTitle.value, NewInfoText.value)" >add</button>
    </div>
`,
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})

export class AppComponent implements OnInit { 
    
    info: Info[];
 
    constructor(private httpService: HttpService){}
      
    ngOnInit(){
        this.httpService.getData().subscribe(data => this.info=data["titleList"]);
    };
    
    toggle(item){
        item.status = !item.status;
    };

    add(title, desc){
        this.info.push({
            title, 
            desc,
            status: false
        })
    }
    
    remove(ind: number){
        this.info.splice(ind, 1);
    }
}

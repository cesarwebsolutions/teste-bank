import { ListInvestimentsService } from './../services/list-investiments.service';
import { Investiments } from './../model/investiments';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public investiments!: Array<Investiments>;
  constructor(
    private listInvestimentsService: ListInvestimentsService
  ) { }

  ngOnInit(): void {
    this.listInvestimentsService.list().subscribe(
      (resp) => (this.investiments = resp)
    );
  }

}

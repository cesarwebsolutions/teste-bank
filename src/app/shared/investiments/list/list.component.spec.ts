import { ListInvestimentsService } from './../services/list-investiments.service';
import { MOCK_LIST } from './../services/list-investiments.mock';
import { Investiments } from './../model/investiments';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing'
import { ListComponent } from './list.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestimentsService

  const mockList: Array<Investiments> = MOCK_LIST

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestimentsService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) deve listar investimentos`, () => {
    // let investimento = component.investiments
    spyOn(service, 'list').and.returnValue(of(mockList))

    component.ngOnInit()
    fixture.detectChanges()

    expect(service.list).toHaveBeenCalledWith()
    expect(component.investiments.length).toBe(1)
    expect(component.investiments[0].name).toEqual('Banco 1')
    // expect(investimento[0].name).toContain('Itau')
    // expect(investimento[3].name).toContain('Inter')
  })

  it(`(I) deve  listar investimentos`, () => {
    spyOn(service, 'list').and.returnValue(of(mockList))

    component.ngOnInit();
    fixture.detectChanges();

    let investimento = fixture.debugElement.nativeElement.querySelectorAll('.list-itens');

    expect(investimento.length).toEqual(1)
    expect(investimento[0].textContent.trim()).toEqual('Banco 1 | 100')
  })
});

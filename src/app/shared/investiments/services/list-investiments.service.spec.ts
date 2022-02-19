import { MOCK_LIST } from './list-investiments.mock';
import { Investiments } from './../model/investiments';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing'

import { ListInvestimentsService } from './list-investiments.service';
import { HttpClient } from '@angular/common/http';

describe('ListInvestimentsService', () => {
  let service: ListInvestimentsService;
  let httpTestingController: HttpTestingController
  let http: HttpClient

  const URL = 'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json'

  const mockList: Array<Investiments> = MOCK_LIST

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(ListInvestimentsService);
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) deve listar todos investimentos`, (done) => {
    service.list().subscribe((resp:Array<Investiments>) => {
      expect(resp[0].name).toEqual('Banco 1')
      expect(resp[0].value).toEqual(100)

      // expect(resp[4].name).toEqual('Banco 5')
      // expect(resp[4].value).toEqual(100)
      done()
    })

    const req = httpTestingController.expectOne(URL)
    req.flush(mockList)

    expect(req.request.method).toEqual('GET')
  })
});

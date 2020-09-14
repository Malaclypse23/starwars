import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { StarWarsApiService } from './star-wars-api.service';

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [StarWarsApiService]
    });
    service = TestBed.inject(StarWarsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects service to fetch characters',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        service.getCharacters().subscribe(resp => {
          expect(resp[`count`]).toBe(82);
          expect(resp[`results`]).toBeGreaterThan(0);
        });
        const req = httpMock.expectOne('https://swapi.dev/api/people/?page=1');
        expect(req.request.method).toEqual('GET');
      })
  );

  it('expects service to get character-details for given input url',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        const url = 'https://swapi.dev/api/people/1';
        service.getCharacterDetails(url).subscribe(resp => {
          expect(resp[`name`]).toBe('Luke Skywalker');
          expect(resp[`height`]).toBe('172');
        });
        const req = httpMock.expectOne('https://swapi.dev/api/people/1');
        expect(req.request.method).toEqual('GET');
      })
  );

  it('correctly handles error', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
    const badUrl = 'https://swapi.dev/api/peo';
    const spy = spyOn(console, 'error');

    service.getCharacterDetails(badUrl).subscribe(resp => {
      expect(resp[`detail`]).toBe('Not found');
    });
    const req = httpMock.expectOne(badUrl).error(new ErrorEvent('not found'));
    expect(spy).toHaveBeenCalled();
  }));
});

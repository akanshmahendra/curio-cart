import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { API_URL } from '../../app.config';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth, { provide: API_URL, useValue: 'http://localhost:3000/api' }],
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

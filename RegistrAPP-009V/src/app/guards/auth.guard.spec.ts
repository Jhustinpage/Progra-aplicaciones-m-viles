import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginService } from '../services/login.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', () => {
    loginService.isLoggedIn.and.returnValue(true);
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('should deny access and redirect if user is not logged in', () => {
    loginService.isLoggedIn.and.returnValue(false);
    expect(authGuard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

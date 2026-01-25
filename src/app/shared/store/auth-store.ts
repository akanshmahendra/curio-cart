import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from '../models/auth';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { firstValueFrom, pipe } from 'rxjs';
import { jwtDecode } from '../utils/jwt-decode';

type AuthState = {
  token: string | null;
  userId: string | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((authStore, authService = inject(Auth)) => ({
    login(payload: ILoginRequest) {
      patchState(authStore, { isLoading: true });
      authService.login(payload).subscribe(
        pipe((response: ILoginResponse) => {
          const decodedToken: any = jwtDecode(response.token);
          patchState(authStore, {
            token: response.token,
            userId: decodedToken.userId,
            isLoading: false,
            error: null,
          });
        }),
      );
    },
    register(payload: IRegisterRequest) {
      patchState(authStore, { isLoading: true });
      authService.register(payload).subscribe(
        pipe((response: unknown) => {
          patchState(authStore, {
            isLoading: false,
            error: null,
          });
        }),
      );
    },
  })),
);

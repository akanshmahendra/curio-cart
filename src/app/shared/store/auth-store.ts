import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ILoginRequest, IRegisterRequest } from '../models/auth';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
    async login(payload: ILoginRequest): Promise<void> {
      patchState(authStore, { isLoading: true });
      const response = await firstValueFrom(authService.login(payload));
      patchState(authStore, {
        token: response.token,
        userId: jwtDecode(response.token).user,
        isLoading: false,
        error: null,
      });
    },
    async register(payload: IRegisterRequest): Promise<void> {
      patchState(authStore, { isLoading: true });
      const response = await firstValueFrom(authService.register(payload));
      patchState(authStore, {
        isLoading: false,
        error: null,
      });
    },
  })),
);

class AuthTokenStore {
  private static instance: AuthTokenStore;
  private _token: string | null = null;

  private constructor() {}

  static getInstance(): AuthTokenStore {
    if (!AuthTokenStore.instance) {
      AuthTokenStore.instance = new AuthTokenStore();
    }
    return AuthTokenStore.instance;
  }

  setToken(token: string) {
    this._token = token;
  }

  getToken(): string | null {
    return this._token;
  }

  removeToken() {
    this._token = null;
  }
}

export const authStore = AuthTokenStore.getInstance();

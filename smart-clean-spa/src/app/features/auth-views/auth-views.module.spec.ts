import { AuthViewsModule } from './auth-views.module';

describe('AuthViewsModule', () => {
  let authViewsModule: AuthViewsModule;

  beforeEach(() => {
    authViewsModule = new AuthViewsModule();
  });

  it('should create an instance', () => {
    expect(authViewsModule).toBeTruthy();
  });
});

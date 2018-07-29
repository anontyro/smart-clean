import { DashboardViewsModule } from './dashboard-views.module';

describe('DashboardViewsModule', () => {
  let dashboardViewsModule: DashboardViewsModule;

  beforeEach(() => {
    dashboardViewsModule = new DashboardViewsModule();
  });

  it('should create an instance', () => {
    expect(dashboardViewsModule).toBeTruthy();
  });
});

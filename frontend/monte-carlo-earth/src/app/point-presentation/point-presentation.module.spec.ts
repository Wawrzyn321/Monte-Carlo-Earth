import { PointPresentationModule } from './point-presentation.module';

describe('PointPresentationModule', () => {
  let pointPresentationModule: PointPresentationModule;

  beforeEach(() => {
    pointPresentationModule = new PointPresentationModule();
  });

  it('should create an instance', () => {
    expect(pointPresentationModule).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailRequestPage } from './detail-request.page';

describe('DetailRequestPage', () => {
  let component: DetailRequestPage;
  let fixture: ComponentFixture<DetailRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

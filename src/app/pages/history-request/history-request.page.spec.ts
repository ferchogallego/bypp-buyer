import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryRequestPage } from './history-request.page';

describe('HistoryRequestPage', () => {
  let component: HistoryRequestPage;
  let fixture: ComponentFixture<HistoryRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotesReceivedPage } from './quotes-received.page';

describe('QuotesReceivedPage', () => {
  let component: QuotesReceivedPage;
  let fixture: ComponentFixture<QuotesReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesReceivedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

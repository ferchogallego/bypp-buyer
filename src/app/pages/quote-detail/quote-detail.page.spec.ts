import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuoteDetailPage } from './quote-detail.page';

describe('QuoteDetailPage', () => {
  let component: QuoteDetailPage;
  let fixture: ComponentFixture<QuoteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

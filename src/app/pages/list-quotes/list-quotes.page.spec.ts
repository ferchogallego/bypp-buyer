import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListQuotesPage } from './list-quotes.page';

describe('ListQuotesPage', () => {
  let component: ListQuotesPage;
  let fixture: ComponentFixture<ListQuotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

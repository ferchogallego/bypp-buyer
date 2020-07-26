import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataSellerPage } from './data-seller.page';

describe('DataSellerPage', () => {
  let component: DataSellerPage;
  let fixture: ComponentFixture<DataSellerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSellerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

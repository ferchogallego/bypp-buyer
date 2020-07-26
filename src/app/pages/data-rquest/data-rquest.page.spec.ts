import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataRquestPage } from './data-rquest.page';

describe('DataRquestPage', () => {
  let component: DataRquestPage;
  let fixture: ComponentFixture<DataRquestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRquestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataRquestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

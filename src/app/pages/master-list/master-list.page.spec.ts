import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterListPage } from './master-list.page';

describe('MasterListPage', () => {
  let component: MasterListPage;
  let fixture: ComponentFixture<MasterListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

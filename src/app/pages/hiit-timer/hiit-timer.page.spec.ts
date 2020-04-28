import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HiitTimerPage } from './hiit-timer.page';

describe('HiitTimerPage', () => {
  let component: HiitTimerPage;
  let fixture: ComponentFixture<HiitTimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiitTimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HiitTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

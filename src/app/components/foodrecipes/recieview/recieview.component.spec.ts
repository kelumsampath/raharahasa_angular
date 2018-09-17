import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieviewComponent } from './recieview.component';

describe('RecieviewComponent', () => {
  let component: RecieviewComponent;
  let fixture: ComponentFixture<RecieviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

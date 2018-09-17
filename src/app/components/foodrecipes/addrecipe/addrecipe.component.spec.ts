import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecipeComponent } from './addrecipe.component';

describe('AddrecipeComponent', () => {
  let component: AddrecipeComponent;
  let fixture: ComponentFixture<AddrecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

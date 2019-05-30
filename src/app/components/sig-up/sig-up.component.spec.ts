import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigUpComponent } from './sig-up.component';

describe('SigUpComponent', () => {
  let component: SigUpComponent;
  let fixture: ComponentFixture<SigUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

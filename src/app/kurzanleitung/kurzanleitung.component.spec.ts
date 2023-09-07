import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KurzanleitungComponent } from './kurzanleitung.component';

describe('KurzanleitungComponent', () => {
  let component: KurzanleitungComponent;
  let fixture: ComponentFixture<KurzanleitungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KurzanleitungComponent]
    });
    fixture = TestBed.createComponent(KurzanleitungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

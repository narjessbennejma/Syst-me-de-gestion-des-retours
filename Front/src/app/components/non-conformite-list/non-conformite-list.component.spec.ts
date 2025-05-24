import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformiteListComponent } from './non-conformite-list.component';

describe('NonConformiteListComponent', () => {
  let component: NonConformiteListComponent;
  let fixture: ComponentFixture<NonConformiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonConformiteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonConformiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

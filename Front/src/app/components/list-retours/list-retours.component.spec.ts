import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRetoursComponent } from './list-retours.component';

describe('ListRetoursComponent', () => {
  let component: ListRetoursComponent;
  let fixture: ComponentFixture<ListRetoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRetoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRetoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

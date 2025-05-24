import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoursClientComponent } from './retours-client.component';

describe('RetoursClientComponent', () => {
  let component: RetoursClientComponent;
  let fixture: ComponentFixture<RetoursClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoursClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetoursClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

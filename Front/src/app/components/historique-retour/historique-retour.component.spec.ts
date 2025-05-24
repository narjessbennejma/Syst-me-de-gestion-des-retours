import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRetourComponent } from './historique-retour.component';

describe('HistoriqueRetourComponent', () => {
  let component: HistoriqueRetourComponent;
  let fixture: ComponentFixture<HistoriqueRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueRetourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

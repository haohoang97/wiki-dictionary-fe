import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateSentencesComponent } from './translate-sentences.component';

describe('TranslateSentencesComponent', () => {
  let component: TranslateSentencesComponent;
  let fixture: ComponentFixture<TranslateSentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateSentencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

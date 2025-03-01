import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseIndexComponent } from './base-index.component';

describe('BaseIndexComponent', () => {
  let component: BaseIndexComponent;
  let fixture: ComponentFixture<BaseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConntactListComponent } from './conntact-list.component';

describe('ConntactListComponent', () => {
  let component: ConntactListComponent;
  let fixture: ComponentFixture<ConntactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConntactListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConntactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsortingComponent } from './testsorting.component';

describe('TestsortingComponent', () => {
  let component: TestsortingComponent;
  let fixture: ComponentFixture<TestsortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestsortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestsortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

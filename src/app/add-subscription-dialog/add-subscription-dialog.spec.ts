import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionDialog } from './add-subscription-dialog';

describe('AddSubscriptionDialog', () => {
  let component: AddSubscriptionDialog;
  let fixture: ComponentFixture<AddSubscriptionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubscriptionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscriptionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

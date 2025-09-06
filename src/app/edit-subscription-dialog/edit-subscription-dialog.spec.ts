import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriptionDialog } from './edit-subscription-dialog';

describe('EditSubscriptionDialog', () => {
  let component: EditSubscriptionDialog;
  let fixture: ComponentFixture<EditSubscriptionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubscriptionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubscriptionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPostingComponent } from './items-posting.component';

describe('ItemsPostingComponent', () => {
  let component: ItemsPostingComponent;
  let fixture: ComponentFixture<ItemsPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsPostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

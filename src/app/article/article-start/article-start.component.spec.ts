import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleStartComponent } from './article-start.component';

describe('ArticleStartComponent', () => {
  let component: ArticleStartComponent;
  let fixture: ComponentFixture<ArticleStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

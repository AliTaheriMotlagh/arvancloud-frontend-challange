import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ArticleService } from 'src/app/services';

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss'],
})
export class TagManagerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  form = this.fb.group({
    newTag: [''],
  });

  selectedTags: string[] = [];
  list: string[] = [];

  @Output() tagList = new EventEmitter<string[]>();
  @Input() set loadedTags(v: string[]) {
    if (v) {
      this.selectedTags = this.selectedTags.concat(v);
    }
  }

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.getAllTags();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAllTags() {
    this.articleService
      .AllTags()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.list = result.tags.sort();
      });
  }

  addNewTag() {
    if (this.form.valid) {
      const newTag = this.form.getRawValue().newTag!;
      if (!newTag.trim()) {
        this.form.reset();
        return;
      }
      const isExist = this.list.find((i) => i == newTag);
      if (isExist) {
        this.form.reset();
        return;
      }
      this.list.push(newTag);
      this.tagClickHandler(newTag);
      this.form.reset();
    }
  }

  tagClickHandler(tag: string) {
    if (this.selectedTags.find((i) => i === tag)) {
      this.selectedTags = this.selectedTags.filter((i) => i !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.tagList.emit(this.selectedTags);
  }

  isSelect(tag: string) {
    return this.selectedTags.find((i) => i === tag);
  }
}

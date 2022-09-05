import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    body: [''],
    tagList: [['']],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  save() {}

  tagListUpdate(result: string[]) {
    this.form.controls.tagList.patchValue(result);
  }
}

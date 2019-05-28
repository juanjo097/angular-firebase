import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInput } from '@angular/material';
import { BookService } from '../../shared/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetBookForm') NgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedBindingType: string;
  bookForm: FormGroup;

  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];
    

  constructor() { }

  ngOnInit() {
  }

}

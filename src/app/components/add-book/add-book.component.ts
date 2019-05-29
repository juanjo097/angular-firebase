import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { BookService } from '../../shared/book.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export interface Lenguage {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit
{

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Lenguage[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetBookForm') NgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedBindingType: string;

  bookForm: FormGroup;

  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  constructor(public fb: FormBuilder, private bookAPI: BookService) { }

  ngOnInit()
  {
    this.bookAPI.GetBookList();
    this.submitBookForm();
  }

  /* Remove dynamic languages */
  remove(lenguage : Lenguage) : void
  {
    const index = this.languageArray.indexOf(lenguage);

    if(index  >= 0)
    {
      this.languageArray.splice(index,1);
    }

  }

  /*NgForm to send data*/
  submitBookForm()
  {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray]
    })
  }

  /* Handler errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic lenguages */
  add(event : MatChipInputEvent):void
  {
    const input = event.input;
    const value = event.value;

    //add a new lenguage
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() })
    }
    if (input) {
      input.value = '';
    }

  }

  /*Format to date type*/
  formatDate(e)
  {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.bookForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    });
  }

  /* Reset form */
  resetForm()
  {
    this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.controls[key].setErrors(null)
    });
  }

  /* Submit form with data if valid*/
  submitBook()
  {
    if (this.bookForm.valid){
      console.log(this.bookForm.value);
      this.bookAPI.AddBook(this.bookForm.value);
      this.resetForm();
      console.log('Success', this.bookForm.value);
    }
    else
    {
      console.log('Error submit', this.bookForm.value);
      console.log('Available lenguages : ');
    }
  }

}

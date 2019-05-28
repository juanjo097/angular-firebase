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
export class AddBookComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Lenguage[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetBookForm') NgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  selectedBindingType: string;
  bookForm = new FormGroup({
    book_name: new FormControl('ddd', [Validators.required]),
    isbn_10: new FormControl('ddd', [Validators.required]),
    author_name: new FormControl('dddddd', [Validators.required]),
    publication_date: new FormControl('', [Validators.required]),
    binding_type: new FormControl('dddd', [Validators.required]),
    in_stock: new FormControl('Yes'),
    languages: new FormControl(this.languageArray)
  });

  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];


  constructor(public fb: FormBuilder, private bookAPI: BookService) { }

  ngOnInit() {
    this.bookAPI.GetBookList();
    //this.sub
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
    this.bookForm;
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
  resetForm() {
    this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.controls[key].setErrors(null)
    });
  }

  /* Submit form with data*/
  submitBook() {
  if (this.bookForm.valid){
    this.bookAPI.AddBook(this.bookForm.value)
    this.resetForm();
    console.log('Success', this.bookForm.value);
  }
  else
  {
    console.log('Error submit', this.bookForm.value);
  }
}




}

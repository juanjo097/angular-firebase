import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { BookService } from '../../shared/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  languageArray: Language[] = [];

  @ViewChild('chipList') chipList;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editBookForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(private fb : FormBuilder,
              private location: Location,
              private API : BookService,
              private actvR: ActivatedRoute,
              private route: Router)
              {

                let id = this.actvR.snapshot.paramMap.get('id');
                this.API.GetBook(id).valueChanges().subscribe((data)=>{
                  console.log(data)
                  this.languageArray = data.lenguages;
                  this.editBookForm.setValue(data);
                },
                (error)=>
                {
                  console.log(error);
                });
              }

  //update formm
  updateBookForm()
  {
    this.editBookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      lenguages: ['']
    });
  }

  // a lenguageeee
  add(event: MatChipInputEvent): void
  {

    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5)
    {
      this.languageArray.push({name: value.trim()});
    }
    // To reset initial values
    if (input)
    {
      input.value = '';
    }

  }

  //remove lenguageeee
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);

    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }

  }

  //get and handling errors
  public handleError = (controlName: string, errorName: string) =>
  {
    return this.editBookForm.controls[controlName].hasError(errorName);
  }

  // format date
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editBookForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  goBack(){
    this.location.back();
  }

  updateBook() {
    var id = this.actvR.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
      this.API.UpdateBook(id, this.editBookForm.value);
      this.route.navigate(['books-list']);
    }
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../shared/book';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent
{

  dataSource : MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  BookData : any = [];

  //colums for show in table header
  displayedColumns: any[] = [
  '$key',
  'book_name',
  'author_name',
  'publication_date',
  'in_stock',
  'action'
  ];

  constructor(private bookAPI: BookService)
  {
    //Data table source
    this.bookAPI.GetBookList().snapshotChanges().subscribe(books =>
    {
      books.forEach(item =>{
        let a = item.payload.toJSON();
        
        a['$key'] = item.key;

        this.BookData.push(a as Book);
      })
    });
    this.dataSource = new MatTableDataSource(this.BookData);

    /* Pagination */
    setTimeout(()=>
    {
      this.dataSource.paginator = this.paginator;
    });
  }

  //Delete a book
  deleteBook(index: number, e)
  {
    if(window.confirm('Are you sure?'))
    {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + 1);
      this.dataSource.data = data;
      this.bookAPI.DeleteBook(e.$key);
    }
  }



}

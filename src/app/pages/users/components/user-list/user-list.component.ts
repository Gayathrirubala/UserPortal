import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../../shared/models/user.model';
import { SharedModule } from '../../../../shared/shared.module';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, MatPaginator],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit ,AfterViewInit {
  users: any[] = [];
  userListData: any[] = [];

  search = new FormControl('');
  error = '';

  displayedColumns: string[] = ['id', 'name', 'email','phone','company'];

  dataSource =new MatTableDataSource(this.userListData);
  


   @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.service.getUsers().subscribe({
      next: (data:any)=> {
        this.users = data;
        this.userListData = data;
        console.log(this.userListData)
        this.dataSource=new MatTableDataSource(this.userListData);
        this.dataSource.paginator=this.paginator
      },
      error: err => this.error = err
    });

    this.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.userListData = this.users.filter(u =>
          u.name.toLowerCase().includes(value?.toLowerCase())
        );
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.userListData);
    this.dataSource.paginator = this.paginator;
    this.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.applyFilter(value || '');
      });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewDetails(user: User) {
    this.router.navigate(['/user', user.id]);
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})


export class UserDetailComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService,private router :Router) {
    this.user=[]
  }


  ngOnInit() {
     const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe(data => {
      if(data?.id){
      this.user = data; 
      }
    },
  error=>{
    console.log('record not found');
  });
  }

  backtoUserList(){
    this.router.navigate(['/']);
    
  }
}

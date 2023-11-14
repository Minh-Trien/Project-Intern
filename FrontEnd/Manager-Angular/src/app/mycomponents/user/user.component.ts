import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import {UserService} from "src/app/service/UserService/user.service"
import { User } from 'src/app/model/user.model';
import { cilListNumbered, cilPaperPlane, brandSet, cilUnderline } from '@coreui/icons';
import { isNull } from 'lodash-es';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  user : User = {
    id : undefined,
    email : '',
    password :'',
    firstName :'',
    lastName :'',
    phone :'',
    address :''
  };
  currentUser: User = {};
  currentIndex = -1;
  submitted = false;
  addOrUpdate = true;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  searchTerm= "";
  private searchTerm$ = new Subject<string>();
  private searchTimeout: any;
  public liveDemoVisible = false;
  sortBy ="id"
  sortOrder = "asc"
  constructor(private userService : UserService) {  
  }

   ngOnInit()  {
      this.retrieveUsers(this.page);
     if(this.liveDemoVisible){
      if(this.addOrUpdate){     
      }else{     
      }
     }else{
      this.user.id = undefined,
      this.user.email = '' ,
      this.user.password = '',
      this.user.firstName  = '',
      this.user.lastName= "",
      this.user.phone= undefined,
      this.user.address= ''
     }
 }
    
  retrieveUsers(page:any) {
        this.userService.getAll(page)
          .subscribe({
            next: (data) => {   
              this.users = data.data.$values ;
              this.count = data.totalItems;
              this.pageSize = data.pageSize;
              console.log(data)
            },
            error: (e) => console.error(e)
          });
      }
      handlePageChange(event: number): void {
        this.page = event;
        console.log(this.page)
        this.retrieveUsers(this.page);
      }
      toggleLiveDemo() {
        this.liveDemoVisible = !this.liveDemoVisible;
        this.addOrUpdate = true;
        this.newuser();
      }
      handleLiveDemoChange(event: boolean) {
        this.liveDemoVisible = event;
      }
      saveUser(): void {
        const data = {
          Email : this.user.email,
          Password: this.user.password,
          FirstName: this.user.firstName,
          LastName: this.user.lastName,
          Phone: this.user.phone,
          Address: this.user.address,
        };
        this.userService.create(data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
              this.handleUpdateTable()
            },
            error: (e) => console.error(e)
          });
        this.liveDemoVisible = !this.liveDemoVisible;
      }
       handleUpdateTable =  () => {
        this.retrieveUsers(this.page);
      }

      newuser(): void {
        this.user = {
          id : undefined,
          email : '',
          password :'',
          firstName :'',
          lastName :'',
          phone :'',
          address :''
        };
      }

      getId(id:any) : void{
        this.userService.get(id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.user.id = data.id,
            this.user.email =data.email ,
            this.user.firstName = data.firstName,
            this.user.lastName  =data.lastName,
            this.user.phone = data.phone ,
            this.user.address = data.address,
            this.user.password= data.password
          },
          error: (e) => console.error(e)
        }
      );
      }
      handleSearch(): void {
        console.log(this.searchTerm)
        if(this.searchTerm){
        this.userService.getSearch(this.searchTerm, this.page)
        .subscribe({
          next:(data) =>{
            this.users = data.data;
            this.pageSize = data.pageSize;
          } 
        })}else{
          this.retrieveUsers(1);
        }
      }
      onSearchInputChange(searchTerm: string) {
        clearTimeout(this.searchTimeout);
        // Lưu giá trị tìm kiếm vào biến searchTerm
        this.searchTerm = searchTerm;    
        // Tạo một timeout mới sau 2 giây
        this.searchTimeout = setTimeout(() => {
          this.handleSearch();
        }, 1000);
      }
      update(id:any) : void {
        this.addOrUpdate= false;
        this.liveDemoVisible = true;
        this.getId(id);

      }
      
       saveUpdate(id:any) : void{
        const data = {
          Email : this.user.email,
          Password: this.user.password,
          FirstName: this.user.firstName,
          LastName: this.user.lastName,
          Phone: this.user.phone,
          Address: this.user.address,
        };
        console.log(data)
        this.userService.update(this.user.id,data).subscribe({
            next: (data) => {
              console.log(data); 
              this.user = data
              this.getId(id)
              this.handleUpdateTable()
            },
            error: (e) => console.error(e)
       });
      this.liveDemoVisible = !this.liveDemoVisible;
      }
    handleSort(sortby:any, sortOrder:any) : void {
      this.sortBy = sortby;
      this.sortOrder = sortOrder;
      this.userService.getSort(this.sortBy, this.sortOrder, this.page)
      .subscribe({
        next: (data)=>{
          this.users = data.data;
          console.log(data);
          this.pageSize = data.pageSize;
        }
      })
    }
  
}
    


  
    

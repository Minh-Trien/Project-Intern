import { Component, OnInit } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import {ProductService} from "src/app/service/ProductService/product.service"
import { Product } from 'src/app/model/product.model';
import { cilListNumbered, cilPaperPlane, brandSet, cilUnderline } from '@coreui/icons';
import { isNull } from 'lodash-es';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit{
  products: Product[] = [];
  product : Product = {
    id : undefined,
    taskId : undefined,
    name: '',
    price: undefined,
    hidden: true,
    quanlity: undefined,
    image: '',
    descriptions: ''
  };


  currentProduct: Product = {};
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

  constructor(private productService : ProductService) {
    
  
  }

   ngOnInit()  {
      this.retrieveProducts(this.page);
     if(this.liveDemoVisible){
      if(this.addOrUpdate){     
      }else{     
      }
     }else{
      this.product.id = undefined,
      this.product.taskId = undefined ,
      this.product.name = '',
      this.product.price  = undefined,
      this.product.hidden= true,
      this.product.quanlity= undefined,
      this.product.image= '',
      this.product.descriptions =''
     }
      }
    
  retrieveProducts(page:any) {
        this.productService.getAll(page)
          .subscribe({
            next: (data) => {   
              this.products = data.data.$values ;
              this.count = data.totalItems;
              this.pageSize = data.pageSize;
              console.log(data.data)
            },
            error: (e) => console.error(e)
          });
      }
      handlePageChange(event: number): void {
        this.page = event;
        console.log(this.page)
        this.retrieveProducts(this.page);
      }
      toggleLiveDemo() {
        this.liveDemoVisible = !this.liveDemoVisible;
        this.addOrUpdate = true;
        this.newproduct();
      }
      handleLiveDemoChange(event: boolean) {
        this.liveDemoVisible = event;
      }
      saveProduct(): void {
        const data = {
          taskId : this.product.taskId,
          name: this.product.name,
          price: this.product.price,
          hidden: this.product.hidden,
          quanlity: this.product.quanlity,
          image: this.product.image,
          descriptions: this.product.descriptions
        };
        this.productService.create(data)
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
        this.retrieveProducts(this.page);
      }

      newproduct(): void {
        this.product = {
          taskId: undefined,
          name: '',
          price: undefined,
          hidden: false,
          quanlity: undefined,
          image: '',
          descriptions: ''
        };
      }

      getId(id:any) : void{
        this.productService.get(id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.product.id = data.id,
            this.product.taskId =data.taskId ,
            this.product.name = data.name,
            this.product.price  =data.price,
            this.product.hidden=data.hidden ,
            this.product.quanlity= data.quanlity,
            this.product.image= data.image,
            this.product.descriptions =data.descriptions
          },
          error: (e) => console.error(e)
        }
      );
      }
      handleSearch(): void {
        console.log(this.searchTerm)
        if(this.searchTerm){
        this.productService.getSearch(this.searchTerm, this.page)
        .subscribe({
          next:(data) =>{
            this.products = data.data;
            this.pageSize = data.pageSize;
          } 
        })}else{
          this.retrieveProducts(1);
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
          id : this.product.id,
          taskId : this.product.taskId,
          name: this.product.name,
          price: this.product.price,
          hidden: this.product.hidden,
          quanlity: this.product.quanlity,
          image: this.product.image,
          descriptions: this.product.descriptions
        };
        console.log(data)
        this.productService.update(this.product.id,data).subscribe({
            next: (data) => {
              console.log(data); 
              this.product = data
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
      this.productService.getSort(this.sortBy, this.sortOrder, this.page)
      .subscribe({
        next: (data)=>{
          this.products = data.data;
          console.log(data);
          console.log(this.products);
          this.pageSize = data.pageSize;
        }
      })
    }

    hidden(id:any) : void {
    this.productService.hidden(id)
    .subscribe({
      next: (data) =>{    
        this.handleUpdateTable()
      }
    })
    
  }
  
}
    


  
    

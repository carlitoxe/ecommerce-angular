import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component'
import { Product } from '@shared/models/product.model'
import { HeaderComponent } from '@shared/components/header/header.component'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  products = signal<Product[]>([])
  categories = signal<Category[]>([])
  // cart = signal<Product[]>([])
  private cartService = inject(CartService)
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  @Input() category_id?: string

  ngOnInit() {
    this.getProducts()
    this.getCategories()
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.category_id)
    this.getProducts()

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products)
      },
      error: () => {
        console.error('An error has ocurred');
      }
    })
  }

  private getCategories() {
    this.categoryService.getCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories)
      },
      error: () => {
        console.error('An error has ocurred');
      }
    })
  }

  // constructor() {
  //   const initProducts: Product[] = [
  //     {
  //       id: Date.now(),
  //       title: 'Product 1',
  //       price: 200,
  //       image: 'https://picsum.photos/640/640?r=23',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product 2',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=12',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product 3',
  //       price: 300,
  //       image: 'https://picsum.photos/640/640?r=99',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product 1',
  //       price: 200,
  //       image: 'https://picsum.photos/640/640?r=23',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product 2',
  //       price: 100,
  //       image: 'https://picsum.photos/640/640?r=12',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Product 3',
  //       price: 300,
  //       image: 'https://picsum.photos/640/640?r=99',
  //       createdAt: new Date().toISOString()
  //     },
  //   ]
  //   this.products.set(initProducts)
  // }

}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component'
import { Product } from '@shared/models/product.model'
import { HeaderComponent } from '@shared/components/header/header.component'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([])
  // cart = signal<Product[]>([])
  private cartService = inject(CartService)
  private productService = inject(ProductService)

  ngOnInit() {
    this.productService.getProducts()
    .subscribe({
      next: (products) => {
        this.products.set(products)
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

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}

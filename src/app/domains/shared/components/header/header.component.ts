import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true)
  // @Input({ required: true }) cart: Product[] = []
  // total = signal(0)
  private cartService = inject(CartService)
  cart = this.cartService.cart
  total = this.cartService.total

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState)
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const cart = changes['cart']
  //   if (cart) {
  //     this.total.set(this.getTotal())
  //   }
  // }

  // getTotal() {
  //   return this.cart.reduce((total, product) => total + product.price, 0)
  // }

}

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GeneratorInvoice';
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const navbar = document.querySelector('.navbar-menu');
    if (navbar) {
      navbar.classList.toggle('active');
    }
  }

  navigateToCreateInvoice() {
    this.router.navigate(['/invoices/create']);
  }
}

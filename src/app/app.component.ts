import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './public/master-page/footer/footer.component';
import { NavbarComponent } from './public/master-page/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SecurityService } from './services/security.service';
import { UserRegisterService } from './services/user-register.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SecurityService, UserRegisterService]
})
export class AppComponent {
  title = 'Gestión-Practicantes';
}

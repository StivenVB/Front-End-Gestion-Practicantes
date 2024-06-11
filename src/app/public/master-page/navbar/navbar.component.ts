import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../../services/security.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged: Boolean = false;
  role: number = 1;
  name: String | undefined = '';
  navbarOpen: boolean = false;

  private subscription!: Subscription;

  constructor(private service: SecurityService) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      this.role = data.role ?? 0;
      this.name = data.name;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



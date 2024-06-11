import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../../services/security.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  isLogged: Boolean = false;
  role: number = 0;
  
  private subscription!: Subscription;

  constructor(private service: SecurityService) { }

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe(data => {
      this.isLogged = data.isLogged;
      this.role = data.role ?? 0;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

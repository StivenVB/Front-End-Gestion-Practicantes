import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent implements OnInit {

  constructor(private service: SecurityService, private router: Router) { }

  ngOnInit(): void {
    this.service.Logout();
    this.router.navigate(["/home"]);
  }

}
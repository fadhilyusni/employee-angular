import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
  onSignedOut(): void {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-panel',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {

  public authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}

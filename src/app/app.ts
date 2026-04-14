import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GenesysCloudService } from './services/genesys-cloud.service';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  loading = signal(false);
  authenticated = signal(false);
  error = signal<string | null>(null);
  userMe = signal<any>(null);
  orgMe = signal<any>(null);

  constructor(private gc: GenesysCloudService) {
    // Handle the PKCE callback if we're returning from Genesys login
    if (window.location.search.includes('code=')) {
      this.loading.set(true);
      this.gc
        .login()
        .then(() => {
          this.authenticated.set(true);
          this.loading.set(false);
          this.fetchData();
        })
        .catch((err: any) => {
          this.error.set(err?.message || 'Authentication failed');
          this.loading.set(false);
        });
    }
  }

  // --- Uncomment ngOnInit and remove the constructor logic above to auto-redirect on load ---
  // ngOnInit(): void {
  //   this.loading.set(true);
  //   this.gc
  //     .login()
  //     .then(() => {
  //       this.authenticated.set(true);
  //       this.loading.set(false);
  //       this.fetchData();
  //     })
  //     .catch((err: any) => {
  //       this.error.set(err?.message || 'Authentication failed');
  //       this.loading.set(false);
  //     });
  // }

  login(): void {
    this.loading.set(true);
    this.error.set(null);
    this.gc
      .login()
      .then(() => {
        this.authenticated.set(true);
        this.loading.set(false);
        this.fetchData();
      })
      .catch((err: any) => {
        this.error.set(err?.message || 'Authentication failed');
        this.loading.set(false);
      });
  }

  private fetchData(): void {
    this.gc.getUsersMe().then((user: any) => this.userMe.set(user));
    this.gc.getOrganizationsMe().then((org: any) => this.orgMe.set(org));
  }

  logout(): void {
    this.gc.logout();
  }
}

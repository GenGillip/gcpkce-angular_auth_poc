import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import platformClient from 'purecloud-platform-client-v2';

@Injectable({ providedIn: 'root' })
export class GenesysCloudService {
  private client = platformClient.ApiClient.instance;
  private usersApi = new platformClient.UsersApi();
  private orgApi = new platformClient.OrganizationApi();

  private readonly clientId = environment.genesysCloud.clientId;
  private readonly region = environment.genesysCloud.region;
  private readonly redirectUri = window.location.origin + window.location.pathname;

  constructor() {
    this.client.setEnvironment(this.region);
  }

  login(): Promise<any> {
    return this.client.loginPKCEGrant(this.clientId, this.redirectUri, {});
  }

  get isAuthenticated(): boolean {
    return !!(this.client as any).authData?.accessToken;
  }

  getUsersMe(): Promise<any> {
    return this.usersApi.getUsersMe();
  }

  getOrganizationsMe(): Promise<any> {
    return this.orgApi.getOrganizationsMe();
  }

  logout(): void {
    this.client.logout(this.redirectUri);
  }
}

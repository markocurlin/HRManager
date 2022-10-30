import { UserProfile } from './user-profile';
import { SimpleClaim } from './simple-claim';

export class AuthContext {
  claims: SimpleClaim[] | undefined;
  userProfile: UserProfile | undefined;

  get isAdmin() {
    return !!this.claims && !!this.claims.find(c =>
      c.type === 'role' && c.value === 'Admin');
  }

  get canEdit() {
    return !!this.claims && !!this.claims.find(c =>
      c.type === 'role' && (c.value === 'Admin' || c.value === 'Edit'));
  }
}
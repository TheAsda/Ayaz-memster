export interface User {
  username: string;
  role: 'unknown' | 'viewer' | 'editor' | 'admin';
}

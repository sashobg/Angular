export interface Roles {
    reader: boolean;
    admin?:  boolean;
  }
  
  export interface User {
      uid: string;
      email: string;
      roles: Roles

  }
  
import { SearchData } from '../../models/searchData.model';
import { User } from '../../models/user.model';

const prefix = '[Auth]';

export class SetUserAction {
  static readonly type = `${prefix} Set User`;
  constructor(public user: User) { }
}

export class SetRedirectAction {
  static readonly type = `${prefix} Set Redirect`;
  constructor(public redirect: string) { }
}

export class GetUserAction {
  static readonly type = `${prefix} Get User`;
  constructor(public id: number) { }
}

export class LoginAction {
  static readonly type = `${prefix} Login User`;
  constructor(public email: string, public pwd: string) { }
}

export class LogoutAction {
  static readonly type = `${prefix} Logout User`;
}

export class RegisterAction {
  static readonly type = `${prefix} Register User`;
  constructor(public newUser: User) { }
}

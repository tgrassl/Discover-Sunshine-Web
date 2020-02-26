import { SearchData } from '../../models/searchData.model';
import { User } from '../../models/user.model';

const prefix = '[Auth]';

export class SetUserAction {
  static readonly type = `${prefix} Set User`;
  constructor(public user: User) { }
}

export class LoginAction {
  static readonly type = `${prefix} Login User`;
  constructor(public searchData: SearchData) { }
}

export class RegisterAction {
  static readonly type = `${prefix} Login User`;
  constructor(public newUser: User) { }
}

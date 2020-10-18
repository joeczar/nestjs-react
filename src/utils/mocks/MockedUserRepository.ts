import User from "src/user/user.entity";
import { Repository } from "typeorm";

export class UserRepo extends Repository<User> {}
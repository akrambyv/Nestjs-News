import { Request } from "express";
import { UserEntity } from "src/entities/User.entitiy";

export interface AuthorizedUser extends Request{
    user: UserEntity;
}
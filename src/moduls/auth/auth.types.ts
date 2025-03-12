import { Request } from "express";
import { UserEntity } from "src/entities/User.entitiy";

export interface AuthorizedRequest extends Request{
    user: UserEntity;
}
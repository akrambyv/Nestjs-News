import { SetMetadata } from "@nestjs/common"
import { UserRole } from "src/moduls/user/user.types";

export const Roles = (...roles: UserRole[]) => {
    return SetMetadata('roles', roles);
}
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthSignInDto } from "./dto/auth-signin.dto";
import { Throttle } from "@nestjs/throttler";

@Controller('auth')
@Throttle({ default: { ttl: 60000, limit: 5 } })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    signIn(@Body() body: AuthSignInDto) {
        return this.authService.signIn(body)
    }

    @Post('register')
    register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body)
    }
}
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlphanumeric, IsEnum, IsOptional, IsString, Length, MinLength } from "class-validator";
import { UserGender } from "src/moduls/user/user.types";

export class AuthRegisterDto {
    @Type()
    @IsString()
    @Length(3, 30)
    @IsAlphanumeric()
    @ApiProperty({ default: "Ekrem" })
    username: string;

    @Type()
    @IsString()
    @MinLength(6)
    @ApiProperty({ default: "123456" })
    password: string;

    @Type()
    @IsEnum(UserGender)
    @ApiProperty({ default: UserGender.MALE })
    gender: UserGender;

    @Type()
    @IsString()
    @IsOptional()
    @ApiProperty({ nullable: true, default: 'Ekrem Abiyev' })
    fullName: string;
}
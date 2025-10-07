import { IsString } from "class-validator";

export class ResetPasswordDTO  {
    @IsString()
    accessToken: string;

    @IsString()
    password: string;

    @IsString()
    refreshToken: string
}
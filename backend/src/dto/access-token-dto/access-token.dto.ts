import { IsString } from "class-validator";

export class AccessTokenDTO {
    @IsString()
    accessToken: string;

    @IsString()
    refreshToken: string;
}
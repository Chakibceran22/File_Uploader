import { IsEmail, IsString } from "class-validator";

export class EmailDTO {
    @IsString()
    @IsEmail()
    email:string;
}
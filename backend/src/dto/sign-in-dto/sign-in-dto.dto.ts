import { SignUpDto } from "../sign-up-dto/sign-up-dto.dto";
import { OmitType } from "@nestjs/mapped-types";
export class SignInDto extends OmitType(SignUpDto, ['username'] as const){}

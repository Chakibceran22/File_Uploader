import { Body, Controller, HttpCode, HttpStatus, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/sign-up-dto/sign-up-dto.dto';
import { SignInDto } from 'src/dto/sign-in-dto/sign-in-dto.dto';
import { ResendEmailDTO } from 'src/dto/resend-email-dto/resend-email.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() userInput: SignUpDto) {
        return await this.authService.signUp(userInput)
    }

    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signIn(@Body() userInput : SignInDto) {
        return await this.authService.signIn(userInput)
    }

    @Post('resendlink')
    @HttpCode(HttpStatus.OK)
    async resendConfirmationLink(@Body() {email}: ResendEmailDTO){
        await this.authService.resendEmailConfirmationLink(email)
    }
}

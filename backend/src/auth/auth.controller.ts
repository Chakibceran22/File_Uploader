import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/sign-up-dto/sign-up-dto.dto';
import { SignInDto } from 'src/dto/sign-in-dto/sign-in-dto.dto';
import { AccessTokenDTO } from 'src/dto/access-token-dto/access-token.dto';
import { EmailDTO } from 'src/dto/email-dto/email.dto';
import { ResetPasswordDTO } from 'src/dto/reset-password-dto/reset-password.dto';
import { JwtAuthGuard } from 'src/guards/jwt-toekn.guard';

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
    async resendConfirmationLink(@Body() {email}: EmailDTO){
        await this.authService.resendEmailConfirmationLink(email)
    }

    @Post('sendToken')
    async sendToken(@Body() confirmedToken: AccessTokenDTO) {
        return await this.authService.verifyEmailToken(confirmedToken)
    }

    @Post('send-reset-link')
    async sendResetLink(@Body() {email} : EmailDTO) {
        return await this.authService.sendPasswordResetLink(email)
    }

    @Post('reset-password')
    async resetPassword(@Body() userInput: ResetPasswordDTO) {
        return await this.authService.resetPassword(userInput)
    }

    @Get('verify-token')
    @UseGuards(JwtAuthGuard)
    async veifiyToken() {
        return {valid: true}
    }

    @Get('google')
    async googleLogin() {
        return await this.authService.googleLogin()
    }

}

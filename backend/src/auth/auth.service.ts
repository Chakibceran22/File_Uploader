import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDTO } from 'src/dto/access-token-dto/access-token.dto';
import { EmailDTO } from 'src/dto/email-dto/email.dto';
import { ResetPasswordDTO } from 'src/dto/reset-password-dto/reset-password.dto';

import { SignInDto } from 'src/dto/sign-in-dto/sign-in-dto.dto';
import { SignUpDto } from 'src/dto/sign-up-dto/sign-up-dto.dto';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService,
    private readonly configService : ConfigService,
    private readonly jwtService: JwtService
  ) {}
  async signUp(userInput: SignUpDto) {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email: userInput.email,
      password: userInput.password,
      options: {
        emailRedirectTo: this.configService.get('AUTH_CALLBACK_URL'),
        data: {
            
          username: userInput.username,
        },
      },
    });
    if (error) {
      throw new UnauthorizedException(error.message);
    }
    // if (!data.user || !data.session) {
    //   throw new ConflictException(
    //     'An account with this email already exists. Please sign in instead.',
    //   );
    // }
    return data;
  }

  async verifyEmailToken(token: AccessTokenDTO) {
    const {accessToken, refreshToken} = token
    const {data, error} = await this.supabaseService.client.auth.getUser(accessToken)
    if(error) {
      throw new UnauthorizedException(error.message)
    }

    const payload :PayloadDTO = {
      sub: data.user.id,
      email: data.user.email || '',
      username: data.user.user_metadata.username
    }

    const session = await this.jwtService.signAsync(payload)
    
    return {
      session
    }

  }
  async sendPasswordResetLink(email: string) {
    const {data, error} = await this.supabaseService.client.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: this.configService.get('AUTH_CALLBACK_URL')
      }
    )
    if( error) {
      throw new UnauthorizedException(error.message)
    }

    return {
      success: true,
      message: 'Password reset link sent successfully'
    }

  }

  async resendEmailConfirmationLink( email: string) {
    const {data, error} = await this.supabaseService.client.auth.resend({
        type:'signup',
        email,
        options:{
            emailRedirectTo: this.configService.get('AUTH_CALLBACK_URL')
        }
    })
    if(error){
      throw new UnauthorizedException(error.message)
    }

  }
  async resetPassword(resetPassword: ResetPasswordDTO){
    const {data:sessionData, error: sessionError} = await this.supabaseService.client.auth.setSession({
      access_token: resetPassword.accessToken,
      refresh_token: resetPassword.refreshToken

    })

    if(sessionError) {
      throw new UnauthorizedException(sessionError.message)
    }
    const {data , error} = await this.supabaseService.client.auth.updateUser({
      password: resetPassword.password
    })

    if( error){
      throw new BadRequestException(error.message)
    }
    return {
      success: true,
      message: "Password Reset Successful"
    }
  }

  async signIn(userInput: SignInDto){
    const {data, error} = await this.supabaseService.client.auth.signInWithPassword({
        email: userInput.email,
        password: userInput.password
    })
    if(error) {
        throw new UnauthorizedException(error.message)
    }
    const  payload: PayloadDTO = {
      sub: data.user.id,
      email: data.user.email || '',
      username: data.user.user_metadata?.username

    }
    const session = await this.jwtService.signAsync(payload)
    return {
      session
    }

  }

  async googleLogin() {
    const {data, error} =await this.supabaseService.client.auth.signInWithOAuth({
      provider: 'google',
      options :{
        redirectTo: this.configService.get('AUTH_CALLBACK_URL')
      }
    })
    if(error) {
      throw new BadRequestException(error.message)
    }

    return {url : data.url}
  }
}

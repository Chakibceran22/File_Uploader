import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { IsEmail } from 'class-validator';
import { retry } from 'rxjs';
import { SignInDto } from 'src/dto/sign-in-dto/sign-in-dto.dto';
import { SignUpDto } from 'src/dto/sign-up-dto/sign-up-dto.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService,
    private readonly configService : ConfigService
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

  async resendEmailConfirmationLink( email: string) {
    const {data, error} = await this.supabaseService.client.auth.resend({
        type:'signup',
        email,
        options:{
            emailRedirectTo: this.configService.get('AUTH_CALLBACK_URL')
        }
    })

  }

  async signIn(userInput: SignInDto){
    const {data, error} = await this.supabaseService.client.auth.signInWithPassword({
        email: userInput.email,
        password: userInput.password
    })
    if(error) {
        throw new UnauthorizedException(error.message)
    }
    return data

  }
}

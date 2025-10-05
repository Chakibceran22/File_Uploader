import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SupabaseService {
    private readonly supabaseClient: SupabaseClient

    constructor(private configService: ConfigService){
        this.supabaseClient = createClient(
            this.configService.get('SUPABASE_URL') || '',
            this.configService.get('SUPABASE_KEY') || ''
        )
    }

    get client() : SupabaseClient {
        return this.supabaseClient
    }
}

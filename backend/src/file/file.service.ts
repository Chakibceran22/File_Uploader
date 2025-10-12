import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FolderDTO } from 'src/dto/folder-item-dto/folder-item.dto';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class FileService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly jwtService: JwtService
    ){}

    async createFolder(user: PayloadDTO, createFolderDto: FolderDTO){
        const insertData = {
            name: createFolderDto.name,
            user_id: user.sub,
            type: createFolderDto.type,
            parent_id: createFolderDto.parentId,
        }
        const {data, error} = await this.supabaseService.client
        .from('items')
        .insert(insertData)
        .select()
        if(error){
            throw new UnauthorizedException(error.message)
        }

        return data
        
    }

   
}

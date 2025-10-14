import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FolderDTO } from 'src/dto/folder-item-dto/folder-item.dto';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
import { UpdateFolderDTO } from 'src/dto/update-folder-dto/update-folder.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class FolderService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly jwtService: JwtService
    ){}

    async createFolder(user: PayloadDTO, createFolderDto: FolderDTO){
        const insertData = {
            name: createFolderDto.name,
            user_id: user.sub,
            parent_id: createFolderDto.parentId,
        }
        const {data, error} = await this.supabaseService.client
        .from('folders')
        .insert(insertData)
        .select()
        .single()
        if(error){
            throw new UnauthorizedException(error.message)
        }

        return data
        
    }

    async updateFolderName(updateFileDTO: UpdateFolderDTO){
        const {id, name} = updateFileDTO
        const {data, error} = await this.supabaseService.client
        .from('folders')
        .update({name})
        .eq('id' , id)
        .select()
        if(error) {
            throw new BadRequestException(error.message)
        }
        return data
    }

   
}

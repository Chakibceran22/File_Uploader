import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-toekn.guard';
import { FolderService } from './folder.service';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
import { FolderDTO } from 'src/dto/folder-item-dto/folder-item.dto';
import { UpdateFolderDTO } from 'src/dto/update-folder-dto/update-folder.dto';

@Controller('folder')
export class FolderController {
    constructor(
        private readonly folderService : FolderService
    ){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async  createFolder(@CurrentUser() user: PayloadDTO, @Body() createFolderDTO: FolderDTO){
        return this.folderService.createFolder(user,createFolderDTO)
    }

    @Post('update')
    @UseGuards(JwtAuthGuard)
    async updateFlderNamee(@Body() updateFolderDTO: UpdateFolderDTO){
        return await this.folderService.updateFolderName(updateFolderDTO)
    }

    
}

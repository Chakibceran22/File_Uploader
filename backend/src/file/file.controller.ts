import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-toekn.guard';
import { FileService } from './file.service';
import { CurrentUser } from 'src/common/decorators/CurrentUser.decorator';
import { PayloadDTO } from 'src/dto/token-payload-dto/token-payload.dto';
import { FolderDTO } from 'src/dto/folder-item-dto/folder-item.dto';

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService : FileService
    ){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async  createFolder(@CurrentUser() user: PayloadDTO, @Body() createFolderDTO: FolderDTO){
        return this.fileService.createFolder(user,createFolderDTO)
    }

    
}

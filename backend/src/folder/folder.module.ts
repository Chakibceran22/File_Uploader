import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports:[SupabaseModule,
   
  ],
  controllers: [FolderController],
  providers: [FolderService]
})
export class FolderModule {}

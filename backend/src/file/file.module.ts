import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports:[SupabaseModule,
   
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}

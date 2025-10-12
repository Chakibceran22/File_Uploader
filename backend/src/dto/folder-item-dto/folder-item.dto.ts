import { Equals, IsString, IsUUID, ValidateIf } from "class-validator";

export class FolderDTO  {
    @IsString()
  name: string;

  @Equals('folder')
  readonly type: string = 'folder';



  @ValidateIf((o) => o.parentId !== null)
  @IsString()
  parentId: string | null;

};
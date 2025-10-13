import { Equals, IsString, IsUUID, ValidateIf } from "class-validator";

export class FolderDTO  {
    @IsString()
  name: string;


  @ValidateIf((o) => o.parentId !== null)
  @IsString()
  parentId: string | null;

};
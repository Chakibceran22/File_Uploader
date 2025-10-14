import { IsString, IsUUID } from "class-validator";
export class UpdateFolderDTO {
    @IsString()
    @IsUUID()
    id: string;

    @IsString()
    name: string;

}
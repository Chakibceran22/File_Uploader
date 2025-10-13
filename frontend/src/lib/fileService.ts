import axios from 'axios'
import type { CreateFolderDTO} from '../types/CreateFileDTO'


export class FileService {
    async createFolder(createFolderDTO: CreateFolderDTO, token: string){
        try {
            const response = await axios.post('http://localhost:3000/folder/create',{
                name: createFolderDTO.name,
                parentId: createFolderDTO.parentId
            },{
                headers:{
                    Authorization: `Bearer ${token}` 
                }
            })
            if(response) {
                return response.data
            }
            return null 
        } catch (error: any) {
            if(error.response){
                throw new Error(error.response.data.message)
            }
            
        }
    }
}
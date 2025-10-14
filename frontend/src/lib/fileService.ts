import axios from 'axios'
import type { CreateFolderDTO} from '../types/CreateFileDTO'
import type { UpdateFolderDTO } from '../types/UpdateFolderDTO'


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


    async updateFolderName(token:string, updateFolderDTO: UpdateFolderDTO) {
        const {id, name} = updateFolderDTO
        try {
            const response = await axios.post('http://localhost:3000/folder/update',{
                id,
                name
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(!response) return null
            return response.data
            
        } catch (error: any) {
            if(error.response){
                throw new Error(error.response.data.message)
            }
            throw new Error("Error in Updating Name")
        }
    }
}
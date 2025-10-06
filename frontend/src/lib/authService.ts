import axios, { AxiosError } from "axios";
import type { LoginDTO } from "../types/LoginDTO";
import type { SignUpDTO } from "../types/SignUpDTO";

export class AuthService {
    async login(userInput: LoginDTO) {
        try {
            
            const response = await axios.post('http://localhost:3000/auth/signin', {
                email: userInput.email,
                password: userInput.password
            })
            return response
        } catch (error: any) {
           if( error.response) {
            throw new Error(error.response.data.message)
           }
           else{
            console.log(error)
             throw new Error("Server Dididnt respond Or Request failed")
           }
        }
    }

    async signUp (userInput: SignUpDTO){
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                email: userInput.email,
                password: userInput.password,
                username: userInput.username
            })
            return response
            
        } catch (error:any) {
            if(error.response) {
                throw new Error(error.response.data.message)
            }
            throw new Error("Error during Signup")
        }

    }

    async resendConfirmationLink(email : string) {
        try {
            const response = await axios.post('http://localhost:3000/auth/resendlink',{
                email
            })
            return response
            
        } catch (error: any) {
            if(error.response) {
                throw new Error(error.response.data.message)
            }
            throw new Error("Error during Resending")
        }
    }
}
import { Toaster } from "react-hot-toast"

const AuthToaster = () => {
    return(
        <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#000',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#191917ff',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          },
        }}
      />
    )
}
export default AuthToaster
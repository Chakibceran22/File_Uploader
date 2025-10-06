import { Upload } from "lucide-react"

const Logo = ({ isDarkMode} : {isDarkMode: boolean}) => {
    return (
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-md ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}>
              <Upload className={`w-5 h-5 ${
                isDarkMode ? 'text-black' : 'text-white'
              }`} />
            </div>
            <span className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              FileUploader
            </span>
          </div>
        </div>
    )
}
export default Logo
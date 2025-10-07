export const DesktopMainHeader = ({isDarkMode, mockFiles} : {isDarkMode:boolean, mockFiles : Object[]}) => {
    return(
        <div className="mb-6 sm:mb-8">
            <h1 className={`text-2xl sm:text-3xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              My Files
            </h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {mockFiles.length} files stored
            </p>
          </div>
    )
}
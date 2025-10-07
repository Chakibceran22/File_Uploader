import React, { useEffect, useState } from 'react';
import { Upload, File, Folder, Settings, LogOut, Moon, Sun, X, Check, Loader2, Cloud, Home, Clock, Menu } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import useTheme from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { SideBar } from '../components/SideBar';

const FileUploadDashboard: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [dragActive, setDragActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setFiles] = useState<Array<{id: string, name: string, size: string, status: 'uploading' | 'completed' | 'failed', progress: number}>>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const {isAuthenticated, loading, logout} = useAuth()
  const navigate = useNavigate()
  

  useEffect(() => {
    if(loading) return
    if(!isAuthenticated) navigate('/')

  },[loading, isAuthenticated])


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? {...f, status: 'completed', progress: 100} : f
          ));
          toast.success(`${file.name} uploaded successfully!`);
        } else {
          setFiles(prev => prev.map(f => 
            f.id === file.id ? {...f, progress} : f
          ));
        }
      }, 200);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'
    }`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#171717' : '#000',
            color: '#fff',
            border: isDarkMode ? '1px solid #262626' : '1px solid #333',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: isDarkMode ? '#fff' : '#000',
              secondary: isDarkMode ? '#000' : '#fff',
            },
          },
        }}
      />

      <SideBar logout={logout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} setActiveTab={setActiveTab} activeTab={activeTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Mobile Header */}
        <div className={`lg:hidden sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-md transition-colors ${
              isDarkMode
                ? 'hover:bg-neutral-800 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}>
              <Upload className={`w-4 h-4 ${
                isDarkMode ? 'text-black' : 'text-white'
              }`} />
            </div>
            <span className={`text-base font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              FileUploader
            </span>
          </div>

          <div className="w-9" />
        </div>

        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className={`text-2xl sm:text-3xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upload Files
            </h1>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Drag and drop files or click to browse
            </p>
          </div>

          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-all ${
              dragActive
                ? isDarkMode
                  ? 'border-white bg-neutral-800'
                  : 'border-gray-900 bg-gray-100'
                : isDarkMode
                  ? 'border-neutral-700 hover:border-neutral-600'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleChange}
              className="hidden"
            />
            
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className={`p-3 sm:p-4 rounded-full mb-3 sm:mb-4 ${
                isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
              }`}>
                <Cloud className={`w-10 h-10 sm:w-12 sm:h-12 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              
              <p className={`text-sm sm:text-base font-medium mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Click to upload or drag and drop
              </p>
              
              <p className={`text-xs sm:text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Upload files up to 100MB
              </p>
              
              <button
                type="button"
                className={`mt-4 sm:mt-6 px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium text-sm transition-all ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                Browse Files
              </button>
            </label>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Uploading Files
              </h2>
              
              <div className="space-y-2 sm:space-y-3">
                {files.map(file => (
                  <div
                    key={file.id}
                    className={`p-3 sm:p-4 rounded-lg border transition-colors ${
                      isDarkMode
                        ? 'bg-neutral-900 border-neutral-800'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <File className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm font-medium truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {file.name}
                          </p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {file.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {file.status === 'uploading' && (
                          <Loader2 className={`w-4 h-4 animate-spin ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        )}
                        {file.status === 'completed' && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className={`p-1 rounded transition-colors ${
                            isDarkMode
                              ? 'hover:bg-neutral-800 text-gray-400'
                              : 'hover:bg-gray-100 text-gray-500'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {file.status === 'uploading' && (
                      <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                        isDarkMode ? 'bg-neutral-800' : 'bg-gray-200'
                      }`}>
                        <div
                          className={`h-full transition-all duration-300 ${
                            isDarkMode ? 'bg-white' : 'bg-black'
                          }`}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FileUploadDashboard;
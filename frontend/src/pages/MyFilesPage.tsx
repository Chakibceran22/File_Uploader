import React, { useState } from 'react';
import { Upload, File, Folder, Settings, LogOut, Moon, Sun, X, Menu, Home, Clock, Download, Trash2, Share2, MoreVertical, FileText, FileImage, Video, Music, Archive } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import useTheme from '../hooks/useTheme';
import AuthToaster from '../components/AuthToaster';
import { SideBar } from '../components/SideBar';
import { MobileMainHeader } from '../components/MobileMainHeader';
import { DesktopMainHeader } from '../components/DesktopMainHeader';
import { useAuth } from '../hooks/useAuth';
const MyFilesPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('files');
  const {logout} = useAuth()

  const mockFiles = [
    { id: 1, name: 'Project Proposal.pdf', size: '2.4 MB', type: 'pdf', date: '2 hours ago', icon: FileText },
    { id: 2, name: 'Vacation Photo.jpg', size: '3.8 MB', type: 'image', date: '1 day ago', icon: FileImage },
    { id: 3, name: 'Meeting Recording.mp4', size: '125 MB', type: 'video', date: '3 days ago', icon: Video },
    { id: 4, name: 'Presentation.pptx', size: '5.2 MB', type: 'document', date: '5 days ago', icon: FileText },
    { id: 5, name: 'Background Music.mp3', size: '4.1 MB', type: 'audio', date: '1 week ago', icon: Music },
    { id: 6, name: 'Design Assets.zip', size: '48 MB', type: 'archive', date: '2 weeks ago', icon: Archive },
    { id: 7, name: 'Report Q4.xlsx', size: '1.2 MB', type: 'document', date: '2 weeks ago', icon: FileText },
    { id: 8, name: 'Team Photo.png', size: '2.9 MB', type: 'image', date: '3 weeks ago', icon: FileImage },
  ];

  const getFileColor = (type: string) => {
    const colors = {
      pdf: 'text-red-500',
      image: 'text-blue-500',
      video: 'text-purple-500',
      document: 'text-blue-500',
      audio: 'text-green-500',
      archive: 'text-yellow-500',
    };
    return colors[type as keyof typeof colors] || 'text-gray-500';
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'
    }`}>
      <AuthToaster isDarkMode={isDarkMode} />

      {/* Mobile Overlay */}
      <SideBar logout={logout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Mobile Header */}
        <MobileMainHeader isDarkMode={isDarkMode} setSidebarOpen={setSidebarOpen} />

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <DesktopMainHeader isDarkMode={isDarkMode} mockFiles={mockFiles} />

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockFiles.map(file => {
              const IconComponent = file.icon;
              return (
                <div
                  key={file.id}
                  className={`group rounded-lg border p-4 transition-all hover:shadow-md ${
                    isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* File Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${getFileColor(file.type)}`} />
                    </div>
                    <button
                      className={`opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all ${
                        isDarkMode
                          ? 'hover:bg-neutral-800 text-gray-400'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* File Info */}
                  <div className="mb-4">
                    <h3 className={`text-sm font-medium mb-1 truncate ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {file.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {file.size}
                      </span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        •
                      </span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {file.date}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toast.success('Download started')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                        isDarkMode
                          ? 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                    <button
                      onClick={() => toast.success('Share link copied')}
                      className={`p-1.5 rounded-md transition-colors ${
                        isDarkMode
                          ? 'hover:bg-neutral-800 text-gray-400'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toast.error('File deleted')}
                      className={`p-1.5 rounded-md transition-colors ${
                        isDarkMode
                          ? 'hover:bg-neutral-800 text-gray-400'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyFilesPage;
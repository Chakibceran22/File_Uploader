import React, { useState,useEffect } from 'react';
import { Upload, File, Folder, Settings, LogOut, Moon, Sun, X, Menu, Home, Clock, Download, Trash2, Share2, MoreVertical, FileText, FileImage, Video, Music, Archive, ChevronRight, FileAudio } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import useTheme from '../hooks/useTheme';
import AuthToaster from '../components/AuthToaster';
import { SideBar } from '../components/SideBar';
import { MobileMainHeader } from '../components/MobileMainHeader';
import { useAuth } from '../hooks/useAuth';
import { fileService } from '../utils/fileServiceSinglton';

// interface FileItem {
//   id: string;
//   name: string;
//   type: 'folder' | 'file';
//   size?: string;
//   fileType?: string;
//   date: string;
//   parentId: string | null;
//   icon?: any;
// }
import type {CreateFolderDTO} from '../types/CreateFileDTO'
type FolderItem = {
  id: string;
  name: string;
  type: 'folder';
  userId?: string;
  parentId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

type FileItem = {
  id: string;
  name: string;
  type: 'file';
  userId?: string;
  parentId: string | null;
  filePath?: string;       // required
  fileType: string;       // e.g. 'pdf', 'jpg'
  size: string;      
  createdAt?: Date;
  updatedAt?: Date;
};

type FileOrFolder = FileItem | FolderItem;


const MyFilesPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('files');
  const { logout,token } = useAuth();
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameItemId, setRenameItemId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  
  // Mock data structure - simulating database
  const [allItems, setAllItems] = useState<FileOrFolder[]>([
    // Root level
    { id: '1', name: 'Documents', type: 'folder', parentId: null, createdAt: new Date() },
    { id: '2', name: 'Photos', type: 'folder',  parentId: null },
    { id: '3', name: 'Projects', type: 'folder',  parentId: null },
    { id: '4', name: 'Resume.pdf', type: 'file', size: '1.2 MB', fileType: 'pdf', parentId: null },
    
    // Inside Documents folder
    { id: '5', name: 'Work', type: 'folder',  parentId: '1' },
    { id: '6', name: 'Personal', type: 'folder',  parentId: '1' },
    { id: '7', name: 'Contract.pdf', type: 'file', size: '2.4 MB', fileType: 'pdf',  parentId: '1' },
    
    // Inside Work folder
    { id: '8', name: 'Reports', type: 'folder', parentId: '5' },
    { id: '9', name: 'Meeting Notes.docx', type: 'file', size: '856 KB', fileType: 'document',  parentId: '5' },
    { id: '10', name: 'Budget.xlsx', type: 'file', size: '1.8 MB', fileType: 'document', parentId: '5' },
    
    // Inside Photos folder
    { id: '11', name: 'Vacation 2024', type: 'folder',  parentId: '2' },
    { id: '12', name: 'Profile.jpg', type: 'file', size: '3.2 MB', fileType: 'image',  parentId: '2' },
    
    // Inside Vacation folder
    { id: '14', name: 'Beach.jpg', type: 'file', size: '4.1 MB', fileType: 'image',  parentId: '11' },
    { id: '15', name: 'Mountains.jpg', type: 'file', size: '3.8 MB', fileType: 'image',  parentId: '11' },
    { id: '16', name: 'Video.mp4', type: 'file', size: '125 MB', fileType: 'video',  parentId: '11' },
    
    // Inside Projects folder
    { id: '17', name: 'Website Redesign', type: 'folder',  parentId: '3' },
    { id: '18', name: 'Mobile App', type: 'folder',  parentId: '3' },
    { id: '19', name: 'Presentation.pptx', type: 'file', size: '5.2 MB', fileType: 'document',  parentId: '3' },
  ]);

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [pathHistory, setPathHistory] = useState<Array<{ id: string | null; name: string }>>([
    { id: null, name: 'My Files' }
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const handleCreateFolder = async() => {
    if (!newFolderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }
    
    const trimedFoldername = newFolderName.trim()
    const isFolderExists = folders.some((folder) => {
      return folder.name === trimedFoldername && folder.parentId === currentFolderId
    })
    

    if(isFolderExists) {
      toast.error('Folder Does Exists Cant create one')
      return
    }

    
    try {
      const createFileDTO: CreateFolderDTO = {
        name: newFolderName,
        parentId: currentFolderId
      }
    
      
      const response = await fileService.createFolder(createFileDTO,token )
      if(!response) throw new Error("Response failed")
      const newFolder: FolderItem = {
      id: response.id,
      name: newFolderName,
      type: 'folder',
      parentId: currentFolderId,
    };

    setAllItems([...allItems, newFolder]);
    setNewFolderName('');
    setShowNewFolderModal(false);
    } catch (error:any) {
      toast.error(error.message)
    }
    toast.success('Folder created successfully');
  };
  const getIcon = (fileType: string | undefined) => {
    let icon = FileText
    switch (fileType) {
      case 'video':
        icon = Video
        break;
      case 'audio':
        icon = FileAudio
        break;
      case 'archive':
        icon = Archive
        break;
    }
    return icon
    


  }

  const handleUploadFiles = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }
    
    

    const newFiles: FileItem[] = Array.from(selectedFiles).map(file => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      let fileType = 'document';

      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        fileType = 'image';
      } else if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) {
        fileType = 'video';
      } else if (['mp3', 'wav', 'flac'].includes(extension)) {
        fileType = 'audio';
      } else if (['zip', 'rar', '7z', 'tar'].includes(extension)) {
        fileType = 'archive';
      } else if (['pdf'].includes(extension)) {
        fileType = 'pdf';
      }

      return {
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        type: 'file',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType,
        date: 'Just now',
        parentId: currentFolderId,
      };
    });

    setAllItems([...allItems, ...newFiles]);
    setSelectedFiles(null);
    setShowUploadModal(false);
    toast.success(`${newFiles.length} file(s) uploaded successfully`);
  };

  const handleRename = () => {
    if (!renameValue.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setAllItems(allItems.map(item => 
      item.id === renameItemId ? { ...item, name: renameValue } : item
    ));
    
    setShowRenameModal(false);
    setRenameItemId(null);
    setRenameValue('');
    toast.success('Renamed successfully');
  };

  const handleDelete = (id: string) => {
    setAllItems(allItems.filter(item => item.id !== id));
    setOpenMenuId(null);
    toast.success('Deleted successfully');
  };

  const handleShare = (name: string) => {
    setOpenMenuId(null);
    toast.success(`Share link copied for "${name}"`);
  };

  const handleDownload = (name: string) => {
    setOpenMenuId(null);
    toast.success(`Downloading "${name}"`);
  };

  // Get items in current folder
  const currentItems = allItems.filter(item => item.parentId === currentFolderId);
  const folders = currentItems.filter(item => item.type === 'folder');
  const files = currentItems.filter(item => item.type === 'file');

  const handleFolderClick = (folder: FolderItem) => {
    setCurrentFolderId(folder.id);
    setPathHistory([...pathHistory, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = pathHistory.slice(0, index + 1);
    setPathHistory(newPath);
    setCurrentFolderId(newPath[newPath.length - 1].id);
  };

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

      <SideBar 
        logout={logout} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <MobileMainHeader isDarkMode={isDarkMode} setSidebarOpen={setSidebarOpen} />

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {pathHistory.map((path, index) => (
                <React.Fragment key={path.id || 'root'}>
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className={`text-sm font-medium transition-colors ${
                      index === pathHistory.length - 1
                        ? isDarkMode
                          ? 'text-white'
                          : 'text-gray-900'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {path.name}
                  </button>
                  {index < pathHistory.length - 1 && (
                    <ChevronRight className={`w-4 h-4 ${
                      isDarkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {folders.length} folders, {files.length} files
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowNewFolderModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                isDarkMode
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              <Folder className="w-4 h-4" />
              New Folder
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                isDarkMode
                  ? 'border-neutral-700 text-gray-300 hover:bg-neutral-900'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Folders First */}
            {folders.map(folder => (
              <div
                key={folder.id}
                className={`group rounded-lg border p-4 transition-all hover:shadow-md ${
                  isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleFolderClick(folder)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    
                    className={`p-3 rounded-lg cursor-pointer ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
                    }`}
                  >
                    <Folder className={`w-6 h-6 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === folder.id ? null : folder.id);
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all ${
                        isDarkMode
                          ? 'hover:bg-neutral-800 text-gray-400'
                          : 'hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === folder.id && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute right-0 top-8 w-48 rounded-md shadow-lg z-10 border ${
                          isDarkMode
                            ? 'bg-neutral-800 border-neutral-700'
                            : 'bg-white border-gray-200'
                        }`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenameItemId(folder.id);
                            setRenameValue(folder.name);
                            setShowRenameModal(true);
                            setOpenMenuId(null);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            isDarkMode
                              ? 'hover:bg-neutral-700 text-gray-300'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          Rename
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(folder.name);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            isDarkMode
                              ? 'hover:bg-neutral-700 text-gray-300'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          Share
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(folder.id);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors text-red-500 hover:bg-red-50 ${
                            isDarkMode && 'hover:bg-red-950'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="cursor-pointer">
                  <h3 className={`text-sm font-medium mb-1 truncate ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {folder.name}
                  </h3>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {folder.createdAt?.toString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Files */}
            {files.map(file => {
              const IconComponent = getIcon(file.fileType);
              return (
                <div
                  key={file.id}
                  className={`group rounded-lg border p-4 transition-all hover:shadow-md ${
                    isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${getFileColor(file.fileType || '')}`} />
                    </div>
                    
                  </div>

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
                        {file.createdAt?.toString()}
                      </span>
                    </div>
                  </div>

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

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className={`text-center py-12 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-1">This folder is empty</p>
              <p className="text-sm">Upload files to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-lg p-6 ${
            isDarkMode
              ? 'bg-neutral-900 border border-neutral-800'
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Create New Folder
            </h2>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                placeholder="Enter folder name"
                autoFocus
                className={`w-full rounded-md py-2.5 px-3 text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500'
                    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400'
                } border focus:outline-none focus:ring-1`}
              />
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowNewFolderModal(false);
                  setNewFolderName('');
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                  isDarkMode
                    ? 'border-neutral-700 text-gray-300 hover:bg-neutral-800'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-lg p-6 ${
            isDarkMode
              ? 'bg-neutral-900 border border-neutral-800'
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Rename
            </h2>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                New Name
              </label>
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
                className={`w-full rounded-md py-2.5 px-3 text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500'
                    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400'
                } border focus:outline-none focus:ring-1`}
              />
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRenameModal(false);
                  setRenameItemId(null);
                  setRenameValue('');
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                  isDarkMode
                    ? 'border-neutral-700 text-gray-300 hover:bg-neutral-800'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-lg p-6 ${
            isDarkMode
              ? 'bg-neutral-900 border border-neutral-800'
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upload Files
            </h2>

            {/* Upload Area */}
            <div className="mb-4">
              <input
                type="file"
                id="file-upload-modal"
                multiple
                onChange={(e) => setSelectedFiles(e.target.files)}
                className="hidden"
              />
              
              <label
                htmlFor="file-upload-modal"
                className={`cursor-pointer flex flex-col items-center border-2 border-dashed rounded-lg p-8 transition-all ${
                  isDarkMode
                    ? 'border-neutral-700 hover:border-neutral-600 bg-neutral-800'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-full mb-3 ${
                  isDarkMode ? 'bg-neutral-700' : 'bg-gray-200'
                }`}>
                  <Upload className={`w-8 h-8 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Click to upload or drag and drop
                </p>
                
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Upload multiple files at once
                </p>
              </label>
            </div>

            {/* Selected Files List */}
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="mb-4">
                <p className={`text-sm font-medium mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedFiles.length} file(s) selected
                </p>
                
                <div className={`max-h-48 overflow-y-auto space-y-2 p-3 rounded-lg ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-gray-50'
                }`}>
                  {Array.from(selectedFiles).map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${
                        isDarkMode ? 'bg-neutral-900' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <File className={`w-4 h-4 flex-shrink-0 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {file.name}
                          </p>
                          <p className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const dt = new DataTransfer();
                          Array.from(selectedFiles).forEach((f, i) => {
                            if (i !== index) dt.items.add(f);
                          });
                          setSelectedFiles(dt.files.length > 0 ? dt.files : null);
                        }}
                        className={`p-1 rounded transition-colors ${
                          isDarkMode
                            ? 'hover:bg-neutral-800 text-gray-400'
                            : 'hover:bg-gray-100 text-gray-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFiles(null);
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                  isDarkMode
                    ? 'border-neutral-700 text-gray-300 hover:bg-neutral-800'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleUploadFiles}
                disabled={!selectedFiles || selectedFiles.length === 0}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                Upload {selectedFiles && selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFilesPage;
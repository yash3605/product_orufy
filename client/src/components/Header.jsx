import { Search, ChevronDown, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({ title, showSearch = true, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="h-[60px] bg-white flex items-center justify-between px-6 shrink-0">
      {/* Left - Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span className="text-gray-700 font-medium">{title}</span>
      </div>

      {/* Right - Search + Avatar */}
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Services, Products"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-[260px] border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-colors bg-white"
            />
          </div>
        )}

        {/* Avatar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center">
              {user?.email ? (
                <span className="text-white text-sm font-semibold">{user.email.charAt(0).toUpperCase()}</span>
              ) : (
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800 truncate">{user?.email || 'User'}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

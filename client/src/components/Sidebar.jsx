import { NavLink } from 'react-router-dom';
import { Home, Package, Search } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-[220px] bg-[#1a1a6c] min-h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[22px] font-bold text-white tracking-tight">Productr</span>
          <div className="w-[22px] h-[22px] bg-[#f97316] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:bg-white/15 transition-colors"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              isActive ? 'bg-white/10 text-white font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Home className="w-[18px] h-[18px]" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
              isActive ? 'bg-white/10 text-white font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Package className="w-[18px] h-[18px]" />
          <span>Products</span>
        </NavLink>
      </nav>
    </div>
  );
}

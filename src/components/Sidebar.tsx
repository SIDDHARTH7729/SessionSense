// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // 👈 add usePathname
import { 
  Home, 
  BookOpen, 
  Video, 
  Settings, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  PieChart,
  Users,
  LogOut,
  Book,
  Brain,
  UserCog
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const menuItems = [
    { name: 'HomePage', icon: Home, href: '/HomePage' },
    { name: 'Learning', icon: BookOpen, href: '/learning' },
    { name: 'Videos', icon: Video, href: '/PostVideo' },
    { name: 'Features', icon: Brain, href: '/features' },
    { name: 'Community', icon: Users, href: '/community' },
  ];

  const bottomMenuItems = [
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Notifications', icon: Bell, href: '/notifications' },
    { name: 'Profile Settings', icon: UserCog, href: '/user-profile' },
  ];

  const pathname = usePathname();

const isActive = (path: string) => {
  return pathname === path;
};

  const handleSignOut = () => {
    signOut(() => {
      router.push('/sign-in');
    });
  };

  return (
    <div 
      className={`flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto p-1 rounded-full hover:bg-gray-200 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {isLoaded && user && (
        <div className={`p-4 border-b border-gray-200 ${collapsed ? 'text-center' : ''}`}>
          <div className="flex items-center">
            {user.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt={user.fullName || "User"}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-medium">
                {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
              </div>
            )}
            {!collapsed && (
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user.fullName || user.username}</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            )}
          </div>
        </div>
      )}

      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.href)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-indigo-600' : 'text-gray-500'}`} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom menu */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {bottomMenuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.href)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-indigo-600' : 'text-gray-500'}`} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
          {isLoaded && user && (
            <li>
              <button
                onClick={handleSignOut}
                className={`flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <LogOut className="h-5 w-5 text-gray-500" />
                {!collapsed && <span className="ml-3">Logout</span>}
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

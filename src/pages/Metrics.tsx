import React from 'react';
import { LayoutDashboard, Activity, Users, BarChart3 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const Metrics: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">指标管理</span>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                <span>仪表盘</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
                <BarChart3 className="w-5 h-5" />
                <span>指标管理</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                <Activity className="w-5 h-5" />
                <span>数据监控</span>
              </a>
              {user?.role === 'admin' && (
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  <Users className="w-5 h-5" />
                  <span>用户管理</span>
                </a>
              )}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role === 'admin' ? '管理员' : '普通用户'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              退出登录
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">指标管理</h1>
            <p className="text-slate-500 mt-1">管理和配置系统指标</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div className="text-center text-slate-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium text-slate-700">功能开发中</p>
              <p className="text-sm mt-2">指标管理功能即将上线</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Metrics;

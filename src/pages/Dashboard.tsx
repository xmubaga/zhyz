import React from 'react';
import { LayoutDashboard, TrendingUp, TrendingDown, Activity, Users, BarChart3, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const stats = [
    { label: '活跃指标', value: '156', trend: '+12%', trendUp: true, icon: Activity, color: 'blue' },
    { label: '今日告警', value: '8', trend: '-3%', trendUp: false, icon: Bell, color: 'orange' },
    { label: '在线用户', value: '42', trend: '+5%', trendUp: true, icon: Users, color: 'green' },
    { label: '数据报告', value: '24', trend: '+18%', trendUp: true, icon: BarChart3, color: 'purple' },
  ];

  const metrics = [
    { name: '销售额', value: '¥1,258,000', change: '+15.3%', positive: true },
    { name: '用户数', value: '25,689', change: '+8.2%', positive: true },
    { name: '转化率', value: '3.28%', change: '-0.5%', positive: false },
    { name: '访问量', value: '156,842', change: '+22.1%', positive: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

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
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>仪表盘</span>
              </Link>
              <Link 
                to="/metrics" 
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive('/metrics') || location.pathname.startsWith('/metrics/') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>指标管理</span>
              </Link>
              <Link 
                to="/monitoring" 
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive('/monitoring') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>数据监控</span>
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/users" 
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive('/users') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>用户管理</span>
                </Link>
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
            <h1 className="text-2xl font-bold text-slate-800">仪表盘</h1>
            <p className="text-slate-500 mt-1">欢迎回来，{user?.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                orange: 'bg-orange-50 text-orange-600',
                green: 'bg-green-50 text-green-600',
                purple: 'bg-purple-50 text-purple-600',
              };

              return (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">关键指标</h2>
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm text-slate-600">{metric.name}</p>
                      <p className="text-xl font-bold text-slate-800 mt-1">{metric.value}</p>
                    </div>
                    <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-lg ${metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">最近活动</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">新增指标 "用户活跃度"</p>
                    <p className="text-xs text-slate-500 mt-1">2分钟前</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">告警规则已更新</p>
                    <p className="text-xs text-slate-500 mt-1">15分钟前</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">数据报告已生成</p>
                    <p className="text-xs text-slate-500 mt-1">1小时前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

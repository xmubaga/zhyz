import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Info, BarChart3, GitBranch, History, Users } from 'lucide-react';
import { useMetricStore } from '../store/metricStore';
import { mockVersions, mockLineage } from '../data/metrics';
import { formatDateTime } from '../utils/formatters';
import { useState, useEffect } from 'react';

type DetailTab = 'basic' | 'preview' | 'family' | 'lineage' | 'version';

export const MetricDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { metrics } = useMetricStore();
  const [activeTab, setActiveTab] = useState<DetailTab>('basic');

  const metric = metrics.find(m => m.id === id);
  
  const getParentName = () => {
    if (!metric?.parentId) return '-';
    const parent = metrics.find(m => m.id === metric.parentId);
    return parent?.name || '-';
  };

  const getChildMetrics = () => {
    if (!metric) return [];
    return metrics.filter(m => m.parentId === metric.id);
  };

  const getLevelLabel = (level: number) => {
    const labels = ['一级', '基础', '结果', '计算'];
    return labels[level - 1] || `${level}级`;
  };

  const getStatusLabel = (status: string) => {
    return status === 'published' ? '已发布' : '草稿';
  };

  const getStatusColor = (status: string) => {
    return status === 'published'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';
  };

  if (!metric) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500">指标不存在</p>
          <button
            onClick={() => navigate('/metrics')}
            className="mt-4 text-blue-600 hover:underline"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: DetailTab; label: string; icon: React.ReactNode }[] = [
    { key: 'basic', label: '基本信息', icon: <Info className="w-4 h-4" /> },
    { key: 'preview', label: '指标预览', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'family', label: '族谱', icon: <Users className="w-4 h-4" /> },
    { key: 'lineage', label: '血缘', icon: <GitBranch className="w-4 h-4" /> },
    { key: 'version', label: '版本', icon: <History className="w-4 h-4" /> },
  ];

  const childMetrics = getChildMetrics();
  const versions = mockVersions.filter(v => v.metricId === metric.id);
  const lineage = mockLineage[metric.id];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/metrics')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{metric.name}</h1>
            <p className="text-sm text-gray-500">{metric.englishName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {activeTab === 'basic' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">基本信息</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    指标名称
                  </label>
                  <p className="text-gray-900">{metric.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    英文名
                  </label>
                  <p className="text-gray-900">{metric.englishName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    指标级别
                  </label>
                  <p className="text-gray-900">{getLevelLabel(metric.level)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    父级指标
                  </label>
                  <p className="text-gray-900">{getParentName()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    业务负责人
                  </label>
                  <p className="text-gray-900">{metric.businessOwner || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    开发负责人
                  </label>
                  <p className="text-gray-900">{metric.developer || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    状态
                  </label>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      metric.status
                    )}`}
                  >
                    {getStatusLabel(metric.status)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    版本号
                  </label>
                  <p className="text-gray-900">v{metric.version}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  描述
                </label>
                <p className="text-gray-900">{metric.description || '-'}</p>
              </div>

              {metric.sql && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    SQL语句
                  </label>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {metric.sql}
                  </pre>
                </div>
              )}

              {metric.resultField && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    结果字段
                  </label>
                  <p className="text-gray-900">{metric.resultField}</p>
                </div>
              )}

              {metric.computeRule && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    计算规则
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">{metric.computeRule}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    创建时间
                  </label>
                  <p className="text-gray-900">{formatDateTime(metric.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    更新时间
                  </label>
                  <p className="text-gray-900">{formatDateTime(metric.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="max-w-5xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">指标预览</h2>
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>指标预览功能开发中...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">指标族谱</h2>
              
              {metric.parentId && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">父级指标</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{getParentName()}</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">当前指标</h3>
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-900">{metric.name}</p>
                  <p className="text-sm text-blue-600">{getLevelLabel(metric.level)}</p>
                </div>
              </div>

              {childMetrics.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">子级指标</h3>
                  <div className="space-y-2">
                    {childMetrics.map((child) => (
                      <div key={child.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">{child.name}</p>
                        <p className="text-sm text-gray-500">{getLevelLabel(child.level)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!metric.parentId && childMetrics.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>暂无族谱关系</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'lineage' && (
          <div className="max-w-5xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">血缘关系</h2>
              
              {lineage ? (
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">上游指标</h3>
                    {lineage.upstream.length > 0 ? (
                      <div className="space-y-2">
                        {lineage.upstream.map((id) => {
                          const upstreamMetric = metrics.find(m => m.id === id);
                          return (
                            <div key={id} className="p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium text-gray-900 text-sm">
                                {upstreamMetric?.name || id}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">暂无上游</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <p className="font-medium text-blue-900 text-center">{metric.name}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">下游指标</h3>
                    {lineage.downstream.length > 0 ? (
                      <div className="space-y-2">
                        {lineage.downstream.map((id) => {
                          const downstreamMetric = metrics.find(m => m.id === id);
                          return (
                            <div key={id} className="p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium text-gray-900 text-sm">
                                {downstreamMetric?.name || id}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">暂无下游</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <GitBranch className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>暂无血缘关系</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'version' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">版本历史</h2>
              
              {versions.length > 0 ? (
                <div className="space-y-4">
                  {versions.map((version, index) => (
                    <div
                      key={version.id}
                      className={`p-4 rounded-lg border ${
                        index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">v{version.version}</span>
                        {index === 0 && (
                          <span className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded-full">
                            当前版本
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{version.changes}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>操作人：{version.createdBy}</span>
                        <span>时间：{formatDateTime(version.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>暂无版本历史</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

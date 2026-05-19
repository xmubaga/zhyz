import { Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Metric } from '../types/metric';
import { formatDate } from '../utils/formatters';

interface MetricListProps {
  data: Metric[];
  loading?: boolean;
  search?: string;
  onSearch?: (value: string) => void;
  onView?: (metric: Metric) => void;
  onEdit?: (metric: Metric) => void;
  onDelete?: (metric: Metric) => void;
  onAdd?: () => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export const MetricList: React.FC<MetricListProps> = ({
  data,
  loading,
  search,
  onSearch,
  onView,
  onEdit,
  onDelete,
  onAdd,
  pagination,
}) => {
  const filteredData = search
    ? data.filter(
        (metric) =>
          metric.name.includes(search) ||
          metric.englishName.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const paginatedData = pagination
    ? filteredData.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
      )
    : filteredData;

  const totalPages = pagination ? Math.ceil(filteredData.length / pagination.pageSize) : 1;

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

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-green-100 text-green-700',
      'bg-orange-100 text-orange-700',
    ];
    return colors[level - 1] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">指标列表</h2>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建根指标
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索指标名称..."
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  指标名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  级别
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  业务负责人
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((metric) => (
                <tr
                  key={metric.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onView?.(metric)}
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                      <span className="text-xs text-gray-500">{metric.englishName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                        metric.level
                      )}`}
                    >
                      {getLevelLabel(metric.level)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {metric.businessOwner || '-'}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        metric.status
                      )}`}
                    >
                      {getStatusLabel(metric.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(metric.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onView?.(metric);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(metric);
                        }}
                        className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(metric);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            显示 {Math.min((pagination.current - 1) * pagination.pageSize + 1, filteredData.length)} - {Math.min(pagination.current * pagination.pageSize, filteredData.length)}，共 {filteredData.length} 条
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.current - 1))}
              disabled={pagination.current <= 1}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (pagination.current <= 3) {
                page = i + 1;
              } else if (pagination.current >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = pagination.current - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => pagination.onPageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    pagination.current === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => pagination.onPageChange(Math.min(totalPages, pagination.current + 1))}
              disabled={pagination.current >= totalPages}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

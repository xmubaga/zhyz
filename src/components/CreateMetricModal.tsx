import { X, Save } from 'lucide-react';
import { useState } from 'react';
import { Metric } from '../types/metric';

interface CreateMetricModalProps {
  visible: boolean;
  level: 1 | 2 | 3 | 4;
  parentId?: string;
  parentName?: string;
  onCancel: () => void;
  onSubmit: (data: Partial<Metric>) => Promise<void>;
}

export const CreateMetricModal: React.FC<CreateMetricModalProps> = ({
  visible,
  level,
  parentId,
  parentName,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    englishName: '',
    description: '',
    businessOwner: '',
    developer: '',
    sql: '',
    resultField: '',
    computeRule: '',
  });
  const [loading, setLoading] = useState(false);

  const getLevelLabel = (l: number) => {
    const labels = ['根指标', '基础指标', '结果指标', '计算指标'];
    return labels[l - 1] || `${l}级指标`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        level,
        parentId,
      });
      setFormData({
        name: '',
        englishName: '',
        description: '',
        businessOwner: '',
        developer: '',
        sql: '',
        resultField: '',
        computeRule: '',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            新建{getLevelLabel(level)}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {parentName && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                父级指标：<span className="font-medium">{parentName}</span>
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              指标名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入指标名称"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              英文名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.englishName}
              onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入英文名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="请输入指标描述"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                业务负责人
              </label>
              <input
                type="text"
                value={formData.businessOwner}
                onChange={(e) => setFormData({ ...formData, businessOwner: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入负责人"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                开发负责人
              </label>
              <input
                type="text"
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入开发负责人"
              />
            </div>
          </div>

          {level >= 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SQL语句
              </label>
              <textarea
                value={formData.sql}
                onChange={(e) => setFormData({ ...formData, sql: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                rows={4}
                placeholder="SELECT * FROM ..."
              />
            </div>
          )}

          {level >= 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                结果字段
              </label>
              <input
                type="text"
                value={formData.resultField}
                onChange={(e) => setFormData({ ...formData, resultField: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入结果字段名"
              />
            </div>
          )}

          {level >= 4 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                计算规则
              </label>
              <textarea
                value={formData.computeRule}
                onChange={(e) => setFormData({ ...formData, computeRule: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="请输入计算规则"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

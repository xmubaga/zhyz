import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreeView } from '../components/TreeView';
import { MetricList } from '../components/MetricList';
import { CreateMetricModal } from '../components/CreateMetricModal';
import { useMetricStore } from '../store/metricStore';

export const Metrics: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  
  const {
    metrics,
    treeData,
    selectedNode,
    expandedKeys,
    filters,
    pagination,
    createModal,
    selectNode,
    toggleExpand,
    setFilters,
    setPagination,
    openCreateModal,
    closeCreateModal,
    createMetric,
    deleteMetric,
  } = useMetricStore();

  const getParentMetricName = (parentId?: string) => {
    if (!parentId) return undefined;
    return metrics.find(m => m.id === parentId)?.name;
  };

  const filteredMetrics = useMemo(() => {
    let result = [...metrics];
    
    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter(
        m =>
          m.name.toLowerCase().includes(lowerSearch) ||
          m.englishName.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedNode?.metricId) {
      const selectedMetric = metrics.find(m => m.id === selectedNode.metricId);
      if (selectedMetric) {
        const getChildIds = (parentId: string): string[] => {
          const children = metrics.filter(m => m.parentId === parentId);
          return [
            parentId,
            ...children.flatMap(c => getChildIds(c.id))
          ];
        };
        const includedIds = getChildIds(selectedMetric.id);
        result = result.filter(m => includedIds.includes(m.id));
      }
    }

    return result;
  }, [metrics, searchValue, selectedNode]);

  const paginatedMetrics = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    return filteredMetrics.slice(start, start + pagination.pageSize);
  }, [filteredMetrics, pagination]);

  const handleViewMetric = (metric: { id: string }) => {
    navigate(`/metrics/${metric.id}`);
  };

  const handleAddRootMetric = () => {
    openCreateModal(1);
  };

  const handleAddChildMetric = (node: { metricId?: string; name?: string; level?: number }) => {
    if (node.metricId && node.level && node.level < 4) {
      openCreateModal((node.level + 1) as 1 | 2 | 3 | 4, node.metricId);
    }
  };

  const handleDeleteMetric = async (metric: { id: string }) => {
    if (confirm('确定要删除这个指标吗？')) {
      await deleteMetric(metric.id);
    }
  };

  const handleToggleExpand = (key: string) => {
    const newExpandedKeys = expandedKeys.includes(key)
      ? expandedKeys.filter(k => k !== key)
      : [...expandedKeys, key];
    // 这里我们直接修改store，因为toggleExpand可能需要优化
    // 暂时简化，直接更新状态
    useMetricStore.setState({ expandedKeys: newExpandedKeys });
  };

  return (
    <div className="h-full flex bg-gray-50">
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">指标目录</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <TreeView
            data={treeData}
            expandedKeys={expandedKeys}
            selectedNode={selectedNode}
            onSelect={selectNode}
            onToggle={(key) => {
              const newExpandedKeys = expandedKeys.includes(key)
                ? expandedKeys.filter(k => k !== key)
                : [...expandedKeys, key];
              useMetricStore.setState({ expandedKeys: newExpandedKeys });
            }}
            onAddChild={handleAddChildMetric}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <MetricList
          data={filteredMetrics}
          search={searchValue}
          onSearch={setSearchValue}
          onView={handleViewMetric}
          onDelete={handleDeleteMetric}
          onAdd={handleAddRootMetric}
          pagination={{
            ...pagination,
            total: filteredMetrics.length,
            onPageChange: (page) => setPagination({ ...pagination, current: page }),
          }}
        />
      </div>

      <CreateMetricModal
        visible={createModal.visible}
        level={createModal.level}
        parentId={createModal.parentId}
        parentName={getParentMetricName(createModal.parentId)}
        onCancel={closeCreateModal}
        onSubmit={createMetric}
      />
    </div>
  );
};

import { create } from 'zustand';
import { Metric, TreeNode, DetailTab } from '../types/metric';
import { mockMetrics, mockTreeData } from '../data/metrics';

interface MetricState {
  metrics: Metric[];
  loading: boolean;
  treeData: TreeNode[];
  selectedNode: TreeNode | null;
  expandedKeys: string[];
  filters: {
    search?: string;
    level?: number;
    status?: string;
  };
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  createModal: {
    visible: boolean;
    level: 1 | 2 | 3 | 4;
    parentId?: string;
  };
  detailTab: DetailTab;

  fetchMetrics: () => Promise<void>;
  createMetric: (data: Partial<Metric>) => Promise<void>;
  updateMetric: (id: string, data: Partial<Metric>) => Promise<void>;
  deleteMetric: (id: string) => Promise<void>;
  selectNode: (node: TreeNode) => void;
  toggleExpand: (key: string) => void;
  setFilters: (filters: Partial<MetricState['filters']>) => void;
  setPagination: (pagination: Partial<MetricState['pagination']>) => void;
  openCreateModal: (level: 1 | 2 | 3 | 4, parentId?: string) => void;
  closeCreateModal: () => void;
  setDetailTab: (tab: DetailTab) => void;
}

const generateId = () => `metric-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const generateNodeId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const addNodeToTree = (tree: TreeNode[], parentId: string | undefined, newNode: TreeNode): TreeNode[] => {
  if (!parentId) {
    return [...tree, newNode];
  }
  return tree.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        expanded: true,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addNodeToTree(node.children, parentId, newNode),
      };
    }
    return node;
  });
};

const removeNodeFromTree = (tree: TreeNode[], nodeId: string): TreeNode[] => {
  return tree.filter(node => {
    if (node.id === nodeId) return false;
    if (node.children) {
      node.children = removeNodeFromTree(node.children, nodeId);
    }
    return true;
  });
};

export const useMetricStore = create<MetricState>((set, get) => ({
  metrics: mockMetrics,
  loading: false,
  treeData: mockTreeData,
  selectedNode: null,
  expandedKeys: ['node-1', 'node-3'],
  filters: {},
  pagination: {
    current: 1,
    pageSize: 10,
    total: mockMetrics.length,
  },
  createModal: {
    visible: false,
    level: 1,
  },
  detailTab: 'basic',

  fetchMetrics: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    set({ loading: false });
  },

  createMetric: async (data: Partial<Metric>) => {
    const newMetric: Metric = {
      id: generateId(),
      name: data.name || '',
      englishName: data.englishName || '',
      level: data.level || 1,
      parentId: data.parentId,
      description: data.description,
      businessOwner: data.businessOwner,
      developer: data.developer,
      status: 'draft',
      sql: data.sql,
      resultField: data.resultField,
      computeRule: data.computeRule,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    const { treeData, metrics } = get();
    
    let parentNodeId: string | undefined;
    if (data.parentId) {
      const findNode = (nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
          if (node.metricId === data.parentId) return node;
          if (node.children) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
        return null;
      };
      const parent = findNode(treeData);
      parentNodeId = parent?.id;
    }

    const newTreeNode: TreeNode = {
      id: generateNodeId(),
      name: newMetric.name,
      level: newMetric.level,
      metricId: newMetric.id,
    };

    const newTreeData = addNodeToTree(treeData, parentNodeId, newTreeNode);

    set({
      metrics: [...metrics, newMetric],
      treeData: newTreeData,
      pagination: {
        ...get().pagination,
        total: get().metrics.length + 1,
      },
    });

    get().closeCreateModal();
  },

  updateMetric: async (id: string, data: Partial<Metric>) => {
    const { metrics, treeData } = get();
    
    const updatedMetrics = metrics.map(metric => {
      if (metric.id === id) {
        return {
          ...metric,
          ...data,
          updatedAt: new Date().toISOString(),
          version: metric.version + 1,
        };
      }
      return metric;
    });

    const updateTreeNodeName = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.metricId === id && data.name) {
          return { ...node, name: data.name };
        }
        if (node.children) {
          return { ...node, children: updateTreeNodeName(node.children) };
        }
        return node;
      });
    };

    set({
      metrics: updatedMetrics,
      treeData: updateTreeNodeName(treeData),
    });
  },

  deleteMetric: async (id: string) => {
    const { metrics, treeData } = get();
    
    const findNodeIdByMetricId = (nodes: TreeNode[]): string | null => {
      for (const node of nodes) {
        if (node.metricId === id) return node.id;
        if (node.children) {
          const found = findNodeIdByMetricId(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const nodeId = findNodeIdByMetricId(treeData);
    
    set({
      metrics: metrics.filter(m => m.id !== id),
      treeData: nodeId ? removeNodeFromTree(treeData, nodeId) : treeData,
      pagination: {
        ...get().pagination,
        total: get().metrics.length - 1,
      },
    });
  },

  selectNode: (node: TreeNode) => {
    set({ selectedNode: node });
  },

  toggleExpand: (key: string) => {
    const { expandedKeys } = get();
    const newExpandedKeys = expandedKeys.includes(key)
      ? expandedKeys.filter(k => k !== key)
      : [...expandedKeys, key];
    set({ expandedKeys: newExpandedKeys });
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } });
  },

  setPagination: (pagination) => {
    set({ pagination: { ...get().pagination, ...pagination } });
  },

  openCreateModal: (level, parentId) => {
    set({ createModal: { visible: true, level, parentId } });
  },

  closeCreateModal: () => {
    set({ createModal: { visible: false, level: 1 } });
  },

  setDetailTab: (tab) => {
    set({ detailTab: tab });
  },
}));

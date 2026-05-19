export interface Metric {
  id: string;
  name: string;
  englishName: string;
  level: 1 | 2 | 3 | 4;
  parentId?: string;
  description?: string;
  businessOwner?: string;
  developer?: string;
  status: 'draft' | 'published';
  sql?: string;
  resultField?: string;
  computeRule?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface MetricVersion {
  id: string;
  metricId: string;
  version: number;
  changes: string;
  createdBy: string;
  createdAt: string;
}

export interface MetricLineage {
  id: string;
  metricId: string;
  upstream: string[];
  downstream: string[];
}

export interface TreeNode {
  id: string;
  name: string;
  level: number;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  metricId?: string;
}

export type DetailTab = 'basic' | 'preview' | 'family' | 'lineage' | 'version';

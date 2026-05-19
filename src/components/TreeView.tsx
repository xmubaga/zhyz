import { ChevronRight, Folder, Plus } from 'lucide-react';
import { useState } from 'react';
import { TreeNode } from '../types/metric';

interface TreeViewProps {
  data: TreeNode[];
  expandedKeys: string[];
  selectedNode: TreeNode | null;
  onSelect: (node: TreeNode) => void;
  onToggle: (key: string) => void;
  onContextMenu?: (e: React.MouseEvent, node: TreeNode) => void;
  onAddChild?: (node: TreeNode) => void;
}

interface TreeNodeItemProps {
  node: TreeNode;
  expandedKeys: string[];
  selectedNode: TreeNode | null;
  onSelect: (node: TreeNode) => void;
  onToggle: (key: string) => void;
  onContextMenu?: (e: React.MouseEvent, node: TreeNode) => void;
  onAddChild?: (node: TreeNode) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  expandedKeys,
  selectedNode,
  onSelect,
  onToggle,
  onContextMenu,
  onAddChild,
}) => {
  const isExpanded = expandedKeys.includes(node.id);
  const isSelected = selectedNode?.id === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center px-3 py-2 cursor-pointer text-sm group hover:bg-gray-100 rounded ${
          isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
        }`}
        onClick={() => onSelect(node)}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu?.(e, node);
        }}
      >
        {hasChildren ? (
          <ChevronRight
            className={`w-4 h-4 mr-1 transition-transform ${
              isExpanded ? 'rotate-90' : ''
            } text-gray-400`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
          />
        ) : (
          <div className="w-5" />
        )}
        <Folder className="w-4 h-4 mr-2 text-blue-500" />
        <span className="flex-1 truncate">{node.name}</span>
        {node.level < 4 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddChild?.(node);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
          >
            <Plus className="w-3 h-3 text-gray-500" />
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l border-gray-200 ml-5">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              expandedKeys={expandedKeys}
              selectedNode={selectedNode}
              onSelect={onSelect}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  expandedKeys,
  selectedNode,
  onSelect,
  onToggle,
  onContextMenu,
  onAddChild,
}) => {
  return (
    <div className="h-full overflow-y-auto py-2">
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          expandedKeys={expandedKeys}
          selectedNode={selectedNode}
          onSelect={onSelect}
          onToggle={onToggle}
          onContextMenu={onContextMenu}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
};

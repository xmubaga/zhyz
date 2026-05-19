# 指标管理系统 - Product Requirement Document

## Overview
- **Summary**: 构建企业级指标管理平台，提供指标目录管理、指标新建（1-4级）、指标详情查看、指标编辑与发布等核心功能，实现业务口径统一、资产化管理、血缘追溯。
- **Purpose**: 解决企业指标口径不统一、计算逻辑分散、结果不可追溯、重复开发等问题，为数据分析师、业务人员和数据开发人员提供统一的指标管理平台。
- **Target Users**: 
  - 数据分析师：查看指标、进行数据分析
  - 业务人员：了解业务指标、查看指标定义
  - 数据开发人员：定义和开发指标

## Goals
- 实现指标目录树管理，支持层级结构
- 提供指标列表展示和搜索筛选功能
- 支持1-4级指标的新建和管理
- 展示指标完整详情（基本信息、指标预览、族谱、血缘、版本）
- 构建完整的指标血缘链路，支持可视化追溯
- 提供友好的用户界面，严格按照原型设计规范

## Non-Goals (Out of Scope)
- 不实现用户权限管理和认证系统（已有基础登录框架）
- 不实现复杂的数据监控和告警功能
- 不实现仪表盘和快捷操作
- 不实现审批流程

## Background & Context
- 当前已有基础前端项目框架（React + TypeScript + Tailwind CSS + Vite）
- 已配置CloudBase自动部署
- 已有登录认证框架和基础路由结构
- 项目采用组件化开发，使用Zustand进行状态管理
- 需要严格按照原型文档的设计规范实现

## Functional Requirements
- **FR-1**: 指标管理首页 - 左侧目录树 + 右侧指标列表的布局
- **FR-2**: 指标目录树 - 支持层级结构展示、展开收起、选中高亮
- **FR-3**: 指标列表 - 展示指标列表、搜索、筛选、分页
- **FR-4**: 新建根指标（1级） - 弹窗表单创建1级指标
- **FR-5**: 新建基础指标（2级） - 弹窗表单创建2级指标，支持SQL编辑
- **FR-6**: 新建结果指标（3级） - 弹窗表单创建3级指标
- **FR-7**: 新建计算指标（4级） - 弹窗表单创建4级指标
- **FR-8**: 指标详情页 - Tab页签展示（基本信息、指标预览、族谱、血缘、版本）
- **FR-9**: 指标血缘 - 可视化展示上下游依赖关系
- **FR-10**: 指标版本管理 - 记录变更历史

## Non-Functional Requirements
- **NFR-1**: 页面加载时间不超过2秒，交互响应时间不超过500毫秒
- **NFR-2**: 支持至少1000个指标的管理，页面性能无明显下降
- **NFR-3**: 严格遵循原型文档的布局、色彩、字体规范
- **NFR-4**: 代码结构清晰、注释完整、遵循TypeScript最佳实践
- **NFR-5**: 组件可复用性高，遵循统一的设计规范

## Design Specifications (from Prototype Document)
### Layout Specifications
- 左侧目录树区域 + 右侧指标列表区域
- 目录树宽度：240px
- 列表区域自适应宽度

### Color Specifications
- 主色：蓝色系 (#2563eb)
- 文字色：深灰 (#1e293b)
- 背景色：浅灰 (#f1f5f9)
- 边框色：#e2e8f0

### Typography Specifications
- 标题字体：较大字号、粗体
- 正文字体：中等粗细
- 统一使用系统字体栈

## Constraints
- **Technical**: 使用现有技术栈（React 18 + TypeScript + Tailwind CSS + Vite）
- **Design**: 严格按照原型文档的页面布局和交互规范
- **Dependencies**: 
  - 依赖后端API（后续实现，当前使用Mock数据）
  - 使用Lucide React作为图标库
  - 使用Zustand进行状态管理

## Assumptions
- 用户已通过登录认证
- 后端API将按照前端设计的接口规范实现
- 数据存储和查询由后端处理
- 用户在现代浏览器环境下使用

## Acceptance Criteria

### AC-1: 指标管理首页布局
- **Given**: 用户进入指标管理页面
- **When**: 系统加载完成
- **Then**: 左侧显示目录树，右侧显示指标列表，布局符合原型规范
- **Verification**: `human-judgment`

### AC-2: 目录树功能
- **Given**: 用户在指标管理首页
- **When**: 用户操作目录树
- **Then**: 支持展开收起、选中高亮、层级展示
- **Verification**: `programmatic`

### AC-3: 指标列表展示
- **Given**: 用户在指标管理首页
- **When**: 系统加载完成
- **Then**: 展示指标列表，包含指标名称、英文名、业务负责人、创建时间等信息
- **Verification**: `programmatic`

### AC-4: 创建1级根指标
- **Given**: 用户有创建权限
- **When**: 用户点击新建根指标
- **Then**: 弹出表单弹窗，填写完成后指标保存到目录树和列表
- **Verification**: `programmatic`

### AC-5: 创建2-4级指标
- **Given**: 用户在目录树中选中某个指标
- **When**: 用户点击新建子指标
- **Then**: 根据选中指标的级别，显示对应的创建弹窗（2/3/4级）
- **Verification**: `programmatic`

### AC-6: 查看指标详情
- **Given**: 用户在指标列表或目录树中选中某个指标
- **When**: 用户点击查看详情
- **Then**: 跳转到指标详情页，显示5个Tab页签（基本信息、指标预览、族谱、血缘、版本）
- **Verification**: `human-judgment`

### AC-7: 指标血缘可视化
- **Given**: 用户在指标详情页
- **When**: 用户切换到血缘Tab
- **Then**: 以图形化方式展示指标的上下游依赖关系
- **Verification**: `human-judgment`

### AC-8: SQL编辑器
- **Given**: 用户创建2级基础指标
- **When**: 用户需要编辑SQL
- **Then**: 打开SQL编辑弹窗，支持SQL语法编辑
- **Verification**: `programmatic`

## Open Questions
- [ ] 指标血缘的数据格式和展示方式？
- [ ] SQL编辑器的具体功能和语法高亮要求？
- [ ] 版本对比和回滚的具体交互？
- [ ] 指标发布的流程和状态？

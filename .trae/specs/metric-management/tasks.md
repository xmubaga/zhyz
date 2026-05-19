# 指标管理系统 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 定义指标数据模型和类型
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 定义1-4级指标的数据结构和类型
  - 定义目录树节点结构
  - 定义指标详情相关数据结构
  - 创建Mock数据
- **Acceptance Criteria Addressed**: AC-1, AC-3, AC-6
- **Test Requirements**:
  - `programmatic` TR-1.1: TypeScript编译无错误
  - `human-judgement` TR-1.2: 类型定义合理，包含所有必需字段
- **Notes**: 参考原型文档中的字段要求

## [ ] Task 2: 创建指标状态管理Store
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建指标管理的Zustand store
  - 实现目录树状态管理（展开、收起、选中）
  - 实现指标列表状态管理（筛选、分页）
  - 实现CRUD操作
- **Acceptance Criteria Addressed**: AC-2, AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: Store正确管理所有状态
  - `programmatic` TR-2.2: CRUD操作正常工作
- **Notes**: Store结构清晰，易于维护

## [ ] Task 3: 实现指标管理首页布局
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 实现左侧目录树区域（240px宽度）
  - 实现右侧指标列表区域
  - 实现整体布局样式（符合原型规范）
  - 添加搜索、筛选、分页功能
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `human-judgement` TR-3.1: 布局符合原型设计
  - `programmatic` TR-3.2: 搜索和筛选功能正常
  - `programmatic` TR-3.3: 分页功能正常
- **Notes**: 严格按照原型文档的布局规范

## [ ] Task 4: 实现目录树组件
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 创建目录树组件
  - 支持层级结构展示
  - 支持展开收起
  - 支持选中高亮
  - 支持右键菜单（新建子指标）
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-4.1: 层级结构正确显示
  - `programmatic` TR-4.2: 展开收起功能正常
  - `programmatic` TR-4.3: 选中高亮正确
- **Notes**: 使用递归组件实现

## [ ] Task 5: 实现指标列表组件
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 创建指标列表表格组件
  - 展示指标名称、英文名、业务负责人、创建时间等字段
  - 支持列表项点击跳转到详情页
  - 支持操作按钮（编辑、删除等）
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-5.1: 列表展示美观
  - `programmatic` TR-5.2: 列表数据正确加载
  - `programmatic` TR-5.3: 点击跳转功能正常
- **Notes**: 参考原型文档中的列表字段

## [ ] Task 6: 实现新建根指标弹窗（1级）
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 创建1级指标新建表单弹窗
  - 实现表单字段（指标名称、英文名、描述等）
  - 实现表单验证
  - 实现提交保存功能
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-6.1: 弹窗正常打开关闭
  - `programmatic` TR-6.2: 表单验证正常
  - `programmatic` TR-6.3: 保存后列表和目录树更新
- **Notes**: 表单字段参考原型文档

## [ ] Task 7: 实现新建基础指标弹窗（2级）
- **Priority**: P0
- **Depends On**: Task 4, Task 6
- **Description**: 
  - 创建2级指标新建表单弹窗
  - 继承1级表单的基础字段
  - 添加2级特有的字段
  - 实现SQL编辑器弹窗
- **Acceptance Criteria Addressed**: AC-5, AC-8
- **Test Requirements**:
  - `programmatic` TR-7.1: 2级表单正常显示
  - `programmatic` TR-7.2: SQL编辑器弹窗正常
  - `programmatic` TR-7.3: 保存后指标正确添加到父级下
- **Notes**: 参考原型文档的2级表单结构

## [ ] Task 8: 实现新建结果指标弹窗（3级）
- **Priority**: P0
- **Depends On**: Task 4, Task 7
- **Description**: 
  - 创建3级指标新建表单弹窗
  - 继承2级表单的基础字段
  - 添加3级特有的字段
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-8.1: 3级表单正常显示
  - `programmatic` TR-8.2: 保存后指标正确添加到父级下
- **Notes**: 参考原型文档的3级表单结构

## [ ] Task 9: 实现新建计算指标弹窗（4级）
- **Priority**: P1
- **Depends On**: Task 4, Task 8
- **Description**: 
  - 创建4级指标新建表单弹窗
  - 继承3级表单的基础字段
  - 添加4级特有的字段
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-9.1: 4级表单正常显示
  - `programmatic` TR-9.2: 保存后指标正确添加到父级下
- **Notes**: 参考原型文档的4级表单结构

## [ ] Task 10: 实现指标详情页框架
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 创建指标详情页路由和布局
  - 实现5个Tab页签导航
  - 实现Tab切换功能
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `human-judgement` TR-10.1: 详情页布局正确
  - `programmatic` TR-10.2: Tab切换功能正常
- **Notes**: 5个Tab：基本信息、指标预览、族谱、血缘、版本

## [ ] Task 11: 实现指标详情页 - 基本信息Tab
- **Priority**: P1
- **Depends On**: Task 10
- **Description**: 
  - 实现基本信息Tab内容
  - 展示指标的完整信息
  - 实现编辑功能
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `human-judgement` TR-11.1: 信息展示完整
  - `programmatic` TR-11.2: 编辑功能正常
- **Notes**: 参考原型文档的字段

## [ ] Task 12: 实现指标详情页 - 其他Tab
- **Priority**: P1
- **Depends On**: Task 10
- **Description**: 
  - 实现指标预览Tab
  - 实现族谱Tab（父子关系展示）
  - 实现血缘Tab（上下游依赖可视化）
  - 实现版本信息Tab
- **Acceptance Criteria Addressed**: AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-12.1: 各Tab内容正确显示
  - `human-judgement` TR-12.2: 血缘可视化清晰易用
- **Notes**: 可以先实现简化版本

## [ ] Task 13: SQL编辑器组件
- **Priority**: P1
- **Depends On**: Task 7
- **Description**: 
  - 创建SQL编辑器弹窗组件
  - 支持SQL语法显示
  - 支持基本的编辑功能
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `programmatic` TR-13.1: 编辑器正常打开关闭
  - `human-judgement` TR-13.2: SQL显示清晰
- **Notes**: 可以使用简单的textarea或引入轻量级编辑器

## [ ] Task 14: 完善目录树右键菜单
- **Priority**: P2
- **Depends On**: Task 4
- **Description**: 
  - 实现目录树节点右键菜单
  - 支持新建子指标
  - 支持编辑、删除等操作
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-14.1: 右键菜单正常显示
  - `programmatic` TR-14.2: 菜单操作功能正常
- **Notes**: 根据选中节点级别显示不同菜单

## [ ] Task 15: 代码优化和文档
- **Priority**: P2
- **Depends On**: All previous tasks
- **Description**: 
  - 优化组件代码结构
  - 添加必要的注释
  - 完善README文档
  - 部署验证
- **Acceptance Criteria Addressed**: NFR-3, NFR-4
- **Test Requirements**:
  - `human-judgement` TR-15.1: 代码结构清晰
  - `human-judgement` TR-15.2: 文档完整
  - `programmatic` TR-15.3: 部署成功
- **Notes**: 确保所有功能完成后进行

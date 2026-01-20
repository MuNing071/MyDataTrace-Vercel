# MyDataTrace - 时光数绘轨迹图 (Next.js版本)

一个基于Next.js的交互式数据分析与可视化工具，用于记录和展示个人成长轨迹。这是原Streamlit版本的Next.js复现，提供更好的性能和用户体验。

## 功能特点

- **📅 灵活的时间配置**：支持季度、月度、年度等多种时间粒度
- **📋 自定义问题设置**：可根据个人需求添加、修改、删除回顾问题
- **📝 便捷的数据录入**：直观的评分和说明录入界面
- **🎨 精美的可视化图表**：自动生成美观的轨迹图，支持自定义配色
- **📷 一键导出图片**：支持JPG和PNG格式导出
- **📱 响应式设计**：完美适配移动端和桌面端

## 技术栈

- **Next.js 15**：React框架，提供出色的性能和SEO
- **TypeScript**：类型安全的JavaScript超集
- **Tailwind CSS**：实用优先的CSS框架
- **Chart.js**：强大的数据可视化库
- **Zustand**：轻量级状态管理
- **html2canvas**：将DOM元素转换为图片

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 使用流程

1. **设置时间范围**：选择要回顾的开始和结束时间，以及时间粒度
2. **配置问题**：添加或修改你想要回顾的问题
3. **录入数据**：为每个问题在不同时间点进行评分和添加说明
4. **生成图表**：点击"🚀 立即生成并显示图表"按钮查看你的成长轨迹图
5. **导出图片**：选择格式并点击"🚀 一键导出"按钮保存图表

## 项目结构

```
MyDataTrace-Vercel/
├── app/                    # Next.js应用目录
│   ├── globals.css         # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/             # React组件
│   ├── TimeConfig.tsx     # 时间配置组件
│   ├── ItemManager.tsx    # 问题管理组件
│   ├── DataEntry.tsx      # 数据录入组件
│   ├── ChartVisualization.tsx  # 图表可视化组件
│   └── ExportButton.tsx   # 导出按钮组件
├── store/                 # 状态管理
│   └── useAppStore.ts     # Zustand状态存储
├── types/                 # TypeScript类型定义
│   └── index.ts
├── utils/                 # 工具函数
│   └── helpers.ts         # 辅助函数
├── public/               # 静态资源
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
├── tailwind.config.ts    # Tailwind配置
└── next.config.mjs       # Next.js配置
```

## 部署到Vercel

1. 将代码推送到GitHub仓库
2. 在Vercel中导入该仓库
3. Vercel会自动检测Next.js项目并进行部署
4. 部署完成后即可访问你的应用

## 与原Streamlit版本的对比

| 特性 | Streamlit版本 | Next.js版本 |
|------|--------------|-------------|
| 性能 | 较慢 | 更快 |
| SEO | 有限 | 优秀 |
| 部署 | 需要服务器 | Vercel免费部署 |
| 响应式 | 基础 | 优秀 |
| 交互体验 | 一般 | 流畅 |
| 类型安全 | 无 | TypeScript |

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](../LICENSE) 文件了解详情

## 联系方式

- 原项目：[https://github.com/MuNing071/image-generator](https://github.com/MuNing071/image-generator)
- 作者：小红书 [@沐宁](https://www.xiaohongshu.com/user/profile/5a05b24ce8ac2b75beec5026)

---

用数据当画笔，绘出独属于你的时光轨迹！✨

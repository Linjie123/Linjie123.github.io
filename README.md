# 上海爱斯利嘉半导体科技有限公司官网

## 项目简介
这是上海爱斯利嘉半导体科技有限公司的官方网站项目，采用现代化的响应式设计，为访问者提供良好的浏览体验。项目包含前端展示页面和完整的后台管理系统。

## 技术栈
### 前端展示
- HTML5
- CSS3
- JavaScript
- 响应式设计

### 后台管理系统
- Node.js
- 原生HTTP模块
- EJS模板引擎
- JSON数据存储

## 主要功能
- 首页：公司简介和核心数据展示
- 关于我们：公司历史、核心价值观和主要成就
- 解决方案：各类技术解决方案展示
- 服务：技术支持、软件开发、咨询顾问等服务介绍
- 联系我们：联系方式和在线留言表单

## 项目结构
```
Linjie123.github.io/
│
├── index.html # 主页面
├── styles.css # 样式文件
├── script.js # JavaScript 文件
│
├── images/ # 图片资源目录
│   ├── consulting.svg
│   ├── logo.svg
│   ├── software-dev.svg
│   ├── tech-support.svg
│   └── training.svg
│
└── admin/ # 后台管理系统
    ├── data/ # JSON数据存储
    ├── public/ # 静态资源
    │   ├── css/
    │   └── js/
    ├── views/ # 页面模板
    │   └── manage/ # 管理页面
    ├── app.js # Express应用（备用）
    └── simple-server.js # 简化版服务器（推荐使用）
```


## 部署
本项目使用 GitHub Pages 部署，访问地址：https://linjie123.github.io

## 本地开发
### 前端页面开发
1. 克隆项目 
   ```bash
   git clone https://github.com/Linjie123/Linjie123.github.io.git
   ```
2. 打开项目
   ```bash
   cd Linjie123.github.io
   ```
3. 使用浏览器打开 index.html 文件即可本地预览

### 后台管理系统使用
1. 进入admin目录
   ```bash
   cd admin
   ```
2. 启动服务器（无需安装依赖）
   ```bash
   node simple-server.js
   ```
3. 访问后台管理系统
   ```
   http://localhost:3000/dashboard
   ```
   
## 更新维护
```bash
git add .
git commit -m "Update message"
git push
```

### 后台管理系统说明
- 后台管理系统支持对网站所有主要内容进行编辑
- 包括首页、关于我们、服务、解决方案和联系信息
- 所有更改会自动保存到admin/data目录下的JSON文件中
- 数据保存后，前端页面会自动读取并展示最新内容

## 浏览器支持
### 前端页面
- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

### 后台管理系统
- Chrome (推荐)
- Firefox
- Safari
- Edge
- Internet Explorer 11+

## 贡献
如有建议或问题，请提交 Issue 或 Pull Request

## 许可证
版权所有 © 2024 上海爱斯利嘉半导体科技有限公司

## 注意事项
- 后台管理系统仅用于内部使用，请勿在生产环境暴露
- 请确保定期备份data目录下的JSON数据文件
- 如需扩展功能，可以基于现有架构进行开发

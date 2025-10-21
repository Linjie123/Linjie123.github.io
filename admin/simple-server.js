const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 数据存储路径
const DATA_DIR = path.join(__dirname, 'data');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 初始化示例数据
function initializeData() {
  const initialData = {
    home: {
      title: '创新技术解决方案提供商',
      subtitle: '专注于企业数字化转型，提供全方位的技术支持',
      features: [
        { title: '专业团队', description: '拥有多年行业经验的技术专家团队' },
        { title: '创新方案', description: '定制化解决方案，满足客户多样化需求' },
        { title: '技术领先', description: '持续跟进前沿技术，保持技术优势' }
      ],
      stats: [
        { label: '项目完成', value: '500+' },
        { label: '客户满意度', value: '98%' },
        { label: '专业人才', value: '100+' },
        { label: '合作企业', value: '200+' }
      ]
    },
    about: {
      companyIntro: '公司成立于2014年，是一家专注于企业数字化转型的高科技公司。多年来，我们一直致力于为客户提供最优质的技术解决方案，帮助企业实现业务增长和数字化升级。',
      history: [
        { year: '2014', title: '公司成立', description: '在上海成立，专注于企业信息化建设' },
        { year: '2016', title: '业务拓展', description: '扩展到北京、广州等多个城市' },
        { year: '2018', title: '技术升级', description: '引入云计算和大数据技术' },
        { year: '2020', title: '数字化转型', description: '全面转向数字化转型服务' },
        { year: '2024', title: '持续创新', description: '持续技术创新，服务更多客户' }
      ],
      team: [
        { name: '张三', position: 'CEO', bio: '10年+IT行业经验，曾任职于知名科技公司' },
        { name: '李四', position: 'CTO', bio: '技术专家，专注于云计算和大数据领域' },
        { name: '王五', position: '运营总监', bio: '丰富的企业运营和项目管理经验' }
      ],
      techCapabilities: '我们拥有强大的技术团队，精通云计算、大数据、人工智能、物联网等前沿技术，能够为客户提供全方位的技术支持。',
      coreValues: [
        '客户至上',
        '持续创新',
        '专业专注',
        '团队协作',
        '诚信为本',
        '追求卓越'
      ],
      achievements: '截至目前，我们已为超过200家企业提供了技术服务，帮助客户实现了业务增长和数字化升级。获得了多项行业认证和客户好评。',
      visionMission: '愿景：成为全球领先的数字化转型服务提供商。使命：通过技术创新，赋能企业数字化转型，创造更大价值。',
      strategy: '未来，我们将继续加大研发投入，不断提升技术能力，拓展服务领域，为客户提供更加优质的服务。'
    },
    services: [
      {
        title: '技术支持',
        icon: 'tech-support.svg',
        description: '提供全方位的技术支持服务，解决客户在使用过程中遇到的各种问题。',
        items: [
          '7*24小时技术支持热线',
          '远程协助诊断',
          '定期系统维护',
          '紧急问题处理'
        ]
      },
      {
        title: '系统集成',
        icon: 'system-integration.svg',
        description: '根据客户需求，提供系统集成解决方案，实现不同系统间的无缝连接。',
        items: [
          '企业应用集成',
          '数据集成与迁移',
          'API开发与管理',
          '系统接口定制'
        ]
      },
      {
        title: '软件开发',
        icon: 'software-development.svg',
        description: '定制化软件开发服务，满足客户特定业务需求。',
        items: [
          'Web应用开发',
          '移动应用开发',
          '企业级应用开发',
          '系统架构设计'
        ]
      },
      {
        title: '培训服务',
        icon: 'training.svg',
        description: '提供专业的技术培训服务，提升客户团队的技术能力。',
        items: [
          '定制化培训课程',
          '技术认证培训',
          '实操技能培训',
          '在线学习平台'
        ]
      }
    ],
    solutions: [
      {
        title: '企业数字化转型',
        description: '帮助企业实现全面数字化转型，提升业务效率和竞争力。',
        items: [
          '数字化战略规划',
          '业务流程优化',
          '数据驱动决策',
          '创新商业模式'
        ]
      },
      {
        title: '云解决方案',
        description: '提供专业的云服务解决方案，帮助客户实现IT基础设施现代化。',
        items: [
          '云迁移评估',
          '多云环境管理',
          '容器化部署',
          '云安全保障'
        ]
      },
      {
        title: '大数据分析',
        description: '利用大数据技术，帮助客户挖掘数据价值，提升业务洞察能力。',
        items: [
          '数据采集与存储',
          '数据清洗与处理',
          '数据分析与建模',
          '可视化报告'
        ]
      },
      {
        title: '人工智能应用',
        description: '将人工智能技术应用于企业业务场景，提升智能化水平。',
        items: [
          '机器学习模型开发',
          '自然语言处理',
          '计算机视觉应用',
          '智能推荐系统'
        ]
      },
      {
        title: '物联网解决方案',
        description: '提供物联网技术解决方案，帮助客户实现设备互联和智能化管理。',
        items: [
          'IoT平台搭建',
          '设备接入管理',
          '数据采集分析',
          '远程监控控制'
        ]
      },
      {
        title: '信息安全服务',
        description: '全面的信息安全解决方案，保障企业数据和系统安全。',
        items: [
          '安全评估与加固',
          '渗透测试',
          '安全监控与响应',
          '合规咨询服务'
        ]
      },
      {
        title: 'DevOps转型',
        description: '帮助企业实现DevOps转型，提升软件开发和交付效率。',
        items: [
          'CI/CD流程搭建',
          '自动化测试',
          '基础设施即代码',
          '容器编排管理'
        ]
      },
      {
        title: '移动应用解决方案',
        description: '提供移动应用开发和运营解决方案，满足移动化需求。',
        items: [
          'iOS/Android应用开发',
          '混合应用开发',
          '移动UI/UX设计',
          '应用发布与运营'
        ]
      }
    ],
    contact: {
      contactInfo: [
        { type: 'phone', icon: 'phone.svg', content: '400-123-4567' },
        { type: 'email', icon: 'email.svg', content: 'contact@example.com' },
        { type: 'address', icon: 'address.svg', content: '上海市浦东新区张江高科技园区博云路2号' },
        { type: 'time', icon: 'time.svg', content: '周一至周五 9:00-18:00' }
      ],
      formTitle: '联系我们',
      formDescription: '如果您有任何问题或需求，请填写下面的表单，我们的客服人员会尽快与您联系。',
      successMessage: '感谢您的留言！我们将尽快与您联系。'
    }
  };

  // 保存初始数据
  Object.keys(initialData).forEach(key => {
    const filePath = path.join(DATA_DIR, `${key}.json`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(initialData[key], null, 2));
    }
  });
}

// 读取数据
function readData(page) {
  const filePath = path.join(DATA_DIR, `${page}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`读取数据失败: ${page}`, error);
      return null;
    }
  }
  return null;
}

// 写入数据
function writeData(page, data) {
  const filePath = path.join(DATA_DIR, `${page}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`写入数据失败: ${page}`, error);
    return false;
  }
}

// 解析表单数据
function parseFormData(body) {
  const formData = {};
  const pairs = body.split('&');
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      formData[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return formData;
}

// 渲染HTML页面
function renderHtml(templatePath, data = {}) {
  try {
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // 简单的模板替换
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`\$\{${key}\}`, 'g');
      template = template.replace(regex, data[key]);
    });
    
    return template;
  } catch (error) {
    console.error(`渲染模板失败: ${templatePath}`, error);
    return `<html><body><h1>500 Internal Server Error</h1><p>${error.message}</p></body></html>`;
  }
}

// 处理请求
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 静态文件服务
  if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const extname = path.extname(filePath);
      let contentType = 'text/html';
      
      switch (extname) {
        case '.css':
          contentType = 'text/css; charset=utf-8';
          break;
        case '.js':
          contentType = 'application/javascript; charset=utf-8';
          break;
        case '.json':
          contentType = 'application/json; charset=utf-8';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpeg';
          break;
        case '.svg':
          contentType = 'image/svg+xml; charset=utf-8';
          break;
        default:
          contentType = 'text/html; charset=utf-8';
          break;
      }
      
      res.setHeader('Content-Type', contentType);
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.writeHead(404);
      res.end('404 Not Found');
    }
    return;
  }
  
  // API路由
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    // 获取数据API
    if (req.method === 'GET') {
      const page = pathname.replace('/api/', '');
      const data = readData(page);
      if (data) {
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, data }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: '数据未找到' }));
      }
    }
    // 更新数据API
    else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const page = pathname.replace('/api/', '');
          let data = body;
          
          // 尝试解析JSON
          try {
            data = JSON.parse(body);
          } catch (e) {
            // 如果不是JSON，尝试解析为表单数据
            data = parseFormData(body);
          }
          
          if (writeData(page, data)) {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: '数据更新成功' }));
          } else {
            res.writeHead(500);
            res.end(JSON.stringify({ success: false, message: '数据更新失败' }));
          }
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, message: '请求数据格式错误' }));
        }
      });
    }
    return;
  }
  
  // 管理页面路由
  if (pathname === '/') {
    res.writeHead(302, { 'Location': '/dashboard' });
    res.end();
  }
  else if (pathname === '/dashboard') {
    // 提供一个简单的仪表盘HTML
    const html = `
      <html>
      <head>
        <title>管理系统仪表盘</title>
        <link rel="stylesheet" href="/public/css/style.css">
      </head>
      <body>
        <div class="container">
          <div class="sidebar">
            <h2>管理系统</h2>
            <nav>
              <ul>
                <li><a href="/dashboard" class="active">仪表盘</a></li>
                <li><a href="/manage/home">首页管理</a></li>
                <li><a href="/manage/about">关于我们管理</a></li>
                <li><a href="/manage/services">服务管理</a></li>
                <li><a href="/manage/solutions">解决方案管理</a></li>
                <li><a href="/manage/contact">联系我们管理</a></li>
                <li><a href="/logout">退出登录</a></li>
              </ul>
            </nav>
          </div>
          <div class="main-content">
            <div class="header">
              <h1>系统管理</h1>
              <div class="user-info">
                <span>管理员</span>
                <a href="/logout">退出</a>
              </div>
            </div>
            <h2 class="page-title">系统概览</h2>
            <div class="stats-cards">
              <div class="stat-card">
                <div class="stat-icon">📄</div>
                <div class="stat-content">
                  <h4>6</h4>
                  <p>可管理页面</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💼</div>
                <div class="stat-content">
                  <h4>4</h4>
                  <p>服务项目</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🔍</div>
                <div class="stat-content">
                  <h4>8</h4>
                  <p>解决方案</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-content">
                  <h4>5</h4>
                  <p>发展历程</p>
                </div>
              </div>
            </div>
            <div class="section">
              <h3>快速操作</h3>
              <div class="quick-actions">
                <a href="/manage/home">首页管理</a>
                <a href="/manage/about">关于我们管理</a>
                <a href="/manage/services">服务管理</a>
                <a href="/manage/solutions">解决方案管理</a>
                <a href="/manage/contact">联系我们管理</a>
              </div>
            </div>
            <div class="info-box">
              <p>提示：后台管理系统已成功启动。您可以通过左侧导航栏访问各个管理页面，修改网站内容。</p>
            </div>
          </div>
        </div>
        <script src="/public/js/main.js"></script>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  }
  else if (pathname.startsWith('/manage/')) {
    const page = pathname.replace('/manage/', '');
    const allowedPages = ['home', 'about', 'services', 'solutions', 'contact'];
    
    if (allowedPages.includes(page)) {
      const data = readData(page);
      
      // 提供一个简单的管理页面HTML
      const html = `
        <html>
        <head>
          <title>${page === 'home' ? '首页' : page === 'about' ? '关于我们' : page === 'services' ? '服务' : page === 'solutions' ? '解决方案' : '联系我们'}管理</title>
          <link rel="stylesheet" href="/public/css/style.css">
        </head>
        <body>
          <div class="container">
            <div class="sidebar">
              <h2>管理系统</h2>
              <nav>
                <ul>
                  <li><a href="/dashboard">仪表盘</a></li>
                  <li><a href="/manage/home" ${page === 'home' ? 'class="active"' : ''}>首页管理</a></li>
                  <li><a href="/manage/about" ${page === 'about' ? 'class="active"' : ''}>关于我们管理</a></li>
                  <li><a href="/manage/services" ${page === 'services' ? 'class="active"' : ''}>服务管理</a></li>
                  <li><a href="/manage/solutions" ${page === 'solutions' ? 'class="active"' : ''}>解决方案管理</a></li>
                  <li><a href="/manage/contact" ${page === 'contact' ? 'class="active"' : ''}>联系我们管理</a></li>
                  <li><a href="/logout">退出登录</a></li>
                </ul>
              </nav>
            </div>
            <div class="main-content">
              <div class="header">
                <h1>系统管理</h1>
                <div class="user-info">
                  <span>管理员</span>
                  <a href="/logout">退出</a>
                </div>
              </div>
              <h2 class="page-title">${page === 'home' ? '首页内容管理' : page === 'about' ? '关于我们内容管理' : page === 'services' ? '服务内容管理' : page === 'solutions' ? '解决方案内容管理' : '联系信息管理'}</h2>
              <form id="editForm">
                <div id="jsonEditor" style="width: 100%; min-height: 600px;">
                  <textarea id="dataInput" style="width: 100%; min-height: 600px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; font-family: monospace;">
${JSON.stringify(data, null, 2)}
                  </textarea>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-save">保存更改</button>
                  <a href="/dashboard" class="btn btn-cancel">取消</a>
                </div>
              </form>
            </div>
          </div>
          <script>
            document.getElementById('editForm').addEventListener('submit', function(e) {
              e.preventDefault();
              
              try {
                const dataInput = document.getElementById('dataInput').value;
                const data = JSON.parse(dataInput);
                
                fetch('/api/${page}', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                  if (result.success) {
                    alert('保存成功！');
                  } else {
                    alert('保存失败：' + result.message);
                  }
                })
                .catch(error => {
                  alert('保存失败：' + error.message);
                });
              } catch (error) {
                alert('JSON格式错误：' + error.message);
              }
            });
          </script>
        </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html);
    } else {
      res.writeHead(404);
      res.end('404 Not Found');
    }
  }
  else if (pathname === '/logout') {
    res.writeHead(302, { 'Location': '/dashboard' });
    res.end();
  }
  else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
}

// 创建服务器
function startServer(port = 3000) {
  // 初始化数据
  initializeData();
  
  // 创建HTTP服务器
  const server = http.createServer(handleRequest);
  
  // 启动服务器
  server.listen(port, () => {
    console.log(`服务器已启动，监听端口 ${port}`);
    console.log(`访问地址: http://localhost:${port}/dashboard`);
  });
  
  return server;
}

// 启动服务器
startServer();
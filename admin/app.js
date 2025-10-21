const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs-extra');

// 创建Express应用
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 配置中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 配置会话
app.use(session({
  secret: 'semiconductor_admin_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// 验证登录中间件
function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// 模拟数据存储目录
const dataDir = path.join(__dirname, 'data');
fs.ensureDirSync(dataDir);

// 定义默认管理员账号
const defaultAdmin = {
  username: 'admin',
  password: 'admin123' // 在生产环境中应该使用加密存储
};

// 导入路由
const routes = require('./routes/index');

// 设置路由
app.use('/', routes);

// 登录页面
app.get('/login', (req, res) => {
  res.render('login');
});

// 登录处理
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === defaultAdmin.username && password === defaultAdmin.password) {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: '用户名或密码错误' });
  }
});

// 登出处理
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// 仪表盘
app.get('/dashboard', requireLogin, (req, res) => {
  res.render('dashboard', { username: req.session.username });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
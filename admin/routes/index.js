const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');

// 验证登录中间件
function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// 数据存储目录
const dataDir = path.join(__dirname, '../data');

// 初始化数据文件
function initDataFiles() {
  const fileStructure = {
    'homepage.json': {
      headline: '我们是一家专注于半导体技术研发与创新的高科技企业',
      features: [
        '提供先进的半导体解决方案和技术支持',
        '专注于集成电路设计与制造工艺优化',
        '推动半导体技术的本土化发展',
        '为客户提供全方位的技术咨询服务'
      ],
      commitment: '凭借深厚的技术积累和创新能力，我们持续为中国半导体产业的发展贡献力量。',
      stats: {
        experience: '10+',
        patents: '100+',
        partners: '500+'
      }
    },
    'about.json': {
      introduction: '上海爱斯利嘉半导体科技有限公司是中国领先的半导体技术企业，专注于为客户提供全方位的半导体解决方案和技术服务。我们的使命是通过创新的技术和服务，帮助客户实现他们的业务目标，推动中国半导体产业的自主创新与可持续发展。',
      timeline: [
        { year: '2014', description: '公司在上海浦东新区成立，专注于半导体技术研发' },
        { year: '2016', description: '获得首轮融资，扩大研发团队规模，建立初步实验室' },
        { year: '2018', description: '获得国家高新技术企业认证，推出首批自主研发的集成电路产品' },
        { year: '2020', description: '扩建现代化研发中心，引进国际先进设备，加强产学研合作' },
        { year: '2022', description: '产品成功进入国际市场，与多家全球领先企业建立合作关系' },
        { year: '2024', description: '持续技术创新，扩大产品线，提升服务能力，巩固行业领先地位' }
      ],
      team: {
        description: '我们拥有一支由行业专家、技术精英组成的高素质团队，其中：',
        points: [
          '核心研发团队成员均拥有硕士及以上学历，平均行业经验超过10年',
          '多位专家来自国际知名半导体企业，拥有丰富的产品开发和项目管理经验',
          '与多所知名高校建立联合实验室，吸引顶尖人才加入',
          '定期组织团队参加国际学术交流和技术培训，保持技术前沿性'
        ],
        conclusion: '我们注重人才培养和团队建设，为员工提供良好的发展平台和创新环境，致力于打造一支具有国际视野和创新能力的半导体专业团队。'
      },
      techCapabilities: {
        description: '公司拥有强大的技术研发能力和完善的产品线：',
        points: [
          '自主研发的核心技术涵盖数字电路、模拟电路、混合信号设计等多个领域',
          '具备从芯片设计、仿真验证到测试封装的全流程技术能力',
          '拥有100+项技术专利和软件著作权，技术创新能力处于行业领先水平',
          '建立了完善的EDA工具链和仿真环境，支持先进工艺节点的芯片开发',
          '拥有现代化的测试实验室，配备先进的测试设备和分析仪器'
        ]
      },
      coreValues: [
        { title: '创新驱动', description: '持续投入研发，推动技术突破，保持技术领先优势' },
        { title: '品质至上', description: '建立严格的质量管控体系，确保产品和服务的高品质' },
        { title: '客户为本', description: '深入理解客户需求，为客户创造最大价值' },
        { title: '合作共赢', description: '与合作伙伴建立长期稳定的合作关系，共同发展' },
        { title: '诚信正直', description: '坚持诚信经营，遵守商业道德和行业规范' },
        { title: '责任担当', description: '积极承担社会责任，推动行业健康发展' }
      ],
      achievements: [
        '获得国家高新技术企业认证',
        '拥有100+项发明专利和实用新型专利',
        '建立完善的研发中心和实验室，配备先进的研发设备',
        '与多所高校建立产学研合作关系，共同培养专业人才',
        '产品广泛应用于消费电子、汽车电子、物联网等多个领域',
        '获得多项行业奖项和客户认可',
        '成功进入国际市场，与多家全球领先企业建立合作关系'
      ],
      visionMission: {
        vision: '成为全球领先的半导体技术解决方案提供商，引领行业技术发展，为构建智能互联的未来贡献力量。',
        mission: '通过持续的技术创新和优质的服务，为客户创造价值，推动中国半导体产业的自主创新与可持续发展，助力实现半导体强国梦。'
      },
      strategicPlan: {
        description: '未来三年，公司将围绕以下战略方向发展：',
        points: [
          '加大研发投入，重点发展先进工艺节点的芯片设计技术',
          '拓展产品线，重点布局物联网、汽车电子、人工智能等新兴领域',
          '加强国际合作，提升全球市场竞争力',
          '完善人才培养体系，吸引和培养更多优秀人才',
          '推进数字化转型，提升企业运营效率和创新能力'
        ]
      }
    },
    'services.json': [
      {
        title: '技术支持',
        icon: 'tech-support.svg',
        description: '提供全面的半导体技术支持服务：',
        items: [
          '工艺优化与改进方案',
          '技术难题诊断与解决',
          '性能测试与分析',
          '质量控制体系建设'
        ]
      },
      {
        title: '软件开发开发',
        icon: 'software-dev.svg',
        description: '专业的半导体相关软件开发服务：',
        items: [
          '芯片设计自动化工具',
          '制程控制软件开发',
          '测试系统集成方案',
          '数据分析平台开发'
        ]
      },
      {
        title: '咨询顾问',
        icon: 'consulting.svg',
        description: '专业的半导体产业咨询服务：',
        items: [
          '工艺路线规划建议',
          '产能优化方案设计',
          '技术发展趋势分析',
          '投资可行性研究'
        ]
      },
      {
        title: '培训和支持',
        icon: 'training.svg',
        description: '全方位的技术培训与支持：',
        items: [
          '工艺技术培训课程',
          '设备操作技能培训',
          '质量管理体系培训',
          '现场技术指导服务'
        ]
      }
    ],
    'solutions.json': [
      {
        title: '集成电路设计',
        description: '提供完整的集成电路设计解决方案',
        items: [
          '数字电路设计',
          '模拟电路设计',
          '混合信号设计',
          'IP核开发'
        ]
      },
      {
        title: '工艺优化',
        description: '专业的半导体工艺优化方案：',
        items: [
          '制程改进',
          '良率提升',
          '成本优化',
          '工艺整合'
        ]
      },
      {
        title: '测试与验证',
        description: '全面的测试验证服务：',
        items: [
          '功能验证',
          '性能测试',
          '可靠性验证',
          '失效分析'
        ]
      },
      {
        title: '产品定制',
        description: '个性化的产品定制服务：',
        items: [
          '需求分析',
          '方案设计',
          '原型开发',
          '量产支持'
        ]
      },
      {
        title: '物联网芯片解决方案',
        description: '针对物联网应用的专用芯片方案：',
        items: [
          '低功耗设计',
          '无线通信集成',
          '传感器接口开发',
          '安全加密模块'
        ]
      },
      {
        title: '功率半导体解决方案',
        description: '高效能功率半导体产品与方案：',
        items: [
          '功率MOSFET设计',
          'IGBT模块开发',
          '电源管理IC',
          '能源转换系统'
        ]
      },
      {
        title: '汽车电子解决方案',
        description: '符合车规级标准的半导体解决方案：',
        items: [
          'ADAS系统芯片',
          '车载信息娱乐系统',
          '电池管理系统',
          '汽车安全芯片'
        ]
      },
      {
        title: '光电子解决方案',
        description: '先进的光电子技术与产品：',
        items: [
          '光电探测器',
          '激光二极管驱动',
          '光通信芯片',
          '图像传感器'
        ]
      }
    ],
    'contact.json': {
      phone: '021-XXXX-XXXX',
      contactPerson: '陶经理',
      workingHours: '周一至周五 9:00-18:00',
      address: '上海市浦东新区XX路XX号'
    }
  };

  // 创建数据文件
  Object.entries(fileStructure).forEach(([filename, content]) => {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
      fs.ensureFileSync(filePath);
      fs.writeJsonSync(filePath, content);
    }
  });
}

// 初始化数据
initDataFiles();

// 获取数据的通用函数
function getData(filename) {
  const filePath = path.join(dataDir, filename);
  try {
    return fs.readJsonSync(filePath);
  } catch (error) {
    console.error(`读取数据文件 ${filename} 失败:`, error);
    return null;
  }
}

// 保存数据的通用函数
function saveData(filename, data) {
  const filePath = path.join(dataDir, filename);
  try {
    fs.ensureFileSync(filePath);
    fs.writeJsonSync(filePath, data, { spaces: 2 });
    return true;
  } catch (error) {
    console.error(`保存数据文件 ${filename} 失败:`, error);
    return false;
  }
}

// 管理首页内容
router.get('/manage/home', requireLogin, (req, res) => {
  const data = getData('homepage.json');
  res.render('manage/home', { data });
});

router.post('/manage/home', requireLogin, (req, res) => {
  const data = req.body;
  // 处理features数组
  if (typeof data.features === 'string') {
    data.features = [data.features];
  }
  if (saveData('homepage.json', data)) {
    res.redirect('/manage/home?success=1');
  } else {
    res.redirect('/manage/home?error=1');
  }
});

// 管理关于我们内容
router.get('/manage/about', requireLogin, (req, res) => {
  const data = getData('about.json');
  res.render('manage/about', { data });
});

router.post('/manage/about', requireLogin, (req, res) => {
  const data = req.body;
  // 处理复杂数据结构
  if (saveData('about.json', data)) {
    res.redirect('/manage/about?success=1');
  } else {
    res.redirect('/manage/about?error=1');
  }
});

// 管理服务内容
router.get('/manage/services', requireLogin, (req, res) => {
  const data = getData('services.json');
  res.render('manage/services', { data });
});

router.post('/manage/services', requireLogin, (req, res) => {
  // 处理服务数据
  const services = [];
  const count = Object.keys(req.body).filter(key => key.startsWith('title_')).length;
  
  for (let i = 0; i < count; i++) {
    const title = req.body[`title_${i}`];
    if (!title) continue;
    
    services.push({
      title,
      icon: req.body[`icon_${i}`],
      description: req.body[`description_${i}`],
      items: req.body[`items_${i}`] ? req.body[`items_${i}`].split('\n').filter(item => item.trim()) : []
    });
  }
  
  if (saveData('services.json', services)) {
    res.redirect('/manage/services?success=1');
  } else {
    res.redirect('/manage/services?error=1');
  }
});

// 管理解决方案内容
router.get('/manage/solutions', requireLogin, (req, res) => {
  const data = getData('solutions.json');
  res.render('manage/solutions', { data });
});

router.post('/manage/solutions', requireLogin, (req, res) => {
  // 处理解决方案数据
  const solutions = [];
  const count = Object.keys(req.body).filter(key => key.startsWith('title_')).length;
  
  for (let i = 0; i < count; i++) {
    const title = req.body[`title_${i}`];
    if (!title) continue;
    
    solutions.push({
      title,
      description: req.body[`description_${i}`],
      items: req.body[`items_${i}`] ? req.body[`items_${i}`].split('\n').filter(item => item.trim()) : []
    });
  }
  
  if (saveData('solutions.json', solutions)) {
    res.redirect('/manage/solutions?success=1');
  } else {
    res.redirect('/manage/solutions?error=1');
  }
});

// 管理联系我们内容
router.get('/manage/contact', requireLogin, (req, res) => {
  const data = getData('contact.json');
  res.render('manage/contact', { data });
});

router.post('/manage/contact', requireLogin, (req, res) => {
  const data = req.body;
  if (saveData('contact.json', data)) {
    res.redirect('/manage/contact?success=1');
  } else {
    res.redirect('/manage/contact?error=1');
  }
});

// 导出数据
router.get('/export', requireLogin, (req, res) => {
  const allData = {};
  const files = ['homepage.json', 'about.json', 'services.json', 'solutions.json', 'contact.json'];
  
  files.forEach(file => {
    const key = file.replace('.json', '');
    allData[key] = getData(file);
  });
  
  res.json(allData);
});

module.exports = router;
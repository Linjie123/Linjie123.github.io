document.addEventListener('DOMContentLoaded', function() {
    // 默认显示首页
    showSection('home');
    updateActiveLink(document.querySelector('.navbar a[data-target="home"]'));

    // 为所有导航链接添加点击事件
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSection(target);
            updateActiveLink(this);
            // 在移动设备上，点击导航链接后关闭侧边栏
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
});

// 汉堡菜单切换函数
function toggleSidebar() {
    const nav = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    
    // 切换导航栏显示/隐藏
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'flex';
        // 汉堡菜单动画效果
        hamburger.classList.add('active');
    } else {
        nav.style.display = 'none';
        hamburger.classList.remove('active');
    }
}

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 更新活动链接样式
function updateActiveLink(clickedLink) {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}
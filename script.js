document.addEventListener('DOMContentLoaded', function() {
    // 默认显示首页
    showSection('home');

    // 为所有导航链接添加点击事件
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSection(target);
            updateActiveLink(this);
        });
    });
});

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
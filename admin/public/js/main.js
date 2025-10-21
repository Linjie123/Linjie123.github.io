// 页面加载完成后执行
Document.prototype.ready = function(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

// 表单验证函数
function validateForm(formElement) {
  let isValid = true;
  const requiredFields = formElement.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      // 添加错误提示
      if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = '此字段为必填项';
        field.parentNode.insertBefore(errorMsg, field.nextSibling);
      }
    } else {
      field.classList.remove('error');
      // 移除错误提示
      if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
        field.nextElementSibling.remove();
      }
    }
  });
  
  return isValid;
}

// 数字格式化函数
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 简单的AJAX请求函数
function ajaxRequest(url, method, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  
  if (method === 'POST' || method === 'PUT') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(xhr.statusText), null);
    }
  };
  
  xhr.onerror = function() {
    callback(new Error('网络错误'), null);
  };
  
  xhr.send(data);
}

// 显示通知消息
function showNotification(message, type = 'info', duration = 3000) {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // 添加到文档
  document.body.appendChild(notification);
  
  // 添加显示动画
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // 设置自动关闭
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, duration);
}

// 确认对话框
function confirmDialog(message, confirmCallback, cancelCallback) {
  // 创建对话框容器
  const dialog = document.createElement('div');
  dialog.className = 'confirm-dialog';
  
  // 创建对话框内容
  const dialogContent = document.createElement('div');
  dialogContent.className = 'confirm-dialog-content';
  
  // 创建消息和按钮
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'confirm-dialog-buttons';
  
  const confirmButton = document.createElement('button');
  confirmButton.className = 'btn btn-confirm';
  confirmButton.textContent = '确认';
  
  const cancelButton = document.createElement('button');
  cancelButton.className = 'btn btn-cancel';
  cancelButton.textContent = '取消';
  
  // 组装对话框
  buttonContainer.appendChild(confirmButton);
  buttonContainer.appendChild(cancelButton);
  
  dialogContent.appendChild(messageElement);
  dialogContent.appendChild(buttonContainer);
  
  dialog.appendChild(dialogContent);
  
  // 添加到文档
  document.body.appendChild(dialog);
  
  // 显示对话框
  setTimeout(() => {
    dialog.classList.add('show');
  }, 10);
  
  // 确认按钮事件
  confirmButton.addEventListener('click', () => {
    dialog.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(dialog);
      if (typeof confirmCallback === 'function') {
        confirmCallback();
      }
    }, 300);
  });
  
  // 取消按钮事件
  cancelButton.addEventListener('click', () => {
    dialog.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(dialog);
      if (typeof cancelCallback === 'function') {
        cancelCallback();
      }
    }, 300);
  });
}

// 实现文本编辑器功能（简单版）
function initTextEditor(element) {
  if (!element) return;
  
  // 创建工具栏
  const toolbar = document.createElement('div');
  toolbar.className = 'text-editor-toolbar';
  
  // 添加工具按钮
  const tools = [
    { icon: 'B', command: 'bold' },
    { icon: 'I', command: 'italic' },
    { icon: 'U', command: 'underline' },
    { icon: 'ul', command: 'insertUnorderedList' },
    { icon: 'ol', command: 'insertOrderedList' },
    { icon: 'link', command: 'createLink' }
  ];
  
  tools.forEach(tool => {
    const button = document.createElement('button');
    button.className = 'text-editor-button';
    button.textContent = tool.icon;
    button.title = tool.command;
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      document.execCommand(tool.command, false, null);
      element.focus();
    });
    
    toolbar.appendChild(button);
  });
  
  // 将工具栏插入到文本框前面
  element.parentNode.insertBefore(toolbar, element);
  
  // 设置文本框为可编辑
  element.contentEditable = true;
}

// 简单的拖拽排序功能
function initDragSort(container, handleSelector) {
  const sortableList = container;
  const items = Array.from(sortableList.children);
  let draggedItem = null;
  
  items.forEach(item => {
    const handle = item.querySelector(handleSelector) || item;
    handle.draggable = true;
    
    // 拖动开始事件
    handle.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.opacity = '0.5';
      }, 0);
    });
    
    // 拖动结束事件
    handle.addEventListener('dragend', () => {
      draggedItem = null;
      item.style.opacity = '1';
      items.forEach(i => i.classList.remove('drag-over'));
    });
    
    // 拖动经过事件
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      item.classList.add('drag-over');
    });
    
    // 拖动离开事件
    item.addEventListener('dragleave', () => {
      item.classList.remove('drag-over');
    });
    
    // 放置事件
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.classList.remove('drag-over');
      
      if (draggedItem !== item) {
        const draggedIndex = items.indexOf(draggedItem);
        const dropIndex = items.indexOf(item);
        
        if (draggedIndex < dropIndex) {
          sortableList.insertBefore(draggedItem, item.nextElementSibling);
        } else {
          sortableList.insertBefore(draggedItem, item);
        }
        
        // 触发自定义排序事件
        const sortEvent = new CustomEvent('sortupdate', {
          detail: {
            oldIndex: draggedIndex,
            newIndex: dropIndex
          }
        });
        sortableList.dispatchEvent(sortEvent);
      }
    });
  });
}

// 加载状态管理
function LoadingManager() {
  let loadingCount = 0;
  
  function show() {
    loadingCount++;
    if (loadingCount === 1) {
      const loadingOverlay = document.createElement('div');
      loadingOverlay.id = 'loading-overlay';
      loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
      document.body.appendChild(loadingOverlay);
    }
  }
  
  function hide() {
    loadingCount--;
    if (loadingCount <= 0) {
      loadingCount = 0;
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        document.body.removeChild(loadingOverlay);
      }
    }
  }
  
  return {
    show,
    hide
  };
}

// 创建全局加载管理器实例
const loadingManager = LoadingManager();

// 导出工具函数到全局
window.validateForm = validateForm;
window.formatNumber = formatNumber;
window.ajaxRequest = ajaxRequest;
window.showNotification = showNotification;
window.confirmDialog = confirmDialog;
window.initTextEditor = initTextEditor;
window.initDragSort = initDragSort;
window.loadingManager = loadingManager;
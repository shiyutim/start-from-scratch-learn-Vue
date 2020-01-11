{
  /* <div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">

  </div> */
}

module.exports = {
  title: 'start-from-scratch-learn-Vue',
  description: 'Just playing around',
  displayAllHeaders: true, // true为显示所有页面的标题链接
  collapsable: false, // false 为导航栏展开
  bases: '/start-from-scratch-learn-Vue/',
  themeConfig: {
    sidebar: [{
        title: '从零开始学习 Vue', // 必要的
        // path: '/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ['/']
      },
      {
        title: '介绍', // 必要的
        // path: '/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ['test.md']
      },
      {
        title: '指令',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/instruct/conditional.md', '/instruct/list.md']
      },
      {
        title: 'Class与Style',
        collapsable: false,
        sidebarDepth: 2,
        children: ['class']
      },
      {
        title: '事件v-on v-bind',
        collapsable: false,
        sidebarDepth: 2,
        children: ['events']
      },
      {
        title: '生命周期lifecycle',
        collapsable: false,
        sidebarDepth: 2,
        children: ['lifecycle']
      },

      {
        title: '计算属性computed',
        collapsable: false,
        sidebarDepth: 2,
        children: ['computed']
      },
      {
        title: '侦听器watch',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/watch/watch.md']
      },

      {
        title: '组件components',
        collapsable: false,
        sidebarDepth: 2,
        children: ['components']
      }
    ]
  }
}
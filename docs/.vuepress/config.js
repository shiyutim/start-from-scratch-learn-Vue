{
  /* <div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">

  </div> */
}

module.exports = {
  title: 'start-from-scratch-learn-Vue',
  description: 'Just playing around',
  displayAllHeaders: true, // true为显示所有页面的标题链接
  collapsable: false, // false 为导航栏展开
  base: '/start-from-scratch-learn-Vue/',
  themeConfig: {
    sidebar: [{
        title: '从零开始学习 Vue', // 必要的
        // path: '/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ['/', '/installation/installation.md']
      },
      {
        title: '介绍', // 必要的
        // path: '/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ['introduce/introduce.md']
      },
      {
        title: '指令',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/instruct/conditional.md', '/instruct/list.md']
      },
      {
        title: '事件',
        collapsable: false,
        sidebarDepth: 2,
        children: ['events/v-on.md', 'events/v-bind.md', 'events/v-model.md', 'events/others.md']
      },
      {
        title: 'Class与Style',
        collapsable: false,
        sidebarDepth: 2,
        children: ['class/class.md']
      },
      {
        title: '生命周期',
        collapsable: false,
        sidebarDepth: 2,
        children: ['lifecycle/lifecycle.md']
      },
      {
        title: '计算属性',
        collapsable: false,
        sidebarDepth: 2,
        children: ['computed/computed.md']
      },
      {
        title: '侦听器',
        collapsable: false,
        sidebarDepth: 2,
        children: ['/watch/watch.md']
      },

      {
        title: '组件',
        collapsable: false,
        sidebarDepth: 2,
        children: ['components/components.md', 'components/props.md', 'components/emit.md']
      },
      {
        title: 'axios',
        collapsable: false,
        sidebarDepth: 2,
        children: ['axios/axios.md']
      }
    ],
    repo: 'shiyutim/start-from-scratch-learn-Vue',
    lastUpdated: '上次更新'
  }
}
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
        title: '前言', // 必要的
        // path: '/', // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ['/']
      },
      {
        title: '简介',
        collapsable: false,
        sidebarDepth: 1,
        children: ['introduction/installation.md', 'introduction/introduce.md']
      },
      {
        title: '入门篇',
        collapsable: false,
        sidebarDepth: 2,
        children: ['basics/instruct.md', 'basics/class-and-style.md', 'basics/lifecycle.md', 'basics/computed.md', 'basics/watch.md']
      },
      {
        title: '进阶篇',
        collapsable: false,
        sidebarDepth: 2,
        children: ['advanced/components.md', 'advanced/filters.md', 'advanced/axios.md']
      },
    ],
    repo: 'shiyutim/start-from-scratch-learn-Vue',
    lastUpdated: '上次更新'
  }
}
const superRouter = [
  {
    path: '/channelPriceComparison',
    name: '/channelPriceComparison',
    component: 'Layout',
    redirect: '/channelPriceComparison/exportExcel',
    meta: { title: '物流部', icon: 'prototype' },
    children: [
      {
        name: 'exportExcel',
        path: 'exportExcel',
        component: 'channelPriceComparison/exportExcel',
        meta: { title: '导入渠道价格对比表', icon: 'prototype' },
        children: []
      },
      {
        name: 'exportExcelHistory',
        path: 'exportExcelHistory',
        component: 'channelPriceComparison/exportExcelHistory',
        meta: { title: '渠道价格对比表历史记录', icon: 'prototype' },
        children: []
      },
      {
        name: 'searchExcel',
        path: 'searchExcel',
        component: 'channelPriceComparison/searchExcel',
        meta: { title: '查看渠道价格对比表', icon: 'prototype' },
        children: []
      },
    ]
  },
  {
    path: '/mock',
    name: '/mock',
    component: 'Layout',
    redirect: '/mock/yApi',
    meta: { title: '物流部', icon: 'prototype' },
    children: [
      {
        name: 'yApi',
        path: 'yApi',
        component: 'mock/yApi',
        meta: { title: 'yApi', icon: 'prototype' },
        children: []
      }
    ]
  },
]
export default superRouter

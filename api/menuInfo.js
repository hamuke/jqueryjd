// mock模拟数据,模拟接口为"/menu"
Mock.mock("/menu", {
    'data|18': [{
        'titles|2-4': [{
            name: '@cword(2,4)',
            href: '@url(http)'
        }],
        content: {
            'tabs|2-5': [{
                name: '@cword(2,4)',
                href: '@url(http)'
            }],
            'details|8-15': [{
                'category': [{
                    name: '@cword(2,4)',
                    href: '@url(http)',
                }],
                'items|8-16': [{
                    name: '@cword(2,4)',
                    href: '@url(http)'
                }]
            }]
        }
    }]
})

// {
//     data: [{
//         titles: [{
//             name: '家用电器',
//             href: '#'
//         }],
//         content: [{
//             tabs: [{
//                 name: '家电馆',
//                 href: '#'
//             }],
//             details: [{
//                 category: [{
//                     name: '电视',
//                     href: '#'
//                 }],
//                 items: [{
//                     name: '家用电视',
//                     href: '#'
//                 }]
//             }]
//         }]
//     }]
// }
// module.exports = {
//     plugins: {
//         'postcss-pxtorem': {
//             rootValue: 75,   //根元素字节大小 750 是75 除以10
//             propList: ['*'],  //可以从px改成rem
//             exclude: /node_modules/i,  //排除这个目录不做改变
//             selectorBlackList:['vant-','.my-'], //黑名单不会对vant-组件进行修改 .my开头的类选择器
//         },
//     },
// };
// // module.exports = {
// //     plugins: {
// //         'postcss-pxtorem': {
// //             rootValue: 37.5,
// //             propList: ['*'],
// //         },
// //     },
// // };
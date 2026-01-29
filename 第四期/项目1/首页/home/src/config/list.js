// import img from '@/image/img/2.png'
let img="https://yj.00000.work/img/c143.5709175a.png";
// let time=import.meta.glob('@/src/img/*',{eager:true})
// console.log("路径",time)

// main.js
// let time = import.meta.glob('@/image/img/*', { eager: true }); //批量导入
// console.log("路径", time);
//
// // 遍历导入的文件
// for (const path in time) {
//     const module = time[path];
//     console.log(`文件路径: ${path}`);
//     console.log(`文件: ${module.default}`);
// }

let list=[
    {
        icon:img,title:"AI工具",data:[
            // {name:"ChatGPT",img:new URL("@/image/img/3.png",import.meta.url),url:"https://chat.openai.com",introduce:"OpenAI开发的大型语言模型，可用于对话、写作、编程等多种场景OpenAI开发的大型语言模型，可用于对话、写作、编程等多种场景OpenAI开发的大型语言模型，可用于对话、写作、编程等多种场景OpenAI开发的大型语言模型，可用于对话、写作、编程等多种场景111",showDetails:false},
            {name:"Midjourney",img:img,url:"https://www.midjourney.com",introduce:"强大的AI绘画工具，通过文字描述生成高质量图像",showDetails:false},
            {name:"Stable Diffusion",img:img,url:"https://stability.ai",introduce:"开源的AI图像生成模型，支持多种图像生成和编辑功能",showDetails:false},
            {name:"Claude",img:img,url:"https://claude.ai",introduce:"Anthropic开发的AI助手，擅长写作和分析",showDetails:false},
            {name:"DALL·E",img:img,url:"https://openai.com/dall-e-2",introduce:"OpenAI的AI图像生成工具，可创建逼真的图像和艺术作品",showDetails:false},
            {name:"GitHub Copilot",img:img,url:"https://github.com/features/copilot",introduce:"AI编程助手，提供实时代码建议和自动完成",showDetails:false},
            {name:"Notion AI",img:img,url:"https://www.notion.so",introduce:"集成在Notion中的AI助手，帮助写作和内容创作",showDetails:false},
            {name:"Copy.ai",img:img,url:"https://www.copy.ai",introduce:"AI文案写作工具，适合营销和内容创作",showDetails:false},
            {name:"Jasper",img:img,url:"https://www.jasper.ai",introduce:"AI内容创作平台，支持多种写作场景",showDetails:false},
            {name:"Runway",img:img,url:"https://runway.ml",introduce:"AI视频创作工具，支持视频编辑和特效生成",showDetails:false},
        ]
    },
    {
        icon:img,title:"开发工具",data:[
            {name:"Visual Studio Code",img:img,url:"https://code.visualstudio.com",introduce:"强大的代码编辑器，支持多种编程语言和丰富的插件",showDetails:false},
            {name:"Git",img:img,url:"https://git-scm.com",introduce:"分布式版本控制系统，用于代码管理和协作",showDetails:false},
            {name:"Docker",img:img,url:"https://www.docker.com",introduce:"容器化平台，用于应用程序的打包和部署",showDetails:false},
            {name:"Postman",img:img,url:"https://www.postman.com",introduce:"API开发和测试工具，支持接口调试和文档管理",showDetails:false},
            {name:"WebStorm",img:img,url:"https://www.jetbrains.com/webstorm",introduce:"专业的JavaScript IDE，提供强大的开发功能",showDetails:false},
            {name:"Figma",img:img,url:"https://www.figma.com",introduce:"协作式界面设计工具，用于UI/UX设计",showDetails:false},
            {name:"MongoDB",img:img,url:"https://www.mongodb.com",introduce:"流行的NoSQL数据库，适合处理大量非结构化数据",showDetails:false},
            {name:"Redis",img:img,url:"https://redis.io",introduce:"高性能的键值存储数据库，常用于缓存",showDetails:false},
            {name:"Nginx",img:img,url:"https://nginx.org",introduce:"高性能的Web服务器和反向代理服务器",showDetails:false},
            {name:"Jenkins",img:img,url:"https://www.jenkins.io",introduce:"持续集成和持续部署工具，用于自动化构建和部署",showDetails:false},
        ]
    },
    {
        icon:img,title:"学习资源",data:[
            {name:"MDN Web Docs",img:img,url:"https://developer.mozilla.org",introduce:"Mozilla的Web技术文档，最权威的前端学习资源",showDetails:false},
            {name:"GitHub",img:img,url:"https://github.com",introduce:"全球最大的代码托管平台，也是学习开源项目的好地方",showDetails:false},
            {name:"Stack Overflow",img:img,url:"https://stackoverflow.com",introduce:"程序员问答社区，解决编程问题的好帮手",showDetails:false},
            {name:"掘金",img:img,url:"https://juejin.cn",introduce:"高质量的技术社区，分享技术文章和教程",showDetails:false},
            {name:"Udemy",img:img,url:"https://www.udemy.com",introduce:"在线学习平台，提供丰富的编程课程",showDetails:false},
            {name:"Coursera",img:img,url:"https://www.coursera.org",introduce:"提供来自顶尖大学的在线课程",showDetails:false},
            {name:"LeetCode",img:img,url:"https://leetcode.com",introduce:"算法学习平台，提供编程题目和题解",showDetails:false},
            {name:"Codecademy",img:img,url:"https://www.codecademy.com",introduce:"互动式编程学习平台，适合初学者",showDetails:false},
            {name:"freeCodeCamp",img:img,url:"https://www.freecodecamp.org",introduce:"免费的编程学习平台，提供完整的课程体系",showDetails:false},
        ]
    },
    {
        icon:img,title:"效率工具",data:[
            {name:"Notion",img:img,url:"https://www.notion.so",introduce:"全能笔记和知识管理工具，支持多种内容格式",showDetails:false},
            {name:"Trello",img:img,url:"https://trello.com",introduce:"项目管理工具，使用看板方式组织任务",showDetails:false},
            {name:"Slack",img:img,url:"https://slack.com",introduce:"团队协作通讯工具，支持多种集成",showDetails:false},
            {name:"Zoom",img:img,url:"https://zoom.us",introduce:"视频会议工具，支持远程办公和在线教学",showDetails:false},
            {name:"1Password",img:img,url:"https://1password.com",introduce:"密码管理工具，安全存储各类账号信息",showDetails:false},
            {name:"Grammarly",img:img,url:"https://www.grammarly.com",introduce:"写作辅助工具，检查语法和拼写错误",showDetails:false},
            {name:"Forest",img:img,url:"https://www.forestapp.cc",introduce:"专注时间管理应用，帮助提高工作效率",showDetails:false},
            {name:"Todoist",img:img,url:"https://todoist.com",introduce:"任务管理工具，帮助组织待办事项",showDetails:false},
            {name:"Evernote",img:img,url:"https://evernote.com",introduce:"笔记应用，支持多平台同步",showDetails:false},
        ]
    }
]


export default list;
if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let s={};const l=e=>a(e,d),b={module:{uri:d},exports:s,require:l};i[d]=Promise.all(c.map((e=>b[e]||l(e)))).then((e=>(r(...e),s)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/hello-world/index.html",revision:"d1809eda065f200438bbc2f679ee3c42"},{url:"2022/08/19/myFirstBlog/index.html",revision:"a5c4f062438f7e90dcb66cc476234975"},{url:"2022/08/19/Xnect/姿态检测公式/index.html",revision:"7eb8b838f904ebb5d18cdd54fa842b27"},{url:"2022/10/20/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2022/10/20/robotic-operating-system/index.html",revision:"bf5ab68dac646d0c2a2ab957f56561de"},{url:"2022/10/26/c-知识汇总/index.html",revision:"a523b6a16fb7e424412bc4a791ce4b48"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/27/test/index.html",revision:"e563eb75a4714c6d5b78fbf18a9d20eb"},{url:"archives/2022/08/index.html",revision:"655655e39b1e10f68f330bb9bbc99c4b"},{url:"archives/2022/10/index.html",revision:"73539b4db5b4ef3323d4385d6817f90c"},{url:"archives/2022/index.html",revision:"b717c16e0e2c3de503c1855d2d864d89"},{url:"archives/index.html",revision:"6d2b33888b6519ac056865c3fdc4f36b"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"d9596859353b21f2d40ad67bffb5dd91"},{url:"categories/书籍/index.html",revision:"f2d2a7ca2c3d3bb3013cc0418fda62cd"},{url:"categories/书籍/机器人/index.html",revision:"6136fee2dac7bc133a13552e232cecdb"},{url:"categories/文献/index.html",revision:"64dc88fa7d2faa4447bf9da31892c6e0"},{url:"categories/文献/人体姿态/index.html",revision:"caaea8b0937f4932dbcf8de299d3739f"},{url:"categories/编程语言/c/index.html",revision:"56636d0b72d5dab68f9875135327fc55"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"1bf96f5c9b0c839bac51b9a87edd4401"},{url:"categories/编程语言/index.html",revision:"e3dcb954da85bd719bfb1a8bee034f39"},{url:"css/index.css",revision:"b37629cabe4813adae9156d68f8c380e"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"53d7803cc5012846ab508e3b1d6dbe20"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"tags/c/index.html",revision:"6e4bbdaf97f94aae6e5fd386cb242a17"},{url:"tags/index.html",revision:"b2a37c1607e43cf499f93a04ede30c90"},{url:"tags/博客/index.html",revision:"ff87966b1aa53ed15069653dfeee9915"},{url:"tags/机器人/index.html",revision:"ccc24560f87200674d1aeaa0671fbe20"},{url:"tags/机器学习/index.html",revision:"0b544b68f90a499b348665e21e2a671c"},{url:"tags/神经网络/index.html",revision:"1980417cd6a28048bddcc30299501217"},{url:"tags/系统/index.html",revision:"8ce71b872dbb0ac936b3d87900c18bae"}],{})}));
//# sourceMappingURL=service-worker.js.map

if(!self.define){let e,i={};const a=(a,d)=>(a=new URL(a+".js",d).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(d,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let s={};const l=e=>a(e,c),n={module:{uri:c},exports:s,require:l};i[c]=Promise.all(d.map((e=>n[e]||l(e)))).then((e=>(r(...e),s)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/hello-world/index.html",revision:"9d61f603ebd833faecd036e622627c9d"},{url:"2022/08/19/myFirstBlog/index.html",revision:"5ed4cd3cd200c67bfea0391a08502441"},{url:"2022/08/19/Xnect/姿态检测公式/index.html",revision:"9d99d5fdb78fcfc9463b1b06c40aa72f"},{url:"2022/10/20/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2022/10/20/robotic-operating-system/index.html",revision:"600a7525a54f762d5fc123b9de73e246"},{url:"2022/10/26/c-知识汇总/index.html",revision:"539cf5d37e691168ebdb6a4d3aab4a66"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/27/test/index.html",revision:"65251f80ece3d9e300aedf4fc8071238"},{url:"archives/2022/08/index.html",revision:"38b41d6bf7e9cdee1d3a573ffe918e2b"},{url:"archives/2022/10/index.html",revision:"61164788da0d5f0db479b64a151c1895"},{url:"archives/2022/index.html",revision:"42023faf25d74d5c4d4be5f9886b28e0"},{url:"archives/index.html",revision:"b814edd08449f474ace93dfdd944a80d"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"82e43f53ec37d428c2e92d147bb268e1"},{url:"categories/书籍/index.html",revision:"e7c877950725bd546f42229f4c09211a"},{url:"categories/书籍/机器人/index.html",revision:"632a3cd1fabc83fc80777c16c7637bd5"},{url:"categories/文献/index.html",revision:"efb648f5a533bb7a1cc2d89e720be490"},{url:"categories/文献/人体姿态/index.html",revision:"95f92efc3bc86e40b9ea5d9c992532bd"},{url:"categories/编程语言/c/index.html",revision:"4a49026c6b773913500782ad891101ef"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"64887e5f36ef2654f9477c877044ff33"},{url:"categories/编程语言/index.html",revision:"f3b3733a3d98dfc3a844b9be3bfc9c0a"},{url:"css/index.css",revision:"b37629cabe4813adae9156d68f8c380e"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"4fe943dafe03f9382054b1efd6254438"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"tags/c/index.html",revision:"a47ea00eb6b7a6214db09db6ca6c7811"},{url:"tags/index.html",revision:"235e9cdbcf379d2fd1adbacd4b0dff26"},{url:"tags/博客/index.html",revision:"7e267df4b1be2d0170d15cab6d2f1a8d"},{url:"tags/机器人/index.html",revision:"dfabaa3b9085c32538280a6341a75880"},{url:"tags/机器学习/index.html",revision:"bea983175fae12664f7b53c1459db1e0"},{url:"tags/神经网络/index.html",revision:"5a18618ba971213bc45d38a0d857731b"},{url:"tags/系统/index.html",revision:"2dc55a377e7e1227d48dc840685f70c6"}],{})}));
//# sourceMappingURL=service-worker.js.map

if(!self.define){let e,i={};const c=(c,a)=>(c=new URL(c+".js",a).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const l=e=>c(e,s),n={module:{uri:s},exports:d,require:l};i[s]=Promise.all(a.map((e=>n[e]||l(e)))).then((e=>(r(...e),d)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/hello-world/index.html",revision:"5cdab4452d5d8609b96fd38daab6c8f1"},{url:"2022/08/19/myFirstBlog/index.html",revision:"fd5587ac388f0baccc6fffd3565796af"},{url:"2022/08/19/Xnect/姿态检测公式/index.html",revision:"9505364a0384c795b7053782bbf0bd4f"},{url:"2022/10/20/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2022/10/20/robotic-operating-system/index.html",revision:"a97cbb06c22c9f24f346d6286c82fa85"},{url:"2022/10/26/c-知识汇总/index.html",revision:"3911ab4072288305210b9579b6aea8d6"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/27/test/index.html",revision:"cd071b4bef5c087b0b22f6cd64388945"},{url:"archives/2022/08/index.html",revision:"48711119a703873136ec2c0ffa7b2d81"},{url:"archives/2022/10/index.html",revision:"d0c8fba4627f6b986f7482c5c21c9635"},{url:"archives/2022/index.html",revision:"73f4936a7a486ba98cdc4496f1a30007"},{url:"archives/index.html",revision:"bf960442ca669c5b33001373b9ad3939"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"cda68f7bb878e682ca364728f3a39c78"},{url:"categories/书籍/index.html",revision:"85f8541f397f6b05f3c03818f27fcbb4"},{url:"categories/书籍/机器人/index.html",revision:"c7a895c6f6782a8eefb0e1b9b69c34e0"},{url:"categories/文献/index.html",revision:"e17707a01f1c869306d13ceadc9b3c46"},{url:"categories/文献/人体姿态/index.html",revision:"f93e699f15bc843a594acdd449bb9d22"},{url:"categories/编程语言/c/index.html",revision:"802c44052f1e505db5fc506932fc9e2d"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"7aa086b881cefde21ef495476cebe3d4"},{url:"categories/编程语言/index.html",revision:"b3cda0f277a0cbe36b21c06e29b93ee6"},{url:"css/index.css",revision:"b37629cabe4813adae9156d68f8c380e"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"3d3e7500dce0c3d5f2399704ad0cba5f"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"tags/c/index.html",revision:"180b41163ca809a066d357f4f34b5f4b"},{url:"tags/index.html",revision:"42b0860890e2e2b5f992b716c15a4325"},{url:"tags/博客/index.html",revision:"2269136811d8d29d0869c98518695185"},{url:"tags/机器人/index.html",revision:"164394281c8e88497af4f5db300a3fd6"},{url:"tags/机器学习/index.html",revision:"a68995a616631010803998dc27c93960"},{url:"tags/神经网络/index.html",revision:"640540a11ee44dfbbc59cd041f4bddbb"},{url:"tags/系统/index.html",revision:"33d1ed3d48c669b3db47650d9f5287e0"}],{})}));
//# sourceMappingURL=service-worker.js.map

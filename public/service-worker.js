if(!self.define){let e,i={};const c=(c,r)=>(c=new URL(c+".js",r).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(r,a)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const l=e=>c(e,s),n={module:{uri:s},exports:d,require:l};i[s]=Promise.all(r.map((e=>n[e]||l(e)))).then((e=>(a(...e),d)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/hello-world/index.html",revision:"3234b19cda829b77f1023996ce1e0e68"},{url:"2022/08/19/myFirstBlog/index.html",revision:"e57e98c1ce231e31f4466d6f486d75a9"},{url:"2022/08/19/Xnect/姿态检测公式/index.html",revision:"fce333fba3f36279956433ea2f510a39"},{url:"2022/10/20/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2022/10/20/robotic-operating-system/index.html",revision:"4425c117a88cb2e8174c5cc6edfc0b45"},{url:"2022/10/26/c-知识汇总/index.html",revision:"8e61b9c6316df0f23f3662a14f4e2527"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/27/test/index.html",revision:"a705975e12993c366a3bf85b7511b907"},{url:"archives/2022/08/index.html",revision:"24348931807c0490e96cfd25e9368a54"},{url:"archives/2022/10/index.html",revision:"1eb5f3c5d1e2cc3516e93c27af52f03f"},{url:"archives/2022/index.html",revision:"c803764fc91b39065b826e135906b761"},{url:"archives/index.html",revision:"a67bd933ace04050d73f561f2584d88e"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"f1cf7b1665a9d54bb0c976b58c6fd70a"},{url:"categories/书籍/index.html",revision:"12bdb881c3acf9e9193d4ced65473253"},{url:"categories/书籍/机器人/index.html",revision:"8d0a394a19aa414263294944e0a49f3e"},{url:"categories/文献/index.html",revision:"b1270b52e0103931cd54632d16a1f750"},{url:"categories/文献/人体姿态/index.html",revision:"13e1297866bf69c4fcb3bf5f8e08530b"},{url:"categories/编程语言/c/index.html",revision:"4e0106178e963b0c35cfd73f4c46d53b"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"7cd4d64ad1c8f666ec9641621bc0e6e2"},{url:"categories/编程语言/index.html",revision:"4d84d50baee9a11deb5eb8f85af4d1c8"},{url:"css/index.css",revision:"b37629cabe4813adae9156d68f8c380e"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"92b85f6b4a76d1124fc3014331cd13ef"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"tags/c/index.html",revision:"2310feaa6bd0e5a264942db6bcd94d9c"},{url:"tags/index.html",revision:"624890ab2a874bbce94f6ee1e4014059"},{url:"tags/博客/index.html",revision:"3b201cc27406d34f862854ac84a24935"},{url:"tags/机器人/index.html",revision:"4e6b543874805c1ddf834f56ba09f32e"},{url:"tags/机器学习/index.html",revision:"bd8d6d28f0bf6e5f0d2fcd0ba2e3b46d"},{url:"tags/神经网络/index.html",revision:"7829377d8e90bf79ecf0e107603b3089"},{url:"tags/系统/index.html",revision:"4f117ad9606673b516f1b511e5ee399e"}],{})}));
//# sourceMappingURL=service-worker.js.map
if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let s={};const n=e=>a(e,d),l={module:{uri:d},exports:s,require:n};i[d]=Promise.all(c.map((e=>l[e]||n(e)))).then((e=>(r(...e),s)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/hello-world/index.html",revision:"3cdb794b98f4571da453e815fafd36b5"},{url:"2022/08/19/myFirstBlog/index.html",revision:"8bb0b4fa585a5faf98c574023405ec1b"},{url:"2022/08/19/Xnect/姿态检测公式/index.html",revision:"ef3774ce1700fcd78e010afa93ed0221"},{url:"2022/10/20/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2022/10/20/robotic-operating-system/index.html",revision:"d3c5fdcf3f01a977faac5c9a2e176127"},{url:"2022/10/26/c-知识汇总/index.html",revision:"ec33308b53922d5c2ba0c65a73ea1be6"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/26/c-知识汇总/基类派生类.png",revision:"312a14be17fca68c34f3bd8711e65635"},{url:"2022/10/27/test/index.html",revision:"a9028fe65f0421bc817899be6496c025"},{url:"2022/11/04/slam/image-20221107155224157.png",revision:"27d3b9c613dc52b28bfc5df5be9b765b"},{url:"2022/11/04/slam/image-20221107161443842.png",revision:"2765f10b9c0841546881c0315853af36"},{url:"2022/11/04/slam/image-20221107162453662.png",revision:"bd1b3bc09f9d2fe0580cf1f9dcde4911"},{url:"2022/11/04/slam/image-20221107162722048.png",revision:"e622302a53f16b81956834556f70d8aa"},{url:"2022/11/04/slam/image-20221107163948504.png",revision:"19a02f010bd1ec865d6548bb4b983197"},{url:"2022/11/04/slam/image-20221107164511662.png",revision:"1c67bf61440d09b9ef74c4ce5639aa7b"},{url:"2022/11/04/slam/image-20221107165342106.png",revision:"65210570e5da7c424ed5c69e58a2d0a0"},{url:"2022/11/04/slam/image-20221108112428467.png",revision:"75784f553b3feb5fcb94ffd7020d4526"},{url:"2022/11/04/slam/image-20221108141628283.png",revision:"d602b72b4bfdb79ee127ca4a7f70edf1"},{url:"2022/11/04/slam/index.html",revision:"6047a33bae38b3eae8744aa4e8c569bf"},{url:"2022/11/04/数学知识/index.html",revision:"854f5698691d51cbda468ab5a541db09"},{url:"2022/11/11/g2o/20210103152500545.png",revision:"a198030c7b782de3cac869013166207c"},{url:"2022/11/11/g2o/index.html",revision:"f9ed26385d7192bcaaeb480f5eba57bb"},{url:"2022/11/15/cmake/index.html",revision:"574b0e7d50de8aec3910fafad10a5462"},{url:"2022/11/22/目标识别/image-20221125100901770.png",revision:"dc80c9094a3fabda6050b5e232b44d83"},{url:"2022/11/22/目标识别/image-20221127151329769.png",revision:"baa846f21f04851803058daad2cdc8eb"},{url:"2022/11/22/目标识别/image-20221127153059574.png",revision:"a03477ce69168406ec963aca4b52e41c"},{url:"2022/11/22/目标识别/image-20221130151059959.png",revision:"17ab4fa9c6c456a7f7b5dd0705aeb47f"},{url:"2022/11/22/目标识别/image-20221130160631440.png",revision:"1291463c4e603483c60d2598afea3e4a"},{url:"2022/11/22/目标识别/index.html",revision:"48f1f4b0ebf409cbf8d212d172d5c897"},{url:"archives/2022/08/index.html",revision:"2fd8702f870394fac97574dc099017ea"},{url:"archives/2022/10/index.html",revision:"296bcad523b4bbbd1c728554c995be46"},{url:"archives/2022/11/index.html",revision:"0b21f09b098a0115bf6ef6409d9c929f"},{url:"archives/2022/index.html",revision:"d0716755f7ede5310736047b3a411343"},{url:"archives/2022/page/2/index.html",revision:"2b8d002b57c2c9f24bcab44e4297ab5d"},{url:"archives/index.html",revision:"967bee87f92a705b7cab8e287ca315b4"},{url:"archives/page/2/index.html",revision:"06b021fc6a31bc6b6e11ca5990e7e633"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"d66d1843b7f1dc4d9ca3af482fba489b"},{url:"categories/书籍/index.html",revision:"3aef3a3c415e494e43c672d3e320f2e4"},{url:"categories/书籍/机器人/index.html",revision:"09966272ff4c5a59083598ff496137a8"},{url:"categories/建图和定位/index.html",revision:"6919de96c1ae49203825839d73a34166"},{url:"categories/数学/index.html",revision:"b8e0b40be9eeed3dd4c32c68a3fc3f00"},{url:"categories/文献/index.html",revision:"e7889dd91a8c9fffe7574e16f664f337"},{url:"categories/文献/人体姿态/index.html",revision:"dbc98acbc6d419a6aa47767c4139613f"},{url:"categories/文献/目标识别/index.html",revision:"2d59d34730dc286beea2609ac130d4c5"},{url:"categories/编程语言/c/cmake/index.html",revision:"ee9fb12f8fa34566560939e503f81948"},{url:"categories/编程语言/c/index.html",revision:"f21df142b18fe6165c27158c141e002e"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"c256c68ecdd20b2136c3b19d06388031"},{url:"categories/编程语言/index.html",revision:"1b049f7385cebeb29cf7389815498448"},{url:"css/index.css",revision:"dc399145d67332541ba5241bfde88ee6"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"7b86ec4af2545574418a89f677bfe824"},{url:"js/code-unfold.js",revision:"bbc706bda61c5dbec8e3b96ac7ce1506"},{url:"js/main.js",revision:"724d6df2f8613470c46379a6969f6b55"},{url:"js/search.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"js/search/algolia.js",revision:"ae8f6030de20d5bbfa53db5b11a27947"},{url:"js/search/local-search.js",revision:"0795f8410824d1fd03435a0bbecdb110"},{url:"js/tw_cn.js",revision:"ecc4657a2a670364da9d4f841b530f53"},{url:"js/utils.js",revision:"d09e836d9bf5f6526a4a6ec86019cb14"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"page/2/index.html",revision:"acad2fc8bc435eb576940046bf422859"},{url:"tags/c/index.html",revision:"11a3092fc211dea1abf86e4d1b58ae47"},{url:"tags/cmake/index.html",revision:"c107c4877525b224f36aca260b776588"},{url:"tags/index.html",revision:"8aeb5d6767a4eac92e25c583bea9250c"},{url:"tags/slam14讲/index.html",revision:"318369bd2255dee80b98d4b0f4726905"},{url:"tags/博客/index.html",revision:"7eb6b2553a9a6cdae90231ce50d52a1a"},{url:"tags/数学/index.html",revision:"6517d9459c57ab428940868834f6419f"},{url:"tags/机器人/index.html",revision:"9d928af46de6dd6ae1719606515d53d9"},{url:"tags/机器学习/index.html",revision:"6c83911d996d7d79cf4534f1ea9a063f"},{url:"tags/目标识别/index.html",revision:"cfe18a34d5f0fde16dd7f487bda3bed1"},{url:"tags/神经网络/index.html",revision:"788a221b62af3ea911102bc7b71fe6af"},{url:"tags/系统/index.html",revision:"388664fa5f2404e464ea35049883fef6"}],{})}));
//# sourceMappingURL=service-worker.js.map

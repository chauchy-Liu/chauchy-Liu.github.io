if(!self.define){let e,i={};const a=(a,d)=>(a=new URL(a+".js",d).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(d,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let b={};const n=e=>a(e,c),f={module:{uri:c},exports:b,require:n};i[c]=Promise.all(d.map((e=>f[e]||n(e)))).then((e=>(r(...e),b)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/19/myFirstBlog/index.html",revision:"6584313922a31fadb8da49e9b2c19ef9"},{url:"2022/10/26/c-知识汇总/index.html",revision:"51ea56a213b136fb64f50d31e411cb30"},{url:"2022/10/26/c-知识汇总/内存.jpg",revision:"77da4266ecef1daa556fcc006233df2d"},{url:"2022/10/26/c-知识汇总/内存副本.jpg",revision:"10309e16be015366765cf7b464028ca7"},{url:"2022/10/27/test/index.html",revision:"3e93cc5cc4ee98ad7f3ea134241df430"},{url:"2022/11/04/slam/image-20221107155224157.png",revision:"27d3b9c613dc52b28bfc5df5be9b765b"},{url:"2022/11/04/slam/image-20221107161443842.png",revision:"2765f10b9c0841546881c0315853af36"},{url:"2022/11/04/slam/image-20221107162453662.png",revision:"bd1b3bc09f9d2fe0580cf1f9dcde4911"},{url:"2022/11/04/slam/image-20221107162722048.png",revision:"e622302a53f16b81956834556f70d8aa"},{url:"2022/11/04/slam/image-20221107163948504.png",revision:"19a02f010bd1ec865d6548bb4b983197"},{url:"2022/11/04/slam/image-20221107164511662.png",revision:"1c67bf61440d09b9ef74c4ce5639aa7b"},{url:"2022/11/04/slam/image-20221107165342106.png",revision:"65210570e5da7c424ed5c69e58a2d0a0"},{url:"2022/11/04/slam/image-20221108112428467.png",revision:"75784f553b3feb5fcb94ffd7020d4526"},{url:"2022/11/04/slam/image-20221108141628283.png",revision:"d602b72b4bfdb79ee127ca4a7f70edf1"},{url:"2022/11/04/slam/index.html",revision:"40f30dbe525114757e92a45280d386bb"},{url:"2022/11/04/数学知识/index.html",revision:"cf0c86dbd5c94de9781dec478b9385ae"},{url:"2022/11/11/g2o/20210103152500545.png",revision:"a198030c7b782de3cac869013166207c"},{url:"2022/11/11/g2o/index.html",revision:"a9acfff2e924963abc281e49433334a8"},{url:"2022/11/15/cmake/index.html",revision:"f222684d8c04d9ae446f5b54b3397e7d"},{url:"2022/11/22/目标识别/image-20221125100901770.png",revision:"dc80c9094a3fabda6050b5e232b44d83"},{url:"2022/11/22/目标识别/image-20221127151329769.png",revision:"baa846f21f04851803058daad2cdc8eb"},{url:"2022/11/22/目标识别/image-20221127153059574.png",revision:"a03477ce69168406ec963aca4b52e41c"},{url:"2022/11/22/目标识别/image-20221130151059959.png",revision:"17ab4fa9c6c456a7f7b5dd0705aeb47f"},{url:"2022/11/22/目标识别/image-20221130160631440.png",revision:"1291463c4e603483c60d2598afea3e4a"},{url:"2022/11/22/目标识别/image-20221201110746341.png",revision:"a97bf4f022887f3a30d6874c34a435e4"},{url:"2022/11/22/目标识别/image-20221202090850052.png",revision:"0a1995956f89c57e3672e1088e672d25"},{url:"2022/11/22/目标识别/image-20221203145853415.png",revision:"cda4c22b6fb27bf2d9bb6f24bc8b6950"},{url:"2022/11/22/目标识别/image-20221205112929475.png",revision:"b986e2f7078372b046b823227aa701fc"},{url:"2022/11/22/目标识别/image-20221208163700681.png",revision:"832b4951932b7ae1065b8856817cadd7"},{url:"2022/11/22/目标识别/image-20221230145100818.png",revision:"d1e016ee535a2f3ba4b96fc4285015e4"},{url:"2022/11/22/目标识别/image-20221230152549859.png",revision:"14d8191f37c8e913ad67d3ebdc597f3e"},{url:"2022/11/22/目标识别/image-20230115144414543.png",revision:"525c2448a525dfeb83d88110e434ad18"},{url:"2022/11/22/目标识别/image-20230117142246692.png",revision:"dc2faa6b6a31a5b79a7be38351c01040"},{url:"2022/11/22/目标识别/image-20230203092156825.png",revision:"4dd44fb49060b04261209467ddc8a882"},{url:"2022/11/22/目标识别/image-20230203173609255.png",revision:"fd165913fbb37c8e660b38f9fff9d931"},{url:"2022/11/22/目标识别/image-20230217085955131.png",revision:"fedda60f20028d81935b5309b4e3c110"},{url:"2022/11/22/目标识别/image-20230217090108058.png",revision:"0b7682a0827569562d618eb745660563"},{url:"2022/11/22/目标识别/image-20230530133626570.png",revision:"e027a59a2c2cb555e512e8d1d4b85840"},{url:"2022/11/22/目标识别/image-20230530133706931.png",revision:"c975d9abf28f6698329d8a5f16c1542f"},{url:"2022/11/22/目标识别/image-20230530142824450.png",revision:"c246c9265f92be5804d914afd4d300d2"},{url:"2022/11/22/目标识别/index.html",revision:"176159a7e86440fd8046c808150bc896"},{url:"2022/11/22/目标识别/v2-283dcbe67987725608102603cd30bb7a_r.jpg",revision:"01364006a4f4889c4a077e34204bd21e"},{url:"2022/11/22/目标识别/v2-313235ba995bf6f17491213f58789d34_r.jpg",revision:"552f052cd165598d99a5acc6d56e3f70"},{url:"2022/11/22/目标识别/v2-365a7a7085efa3f05ae9a2d807195f23_r-20230301135448462.jpg",revision:"2f5fd04eb735d0e32d8d359df192a9ad"},{url:"2022/11/22/目标识别/v2-365a7a7085efa3f05ae9a2d807195f23_r.jpg",revision:"2f5fd04eb735d0e32d8d359df192a9ad"},{url:"2022/11/22/目标识别/v2-8c23b57bea3517bba239c1eed9ff18ad_r.jpg",revision:"87d324066855f7231525486d0c02065d"},{url:"2022/12/13/tikz/index.html",revision:"51a5c43285230b0a1224c83c3d8eb379"},{url:"2023/06/30/hello-world/index.html",revision:"836f97b7727a656097faad3a79b6fce0"},{url:"2023/06/30/robotic-operating-system/image-20221020164052499.png",revision:"1a6d1de51935ca6d378ee77d704487ec"},{url:"2023/06/30/robotic-operating-system/index.html",revision:"984743168d47d575337d347d245aea59"},{url:"2023/06/30/Xnect/姿态检测公式/index.html",revision:"bb17a049f56d289e37cfb6e66195f04e"},{url:"2023/07/13/机器人操作系统/image-20230727085429814.png",revision:"a655f2f9a780d53ba54035c351cb53e5"},{url:"2023/07/13/机器人操作系统/index.html",revision:"f2b7fab6d80147ce7ca36a887050ab22"},{url:"archives/2022/08/index.html",revision:"5a83db3541a1ead9e2b4bf6ccd8a3cb6"},{url:"archives/2022/10/index.html",revision:"685304e0952288c0b32e3751f37f77ae"},{url:"archives/2022/11/index.html",revision:"ccddce62f6e19cc00bbbfadcaa0128dc"},{url:"archives/2022/12/index.html",revision:"30ca964126ab528cb1429d1b90f0bb1d"},{url:"archives/2022/index.html",revision:"22ad50a2dfbf255e632e63d1a9d57aa2"},{url:"archives/2023/06/index.html",revision:"c6df28dcd055e98d5a41f2c0f862e41a"},{url:"archives/2023/07/index.html",revision:"9fd75d523913d92cb19ec3c33248ec0a"},{url:"archives/2023/index.html",revision:"c1987be391ca807e46efefb01d638e40"},{url:"archives/index.html",revision:"72d12514abeaacb6d797c01c01a63606"},{url:"archives/page/2/index.html",revision:"4d7a2d8eccd2b70078b6d047de9ca4a5"},{url:"assets/algolia/algoliasearch.js",revision:"d5d2500bfe8443b42baaefe4996ee532"},{url:"assets/algolia/algoliasearch.min.js",revision:"9c5e51e57e2b1d888950bf4cb5708c49"},{url:"assets/algolia/algoliasearchLite.js",revision:"ce9b0e62645c036a143f639b92e7789f"},{url:"assets/algolia/algoliasearchLite.min.js",revision:"c2d71f042c879659dbc97f8853b62f21"},{url:"categories/index.html",revision:"031d02f45231461b24f8ba9193c85f2c"},{url:"categories/书籍/index.html",revision:"ba8e9a640ca6a13d4a7110b643f0811f"},{url:"categories/书籍/机器人/index.html",revision:"005dd23461c995878290ec15364dcafd"},{url:"categories/作图/index.html",revision:"23648474beb5af602e7d8b4c5be8d500"},{url:"categories/建图和定位/index.html",revision:"5424058735204daa9f09f9f578a55d0c"},{url:"categories/数学/index.html",revision:"02ed431a219d30d3b115519cd66282af"},{url:"categories/文献/index.html",revision:"7664fd8d8b94304f4e199165edc52e6d"},{url:"categories/文献/人体姿态/index.html",revision:"c67151f1eafd30c76b36400402ff8656"},{url:"categories/文献/目标识别/index.html",revision:"92ea883c51785ee7dff2e0c2ba232f48"},{url:"categories/机器人/index.html",revision:"10ee99b02e4e8a58cad5f46fd718e26b"},{url:"categories/编程语言/c/cmake/index.html",revision:"05680172a471a5f746f63c3b16d250b7"},{url:"categories/编程语言/c/index.html",revision:"1d54e4626a9b8415f319fbf1f1323bc9"},{url:"categories/编程语言/c/碎片化知识补丁/index.html",revision:"9ab9118745a8b714067dfde3f393a303"},{url:"categories/编程语言/index.html",revision:"418f9fe6ebab8bcf8fdada8b65066e52"},{url:"css/index.css",revision:"b37629cabe4813adae9156d68f8c380e"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"img/haizei.jpg",revision:"e6569b21842276d4ba45a33c941737fb"},{url:"img/haizei2.jpg",revision:"fa485caa156727e1a30ca9adec4964b4"},{url:"img/kenan.jpg",revision:"ab71c5011173f90c0822fe7146a4147d"},{url:"img/lanqiu.jpg",revision:"538291827936805d98f27eeebf265623"},{url:"img/touxiang.jpg",revision:"7cdb8950550c95fed3878b4ae2d5f268"},{url:"img/yang.jpg",revision:"da53326b0a025cc8e51cf3ec1e496f73"},{url:"index.html",revision:"c3e3924a1bbd8ed81cf1b60ae1191e65"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"live2dw/assets/moc/hijiki.2048/texture_00.png",revision:"817ca52e35fef3ef3a452127d1c88f43"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"page/2/index.html",revision:"f2f3879bcb2ce99465deee6a09725fb3"},{url:"tags/c/index.html",revision:"027f2cb36bd4ee93114a90b494c640c5"},{url:"tags/cmake/index.html",revision:"92cc03a2934ffd528759e11d0b0f8576"},{url:"tags/index.html",revision:"62f97a4755363833e431b838c3bde4ca"},{url:"tags/slam14讲/index.html",revision:"c56623ab36507a81ae19699c84ee0a1b"},{url:"tags/tikz/index.html",revision:"f921fbdb121c4f54837f02d3888f6e00"},{url:"tags/博客/index.html",revision:"9d9b66fe7b5dc8557b4580b2f6b94f73"},{url:"tags/卷积模块画图/index.html",revision:"d43f71b6096a28d62e39ddcd1f8a70b0"},{url:"tags/数学/index.html",revision:"1a20f26d4a9702992d8298355821b521"},{url:"tags/机器人/index.html",revision:"d269dc5eab93e1f9a3d9bc51f2de258d"},{url:"tags/机器人操作系统/index.html",revision:"b2292c514cddb0b4c03008fb69f562ab"},{url:"tags/机器学习/index.html",revision:"962177875b512ea52c71a37660797cb5"},{url:"tags/目标识别/index.html",revision:"a9d8a034d5686ba65e9c2a9b03412f08"},{url:"tags/神经网络/index.html",revision:"62548e0b68f102b07ce0d9cc7b98be9d"},{url:"tags/系统/index.html",revision:"577d12aad2be23018b414803c85babe5"}],{})}));
//# sourceMappingURL=service-worker.js.map

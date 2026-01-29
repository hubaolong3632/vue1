<template>
  <div style="background: rgba(255,255,255,0.18) ;backdrop-filter: blur(10px);">

    <el-container>
      <el-container>
        <el-main>
          <el-row>
            <hr style="border: 2px solid;">

            <el-col :span="4" :offset="1">

             <a href="https://00000.work/">
               <img  src="@/img/login/tou.png" style=" cursor:pointer ;width: 200px;height: 100px" >
             </a>

            </el-col>
            <el-col :span="17">
              <p style="font-size: 13px;color: rgb(255,255,255) ">
                "邮迹"文件床是一个专为上传、存储和分享大文件而设计的解决方案。它具备文件保存安全、上传与下载速度快等显著优势。系统基于MinIO和Spring Boot技术构建，确保了高性能与扩展性。用户上传的文件经过复制存储处理，进一步增强了数据安全性和可靠性。
                邮迹文件床不仅能满足个人用户对大文件的存储需求，还为企业提供了一种便捷、安全的数据共享方式，帮助用户轻松管理和分发重要文件。
              </p>
              <hr>
              <div style="font-size: 13px;color: rgb(255,255,255)">
                <el-row >
                  <el-col :span="10"  ><span style="margin-left: 100px;cursor: pointer" class="copy" data-clipboard-text="yq911412667">客服微信:<span  style="color: red">yj911412667</span></span></el-col>
                  <!--                  <div class="col-sm-6"><span style="margin-left: 100px">联系QQ:911412667</span></div>-->
                  <el-col :span="8">
                    <span class="copy" data-clipboard-text="911412667">
                      客服QQ:<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=911412667&amp;site=qq&amp;menu=yes" style="color: red;text-decoration:blink ;cursor: pointer">911412667</a>
                  </span>
                  </el-col>
                  <el-col  :span="5">
                    <span style="margin-left: 100px;cursor: pointer">售后群:<a  class="copy" href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=0jvxdlhY7qasI5knWYK_98UaQlw8fZlT&authKey=y%2BUMtadHLjw1bi8K6IirRFC4Th0gSVDn01Kk7fFWCrTlVV3hGYn6RmdPZjQPqR06&noverify=0&group_code=658763207" style="color: red">658763207</a></span></el-col>

                </el-row>













              </div>

            </el-col>

            <el-col :span="24" style="width: 100vw">
              <hr>
             <div style="margin-left: 24vw">
                <span style="font-size: 13px;color: rgb(255,255,255);">
                服务处于前沿探索阶段，用户应当合法合规使用本服务，并承担由此产生的所有责任。本服务生成的作品仅供个人学习交流使用，对用户的使用不做保证且不承担任何责任。
              </span>
               <p style="margin-left: 14vw ;font-size: 13px;color: rgb(255,255,255) ">
                 [如需要商业合作,AI定制,服务器购买,网站编写,遇到错误请联系上面QQ]
               </p>
             </div>

            </el-col>
          </el-row>
        </el-main>

        <!--        尾部备案号-->
        <el-footer>
          <hr>
          <a style="color: #ffffff; margin-left: 45vw" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=湘ICP备2023037948号" target="_blank">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEVHcEzx167z6ZLt35/69M3Yrn3//+L++trk0JX27LDv6KP034vx38fcp1nhsGft3oDq2IPkwm3kvFnKhFvTk3DZr4LDfz7dqVPpyF7ntVzep1zr0pjnvGzjrFPbnFHs2Y3///P/+cHoxnzv2X/42oL/+dD+2I/qw3r7/97++uzryXntzYb4znr/74bs3bLjvGnktoLktoCaaVzfr2f//+Tw1rv/95e0lH6ti3rhs2ifaFXbrGLkwY/buofZqG3Rrnb9v1TqvFrqxl7ktV3dmUTlsVD/0ljOAAIAAHnpsErmuVnsyVvpwWDrwFftzWbepEzVkEbkvlHUIRneoETThT3UAwnWHxhRNlHXPSDdhTVyeIL/217+xVLWZTDTOCIAAGbXdThqe4zyy27tcTAAAG4ABHcCAmu7TCYAAIDz5HL34nTnxGbu2HXmu1zqymLyyVbouU/ov07uvlDu1HDsuU/pt1Lpym3mwFXmtlbalkrvymHislPWjjzx02nWGhfwzWTzfCg4FjfVdCjjr0vPLBrYnljWMR+Relm9kF7XkVP8jizooD34xFi5i1jZRyisonP/723jkz3twmL/2E3wr0iTYDbXPyHUlj20o2b7n0bPFxE6EjnBDAuptJHRDBHNrFLJAALWwHhWTm9ODk7/vmDJWSpgHlAMAF1cX3jMJxMAAGHGJxPwXh7FUiSNhnfjqkrEGApCJEReWWbZAAaUd1zaSynMPi3ckUHngj/XXzPLPSHVSCqxDg79Kwr9LRSEj5lMADlpAjbGPh3TQCa2ABDdtmn/0mbZTirqgj0AG4770m+EaUrEazPlYCOBWDqjfVKeXzDiqVfbbTfkbzYAEHq/ABH0sEDXika9un4AAW8XMImVkIPKtnj/4mPYzHfRFQprc4R5ZGDNwnHglTl8enny2HjFvYfTZT0LBmfgjkfrXyniRh6njVk2Gk21gD/TvIf2gjaUjHX8zGRuYmK0mVgcPpcACJH6xERyhZT/tUn3pDnplzTOeDrFrnySjX6jmYQCSnFLAAAAQXRSTlMAaatEW6wcCAJBfLpB6+fhk+z0XRRInMbw5MaMvOTSJwdB++wwTLLmKSHElcG+g+DHsfvbGBw1y9H59/WfmOVvw6eCSBYAAAF3SURBVBjTY2CAABNGcwtGNgZkoMhqdeHc6fNGrKoIMfaOxqlnziYf7Z/dqwATY9MJb28IjTvuPnNuuBo7REzD8u2mrqCglr5Zc5Y82KguDxY0+5jxZk1oW928uAWvbqSsUwGJmTr8S333enNYxLQw94h7N5/oagIF7X/9z/jywX3p9MCX95Mfpdx20wMK2v7+++3z9/RDsQmXrt996PHsmg1Q0C4y6Wta+ondu3Yevvz8xa2nj42BgtZ/fv7wOLI3dm3Cjn1X0xJjQvSBgobBn96fPLBnw+qVW7cdvHLnVLU2UNBg+8Vj+1PjVy1etjzeIyraeb0WUFCptXNi0sItiTPmr1gUNanbpVkZKMgS6B/Q1BM9OWaK2wS3yIBqb06Q61kkykNq/BxdHetrXSrLBMFiDDx8Tk4Vvk4+VY7BXsXZvMxgQe6sHGdnR1efUhd/r1y/TCZIaAoIFeQXeZZ4+noX5vFzcUADVERYTFxOVlJKRloULAQABG6Pf7wtKesAAAAASUVORK5CYII=" style="cursor: pointer;">

            湘ICP备2023037948号
          </a>

        </el-footer>
      </el-container>
    </el-container>

  </div>



</template>

<script>

</script>

<style>

</style>
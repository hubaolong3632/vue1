<template>
<div style="height: 100vh">
<br>
<br>

<br>
  <button @click="aa1()">固化</button>
  <button @click="aa2()">改字</button>

  <pre>
   <code ref="codeBlock" class="java">
      {{code}}
  </code>
 </pre>


</div>
</template>

<script>
import hljs from 'highlight.js';
//动态显示
export default {
  name: "HigHlightV1",
  methods:{
    aa1(){
      hljs.highlightBlock(this.$refs.codeBlock);

      // 获取需要高亮显示的代码块元素
      const codeBlock = document.getElementById('codeBlockId');
// 修改代码块的文本内容
      codeBlock.innerText = 'function newFunction() { console.log("Modified code"); }';

// 在文本内容修改后重新触发代码块的高亮显示
      hljs.highlightBlock(codeBlock);
    },


    aa2(){
      this.code=`
    //    4.0别人家的接口
    @PostMapping("/gpt4.0.0613")
    public void gpt40_0608(@RequestBody GptStareamModel data,HttpServletRequest request, HttpServletResponse response){

        System.out.println(UtioY.JSON(data));
        data.setModel(gptHttpConfig.getAgencyno().getModel()); //设置默认3.5回答模型
        data.setGptUrl("tow40"); //设置请9求4.0接口 并且是第二家的接口
        G2_SonModel g2_sonModel = gptServer.gptStream(data, request, response); //
        System.out.println("输出"+UtioY.JSON(g2_sonModel));

    }

      `;

    }


  },


  mounted() {
    // hljs.highlightBlock(this.$refs.codeBlock);
  },
  data(){
    return {
      code:`import Vue from 'vue'
import Hljs from 'highlight.js'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    var blocks = el.querySelectorAll('pre code');
    // blocks.forEach((block) => { // blocks是个类数组 在ie版本不支持 无法高亮
    //   Hljs.highlightBlock(block)
    // })
    Array.prototype.forEach.call(blocks, (block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight`,
    }
  }
}
</script>

<style scoped>
</style>
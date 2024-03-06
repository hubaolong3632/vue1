<template>
<div style="height: 100vh">
  <br>
  <br>
  <br>

  <pre>
   <code ref="codeBlock" class="java">

      {{code}}

  </code>
 </pre>

</div>
</template>

<script>

//动态显示
import hljs from "highlight.js";

export default {
  name: "HigHlightV2",
  data(){
    return{
      code : `@PostMapping("/gpt4.0.0613")
    public void gpt40_0608(@RequestBody GptStareamModel data,HttpServletRequest request, HttpServletResponse response){
        if(){}
        System.out.println(UtioY.JSON(data));
        data.setModel(gptHttpConfig.getAgencyno().getModel()); //设置默认3.5回答模型
        data.setGptUrl("tow40"); //设置请9求4.0接口 并且是第二家的接口
        G2_SonModel g2_sonModel = gptServer.gptStream(data, request, response); //
        System.out.println("输出"+UtioY.JSON(g2_sonModel));

    }`,
    }
  },
  mounted() {
      hljs.highlightBlock(this.$refs.codeBlock);
      // hljs.addPlugin({
      //   'after:highlightElement': ({el, result}) => {
      //     el.dataset.language = result.language;
      //   }
      // });
  }
}
</script>

<style>/* 语法高亮 */

</style>

<template>
<div>
  <RoundTimeEr></RoundTimeEr>
  <button @click="g1">Ai语音聊天</button>

</div>
</template>

<script>
import RoundTimeEr from "@/components/alter/draw/RoundTimeEr";
import requestData from "@/router/requestData";
export default {
  name: "VoiceChar",
  components: {RoundTimeEr},
  methods:{
    async g1() {
      let data={
        id:1,
        name:"zanSan"
      }
    let k= await requestData.get("gptChat/getText",data);
    // let k= await requestData.postData("gptChat/postText",data);
      console.log(k)
    }
  }
}
</script>

<style scoped>

</style>
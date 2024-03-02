<template>
  <div>
    <input type="text" v-model="textToCopy">
    <button class="copy" data-clipboard-text="1">Copy</button>
    <button class="copy" data-clipboard-text="2">Copy</button>
    <button class="copy" data-clipboard-text="3">Copy</button>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name:"cheShi",
  data() {
    return {
      textToCopy: 'Hello, World!'
    };
  },
  created() {
    // let clipboard = new Clipboard('.copy');
    // clipboard.on('success', ()=> {
    //   this.$message({
    //     message: '复制成功',
    //     type: 'success'
    //   });
    //
    //
    // });
    // clipboard.on('error', ()=> {
    //   this.$message({
    //     message: '复制失败',
    //     type: 'error'
    //   });
    // });
  },
  //给他一个id然后先绑定id在吧参数放在id里面
  methods: {
    // initializeClipboard(zz) {
    // let zz1=  document.getElementById(zz)
    //   console.log(zz1)
    //   const clipboard = new Clipboard(zz1, {
    //     text: () => this.textToCopy
    //   });
    //
    //   clipboard.on('success', (e) => {
    //     console.info('成功:', e.text);
    //     clipboard.destroy();
    //   });
    //
    //   clipboard.on('error', (e) => {
    //     console.error('Copy failed:', e.action);
    //     clipboard.destroy();
    //   });
    // }
  }
};
</script>
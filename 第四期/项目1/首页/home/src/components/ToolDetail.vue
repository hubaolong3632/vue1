<template>
  <div class="tool-detail" v-if="tool.showDetails">
    <div class="tool-detail-content">
      <div class="tool-header">
        <img :src="tool.img" alt="tool icon" class="tool-icon" />
        <h3 class="tool-name">{{ tool.name }}</h3>
      </div>
      <p class="tool-introduce">{{ tool.introduce }}</p>
      <div class="tool-actions">
        <button class="visit-btn" @click="visitWebsite">访问网站</button>
        <button class="close-btn" @click="closeDetail">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolDetail',
  props: {
    tool: {
      type: Object,
      required: true
    }
  },
  methods: {
    visitWebsite() {
      window.open(this.tool.url, '_blank');
    },
    closeDetail() {
      this.$emit('close-detail');
    }
  }
}
</script>

<style scoped>
.tool-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.tool-detail-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tool-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.tool-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 8px;
}

.tool-name {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.tool-introduce {
  margin: 15px 0;
  line-height: 1.6;
  color: #666;
}

.tool-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.visit-btn, .close-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.visit-btn {
  background-color: #4CAF50;
  color: white;
}

.visit-btn:hover {
  background-color: #45a049;
}

.close-btn {
  background-color: #f1f1f1;
  color: #333;
}

.close-btn:hover {
  background-color: #e0e0e0;
}
</style> 
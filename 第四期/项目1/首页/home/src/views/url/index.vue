<script setup lang="js">
import img from '@/image/user/user.svg';
import p1 from '@/image/img/1.png';
import backIcon from '@/assets/icons/back.svg';
import { ref, reactive, nextTick } from 'vue';
import axios from "axios";
// import list from "@/config/list.json"


let list=ref();
let init=async () => {
  list.value= (await axios.get("https://files.00000.work/home/list.json")).data  //获取官网的json格式的工具

}
init();


// 当前选中的工具
const selectedTool = ref(null);
// 工具详情历史记录
const toolHistory = ref([]);
// 存储所有工具卡片的ref
const toolCardRefs = ref({});

// 显示工具详情
const showToolDetail = (tool, categoryIndex, toolIndex) => {
  // 保存当前工具到历史记录，包括分类索引和工具索引
  toolHistory.value.push({
    tool,
    categoryIndex,
    toolIndex
  });
  selectedTool.value = tool;
};

// 返回工具列表
const backToList = () => {
  // 从历史记录中获取上一个状态
  const previousState = toolHistory.value.pop();
  selectedTool.value = null;
  
  // 使用 nextTick 确保 DOM 更新后再滚动
  nextTick(() => {
    if (previousState) {
      const cardRef = toolCardRefs.value[`${previousState.categoryIndex}-${previousState.toolIndex}`];
      if (cardRef) {
        cardRef.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  });
};

// 访问网站
const visitWebsite = (url) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="element" style="height: 100vh">
    <!-- 工具详情页面 -->
    <div v-if="selectedTool" class="tool-detail-page">
      <div class="back-button">
        <el-button type="primary" @click="backToList">
          <img :src="backIcon" class="back-icon" alt="返回" />
          返回列表
        </el-button>
      </div>

      <div class="tool-detail-content">
        <div class="tool-header">
          <el-avatar :size="80" :src="selectedTool.img" shape="square" class="tool-icon" />
          <div class="tool-title">
            <h2 class="tool-name">{{ selectedTool.name }}</h2>
            <el-tag type="success" effect="dark">工具详情</el-tag>
          </div>
        </div>

        <el-divider content-position="left">工具介绍</el-divider>

        <div class="tool-description">
          <p>{{ selectedTool.introduce }}</p>
        </div>

        <div class="tool-actions">
          <el-button type="success" icon="el-icon-link" @click="visitWebsite(selectedTool.url)">访问网站</el-button>
        </div>
      </div>
    </div>

    <!-- 首页显示工具 -->
    <div v-if="!selectedTool" >
      <el-row :gutter="20" :span="24" v-for="(category, categoryIndex) in list" :key="categoryIndex" >
        <div class="category-section">
          <div class="category-title">
            <el-avatar :size="32" :src="category.icon" shape="square" />
            <h2>{{ category.title }}</h2>
          </div>

          <el-row :gutter="20" style="">
            <el-col :xs="24" :sm="12" :md="8" v-for="(tool, toolIndex) in category.data" :key="toolIndex" style="margin-top: 40px;">
              <div
                class="tool-card"
                @click="showToolDetail(tool, categoryIndex, toolIndex)"
                :ref="el => toolCardRefs[`${categoryIndex}-${toolIndex}`] = el"
              >
                <div class="tool-card-content">
                  <el-avatar :size="50" :src="tool.img" shape="square" class="tool-avatar" />
                  <div class="tool-info">
                    <h3 class="tool-card-name">{{ tool.name }}</h3>
                    <p class="tool-card-intro">{{ tool.introduce }}</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.element {
  overflow-y: auto;
  color: #e0e0e0;
}

.element::-webkit-scrollbar {
  width: 6px;
}

.element::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 3px;
}

.element::-webkit-scrollbar-track {
  background-color: #1e1e1e;
}

/* 工具详情页面样式 */
.tool-detail-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 20px;
}

.back-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.tool-detail-content {
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.tool-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.tool-icon {
  margin-right: 20px;
  border-radius: 8px;
}

.tool-title {
  display: flex;
  flex-direction: column;
}

.tool-name {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  color: #fff;
}

.tool-description {
  margin: 20px 0;
  line-height: 1.8;
  color: #ccc;
  font-size: 16px;
}

.tool-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

/* 工具列表页面样式 */
.category-section {
  width: 100%;

  padding: 20px;
  border-radius: 8px;
  background-color: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);

  transition: all 0.3s ease;
}

.category-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-color: #333;
}

.category-header {
  margin-bottom: 20px;
}

.category-title {
  display: flex;
  align-items: center;
}

.category-title h2 {
  margin: 0 0 0 10px;
  font-size: 1.5rem;
  color: #fff;
}

.tool-card {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: rgba(40, 40, 40, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #333;
  height: 100%;
}

.tool-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(40, 40, 40, 0.8);
  border-color: #333;
}

.tool-card-content {
  display: flex;
  align-items: flex-start;
  height: 100%;
}

.tool-avatar {
  margin-right: 15px;
  flex-shrink: 0;
}

.tool-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tool-card-name {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #fff;
}

.tool-card-intro {
  margin: 0;
  font-size: 0.9rem;
  color: #aaa;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

/* 自定义 Element UI 组件样式 */
:deep(.el-button) {
  border-radius: 4px;
  transition: all 0.3s;
}

:deep(.el-button:hover) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.el-divider) {
  background-color: #333;
}

:deep(.el-divider__text) {
  background-color: #1e1e1e;
  color: #ccc;
}

:deep(.el-tag) {
  border-radius: 4px;
}
</style>
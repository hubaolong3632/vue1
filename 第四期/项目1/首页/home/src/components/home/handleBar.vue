<template>
  <div class="nav-container">
    <!-- Logo Section with Search -->
    <div class="logo-section" :class="{ 'collapsed': isCollapse }">
      <div class="logo-container" @click="toggleSearch">
        <h1 class="logo-text" v-if="!isCollapse">工具导航</h1>
      </div>
    </div>

    <!-- Navigation Menu -->
    <el-menu
      class="nav-menu"
      :default-active="currentPath"
      :collapse="isCollapse"
      background-color="#121212"
      text-color="#e0e0e0"
      active-text-color="#409EFF"
    >
      <el-menu-item 
        :index="item.path" 
        v-for="(item,index) in rou" 
        :key="index" 
        @click="path_router(item)"
        class="nav-item"
      >
        <el-icon class="nav-icon">
          <img :src="item.meta.icon" alt="" class="menu-icon">
        </el-icon>
        <template #title>
          <span class="menu-title">{{item.meta.title}}</span>
        </template>
      </el-menu-item>


    </el-menu>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from "vue-router"
import { ElMessageBox } from 'element-plus'
import {Menu as IconMenu, Location, Setting,} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// 搜索相关状态
const isSearchActive = ref(false)
const searchQuery = ref('')

// 切换搜索状态
const toggleSearch = () => {
  if (!isCollapse) {
    isSearchActive.value = !isSearchActive.value
    if (isSearchActive.value) {
      // 延迟聚焦输入框
      setTimeout(() => {
        document.querySelector('.search-container input')?.focus()
      }, 300)
    }
  }
}

// 执行搜索
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // 这里可以添加实际的搜索逻辑
    console.log('搜索:', searchQuery.value)
    // 例如：跳转到搜索结果页面
    // router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 获取路由
let rou = ref(router.options.routes[0].children)
console.log(router.options)

// 路由跳转
let path_router = (path) => {
  router.push(path.path)
}

// 获取当前路径
const currentPath = route.path
console.log(currentPath)

// 处理退出登录

</script>

<style scoped>
.nav-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #121212;
  border-right: 1px solid #333;
  transition: all 0.3s ease;
}

.logo-section {
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #333;
  transition: all 0.3s ease;
  position: relative;
  min-height: 80px;
}

.logo-section.collapsed {
  padding: 10px 0;
  min-height: 50px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  height: 40px;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo-text {
  margin: 0;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

/* 搜索图标样式 */
.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  opacity: 0.7;
  transition: all 0.3s ease;
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 50%;
  padding: 4px;
}

.search-icon.active {
  color: #409EFF;
  opacity: 1;
  background-color: rgba(64, 158, 255, 0.2);
}

.search-icon i {
  font-size: 16px;
}

/* 搜索容器样式 */
.search-container {
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 0;
}

.search-container.active {
  width: 100%;
  height: 40px;
  opacity: 1;
  margin-top: 15px;
}


/* 自定义输入框样式 */
:deep(.el-input__inner) {
  background-color: #1e1e1e;
  border: 1px solid #333;
  color: #e0e0e0;
  border-radius: 4px;
}

:deep(.el-input__inner:focus) {
  border-color: #409EFF;
}

:deep(.el-input-group__append) {
  background-color: #409EFF;
  border-color: #409EFF;
  color: white;
}

:deep(.el-input__prefix) {
  color: #909399;
}

.nav-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  padding: 10px 5px;
}

.nav-menu::-webkit-scrollbar {
  width: 4px;
}

.nav-menu::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 2px;
}

.nav-menu::-webkit-scrollbar-track {
  background-color: #1e1e1e;
}

.nav-item {
  margin: 5px 0;
  border-radius: 4px;
  transition: all 0.3s ease;
  height: 50px;
  line-height: 50px;
}

.nav-item:hover {
  background-color: #1e1e1e !important;
  transform: translateX(3px);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.menu-icon {
  width: 18px;
  height: 18px;
  transition: all 0.3s ease;
}

.nav-item:hover .menu-icon {
  transform: scale(1.1);
}

.menu-title {
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.el-menu-item.is-active) {
  background-color: #1e1e1e !important;
  border-right: 3px solid #409EFF;
  font-weight: 600;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-menu--collapse .el-menu-item) {
  padding: 0 !important;
  justify-content: center;
}

.logout-item {
  margin-top: auto;
  border-top: 1px solid #333;
}

.logout-item:hover {
  background-color: #ff4d4f !important;
}
</style>
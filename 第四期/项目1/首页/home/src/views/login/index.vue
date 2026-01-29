<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>工具导航</h2>
        <p>请登录后继续访问</p>
      </div>
      
      <el-form 
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const loginForm = reactive({
  username: '',
  password: ''
})

const loading = ref(false)

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  loading.value = true
  try {
    // 这里模拟登录验证，实际项目中应该调用后端API
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      // 存储登录状态
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', loginForm.username)
      
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error('用户名或密码错误')
    }
  } catch (error) {
    ElMessage.error('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212;
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
}

.login-header p {
  color: #909399;
  font-size: 14px;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
  height: 40px;
}

:deep(.el-input__inner) {
  background-color: #1e1e1e;
  border: 1px solid #333;
  color: #e0e0e0;
}

:deep(.el-input__inner:focus) {
  border-color: #409EFF;
}

:deep(.el-input__prefix) {
  color: #909399;
}
</style> 
<template>
  <el-form :model="form" ref="step2" label-width="100px" :inline="false" size="default">
    <el-form-item label="管道" disabled>
      <el-input v-model="form.payAccount"></el-input>
    </el-form-item>
    <el-form-item label="连接件" size="default">
      <el-input v-model="form.collectAccount" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="设备仪表" size="default">
      <el-input v-model="form.collectName" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="控制阀门" size="default">
      <el-input v-model="form.amount" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlePay" :loading="payLoading">确认并提交</el-button>
      <el-button @click="handleLast">上一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emits = defineEmits(['lastStep', 'nextStep'])

const form = reactive({
  payAccount: '',
  collectAccount: '',
  collectName: '',
  amount: 0
})

const payLoading = ref(false)

form.payAccount = store.state.components.stepForm.payAccount
form.collectAccount = store.state.components.stepForm.collectAccount
form.collectName = store.state.components.stepForm.collectName
form.amount = store.state.components.stepForm.amount
form.payAccount = '管道1'
form.collectAccount = '连接件1'
form.collectName = '设备仪表2'
form.amount = '控制阀门3'
console.log(form)

// const payPassword = ref('123456')

const handlePay = () => {
  payLoading.value = true
  setTimeout(() => {
    ElMessage.success('成功转账')
    payLoading.value = false
    emits('nextStep')
  }, 2000)
}
const handleLast = () => {
  emits('lastStep')
}
</script>

<style lang='scss' scoped>

</style>

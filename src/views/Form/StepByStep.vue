<template>
  <el-container direction="vertical" class="stepForm">
    <el-header height="120px">
      <div>材料选型</div>
      <span>都市建筑工程给排水施工设计系统的材料选型步骤</span>
    </el-header>
    <el-container direction="vertical">
      <el-card shadow="never" :body-style="{ padding: '30px 120px' }">
        <el-steps :active="currentForm" direction="horizontal" :align-center="true"
            process-status="wait" finish-status="success">
          <el-step v-for="item in StepsList"
            :key="item.title"
            :title="item.title"
            :description="item.description">
            <template #icon>
              <SvgIcon :icon-name="item.icon" :width="30" :height="30" />
            </template>
          </el-step>
        </el-steps>
      </el-card>
      <el-container direction="vertical">
        <el-main height="100px">
          <Step1 v-if="currentForm === 0" @nextStep="nextStep" />
          <Step2 v-else-if="currentForm === 1" @lastStep="lastStep" @nextStep="nextStep" />
          <Step3 v-else @lastStep="lastStep" @nextStep="nextStep" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

const currentForm = ref(0)

const StepsList = reactive([
  {
    title: '候选材料选择',
    description: '选择适合的材料',
    icon: 'edit'
  },
  {
    title: '确认材料信息',
    description: '确认材料信息',
    icon: 'check'
  },
  {
    title: '完成材料选型',
    description: '恭喜您，材料选型成功',
    icon: 'paySuccess'
  }
])
const lastStep = () => {
  currentForm.value -= 1
}
const nextStep = () => {
  currentForm.value += 1
}

</script>

<style lang='scss' scoped>
.stepForm {
  padding: 10px;
  .el-header {
    padding: 20px;
    background: #fff;
    font-size: 20px;
    div {
      font-weight: 600;
    }
    span {
      font-size: 16px;
    }
  }
  .el-container {
    margin: 10px 0;
    background: #fff;
  }
}
</style>

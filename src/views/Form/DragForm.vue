<template>
  <div class="dragDialog-container">
    <el-button type="primary" size="default" @click="dialogVisible = true">点击生成管道布局</el-button>
    <div>
      <img :src="img" alt="">
    </div>
<!--    <div class="form-container">
      <el-form disabled :model="formInfo" ref="form" label-width="120px" :inline="false" size="default">
        <el-form-item>
          <el-input v-model="formInfo.hobby" placeholder="your hobby" size="default" clearable></el-input>
        </el-form-item>
        <el-form-item size="default">
          <el-select v-model="formInfo.preferSport" placeholder="业余运动" clearable filterable>
            <el-option v-for="item in sportsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="default" label="prefer weather">
          <el-radio-group v-model="formInfo.weather">
            <el-radio v-for="item in radiosList" :key="item.name" :label="item.name">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>-->
    <el-dialog title="管道布局配置" v-model="dialogVisible" width="30%" draggable>
      <el-form :model="dialogInfo" ref="form" label-width="120px" :inline="false" size="default">
        <el-form-item label="管道布局图名称">
          <el-input v-model="dialogInfo.hobby" placeholder="请填写名称" size="default" clearable></el-input>
        </el-form-item>
        <el-form-item size="default" label="环保标准">
          <el-select v-model="dialogInfo.preferSport" placeholder="环保标准" clearable filterable>
            <el-option v-for="item in sportsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item size="default" label="prefer weather">-->
<!--          <el-radio-group v-model="dialogInfo.weather">-->
<!--            <el-radio v-for="item in radiosList" :key="item.name" :label="item.name">-->
<!--              {{ item.name }}-->
<!--            </el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">生成</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

const dialogVisible = ref(false)
const formInfo = reactive({
  hobby: '',
  preferSport: null,
  weather: 'sunny'
})
const dialogInfo = reactive({
  hobby: '',
  preferSport: null,
  weather: 'sunny'
})

const sportsOptions = [
  {
    value: '篮球', label: 'basketball'
  },
  {
    value: '足球', label: 'football'
  },
  {
    value: '长跑', label: 'keep running'
  },
  {
    value: '游泳', label: 'swimming'
  },
  {
    value: '爬山', label: 'climb mountains'
  }
]
// eslint-disable-next-line no-unused-vars
const radiosList = [
  {
    name: 'sunny'
  },
  {
    name: 'cloudy'
  },
  {
    name: 'windy'
  },
  {
    name: 'rainy'
  },
  {
    name: 'humid'
  }
]

const handleSubmit = () => {
  formInfo.hobby = dialogInfo.hobby
  formInfo.preferSport = dialogInfo.preferSport
  formInfo.weather = dialogInfo.weather

  ElMessage.success('Successful to update!')
  dialogVisible.value = false
}

defineComponent('DragForm')
</script>

<style lang='scss' scoped>
.dragDialog-container {
  padding: 10px;

  .form-container {
    margin: 40px 0 10px;
    width: 400px;
  }
}
</style>

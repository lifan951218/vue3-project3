<template>
  <div class="exportExcel-container">
    <div class="header-table">
<!--      <div class="header-table-item">-->
<!--        <span style="margin-right: 10px;">方案名称:</span>-->
<!--        <el-input placeholder="excel-list" v-model="fileName" size="default" clearable style="width: 200px;">-->
<!--          <template #prefix>-->
<!--            <SvgIcon icon-name="document" />-->
<!--          </template>-->
<!--        </el-input>-->
<!--      </div>-->
      <!--      <div class="header-table-item">-->
      <!--        <span style="line-height: 32px; margin-right: 10px;">Col AutoWidth:</span>-->
      <!--        <el-radio-group v-model="autoWidth">-->
      <!--          <el-radio-button label="true">-->
      <!--          </el-radio-button>-->
      <!--          <el-radio-button label="false">-->
      <!--          </el-radio-button>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <div class="header-table-item">-->
      <!--        <span style="margin-right: 10px;">生成文件类型:</span>-->
      <!--        <el-select v-model="bookType" value-key="name" clearable filterable>-->
      <!--          <el-option v-for="item in typeOptions" :key="item.name" :label="item.name" :value="item.name">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </div>-->
      <div class="header-table-item">
        <el-button type="primary" size="default" :loading="exportLoading" @click="exportExcel"> 生成Excel </el-button>
      </div>
    </div>
    <el-table :data="articleList" border stripe v-loading="loading" min-height="300px"
              :row-style="{ 'user-select': 'none' }" ref="table">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column align="center" v-for="col in tableColumns" :prop="col.name" :key="col.name" :label="col.label"
                       :width="col?.width" :min-width="col?.minWidth">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getArticle } from '@/api/article'
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import SvgIcon from '@/icons/SvgIcon.vue'
import { parseTime } from '@/utils/utils'

const articleList = ref([])
const loading = ref(true)
const tableColumns = ref([
  {
    name: 'id',
    label: '参数编号',
    width: 40
  },
  {
    name: 'type',
    label: '建筑物类型',
    width: 320
  },
  {
    name: 'use',
    label: '建筑物用途',
    width: 150
  },
  {
    name: 'squa',
    label: '建筑面积',
    width: 150
  },
  {
    name: 'pipeline',
    label: '管道要求',
    width: 200
  },
  {
    name: 'water',
    label: '最大流量',
    minWidth: 220
  }
  // {
  //   name: 'Display_time',
  //   width: 160
  // },
  // {
  //   name: 'Forecast',
  //   width: 80
  // }
])

getArticle({ page: 1, limit: 20 }).then(res => {
  // eslint-disable-next-line no-unused-vars
  const { data } = res.data
  articleList.value = [
    {
      id: 1,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.23平方公里',
      pipeline: '>100米',
      water: '100'
    },
    {
      id: 2,
      type: '城市供水系统',
      use: '疏通下水',
      squa: '1.24平方公里',
      pipeline: '>101米',
      water: '103'
    },
    {
      id: 3,
      type: '城市污水处理厂',
      use: '疏通下水',
      squa: '1.25平方公里',
      pipeline: '>102米',
      water: '104'
    },
    {
      id: 4,
      type: '高速公路休息站',
      use: '疏通下水',
      squa: '1.26平方公里',
      pipeline: '>103米',
      water: '105'
    },
    {
      id: 5,
      type: '市政污水管道网络',
      use: '疏通下水',
      squa: '1.27平方公里',
      pipeline: '>104米',
      water: '106'
    },
    {
      id: 6,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.28平方公里',
      pipeline: '>105米',
      water: '107'
    },
    {
      id: 7,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.29平方公里',
      pipeline: '>106米',
      water: '108'
    },
    {
      id: 8,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.30平方公里',
      pipeline: '>107米',
      water: '109'
    },
    {
      id: 9,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.31平方公里',
      pipeline: '>108米',
      water: '110'
    },
    {
      id: 10,
      type: '高速公路收费站',
      use: '疏通下水',
      squa: '1.32平方公里',
      pipeline: '>109米',
      water: '111'
    }]
  loading.value = false
})

const fileName = ref('')
const autoWidth = ref(true)
const bookType = ref('xlsx')
// eslint-disable-next-line no-unused-vars
const typeOptions = [
  {
    name: 'xlsx'
  },
  {
    name: 'csv'
  },
  {
    name: 'txt'
  }
]
const exportLoading = ref(false)
const exportExcel = () => {
  exportLoading.value = true
  import('@/vendor/Export2Excel.js').then(excel => {
    const tHeader = ['Id', 'Timestamp', 'Author', 'Reviewer', 'Title', 'Display_time', 'Forecast']
    const filterVal = ['Id', 'Timestamp', 'Author', 'Reviewer', 'Title', 'Display_time', 'Forecast']
    const list = articleList.value
    const data = formatJson(filterVal, list)
    excel.exportJsonToExcel({
      header: tHeader,
      data,
      fileName: fileName.value,
      autoWidth: autoWidth.value,
      bookType: bookType.value
    })
    exportLoading.value = false
  })
}
const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => {
    if (j === 'Timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

</script>

<style lang='scss' scoped>
.exportExcel-container {
  padding: 20px;

  .header-table {
    display: flex;
    margin-bottom: 10px;
    background: #fff;

    .header-table-item {
      display: inline-block;
      margin: 20px;
      height: 36px;
    }
  }
}
</style>

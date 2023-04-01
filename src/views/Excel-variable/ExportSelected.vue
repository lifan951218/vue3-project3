<template>
  <div class="exportSelected-container">
    <div class="header-table">
      <div class="header-table-item">
        <span style="margin-right: 10px;">方案名称:</span>
        <el-input v-model="fileName" size="default" clearable style="width: 200px;">
          <template #prefix>
            <SvgIcon icon-name="document" />
          </template>
        </el-input>
      </div>
<!--      <div class="header-table-item">-->
<!--        <span style="line-height: 32px; margin-right: 10px;">Col AutoWidth:</span>-->
<!--        <el-radio-group v-model="autoWidth">-->
<!--          <el-radio-button label="true">-->
<!--          </el-radio-button>-->
<!--          <el-radio-button label="false">-->
<!--          </el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </div>-->
      <div class="header-table-item">
        <span style="margin-right: 10px;">生成文件类型:</span>
        <el-select v-model="bookType" value-key="name" clearable filterable>
          <el-option v-for="item in typeOptions" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="header-table-item">
        <el-button type="primary" size="default" :loading="exportLoading" @click="exportExcel"> 批量导出 </el-button>
      </div>
    </div>
    <el-table :data="articleList" border stripe v-loading="loading" min-height="300px" :header-row-style="{ background: '#4868b0' }"
      :row-style="{ 'user-select': 'none' }" ref="table" @selection-change="toggleSelect">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column v-for="col in tableColumns" :prop="col.name" :key="col.name" :label="col.label"
        :width="col?.width" :min-width="col?.minWidth" align="center">
      </el-table-column>
      <el-table-column align="center" prop="importance" label="操作" :width="120">
        <template #default="">
          <el-button type="text" size="small">设计预览</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getArticle } from '@/api/article'
import { ref } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'
import { ElMessage } from 'element-plus'

const articleList = ref([])
const loading = ref(false)
const fileName = ref('')
const autoWidth = ref(true)
const bookType = ref('xlsx')
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
const tableColumns = ref([
  {
    name: 'id',
    label: '方案编号',
    width: 40
  },
  {
    name: 'name',
    label: '方案名称',
    width: 320
  },
  {
    name: 'depart',
    label: '所属部门',
    width: 150
  },
  {
    name: 'assignee',
    label: '设计人员',
    width: 150
  },
  // {
  //   name: 'status',
  //   width: 200
  // },
  {
    name: 'time',
    label: '创建时间',
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
const exportList = ref([])
const table = ref()

const toggleSelect = (selectList) => {
  exportList.value = selectList
}

getArticle({ page: 1, limit: 20 }).then(res => {
  // eslint-disable-next-line no-unused-vars
  const { data } = res.data
  articleList.value = [
    {
      id: 1,
      name: '方案 1',
      depart: 'Department 1',
      assignee: 'Assignee 1',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 2,
      name: '方案 2',
      depart: 'Department 2',
      assignee: 'Assignee 2',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 3,
      name: '方案 3',
      depart: 'Department 3',
      assignee: 'Assignee 3',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 4,
      name: '方案 4',
      depart: 'Department 4',
      assignee: 'Assignee 4',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 5,
      name: '方案 5',
      depart: 'Department 5',
      assignee: 'Assignee 5',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 6,
      name: '方案 6',
      depart: 'Department 6',
      assignee: 'Assignee 6',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 7,
      name: '方案 7',
      depart: 'Department 7',
      assignee: 'Assignee 7',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    },
    {
      id: 8,
      name: '方案 8',
      depart: 'Department 8',
      assignee: 'Assignee 8',
      status: '待审核',
      time: '2023-01-01 08:10:00'
    }
  ]
  loading.value = false
})

const exportExcel = () => {
  if (exportList.value.length) {
    exportLoading.value = true
    import('@/vendor/Export2Excel.js').then(excel => {
      const tHeader = ['Id', 'Timestamp', 'Author', 'Reviewer', 'Title', 'Display_time', 'Forecast']
      const filterVal = ['Id', 'Timestamp', 'Author', 'Reviewer', 'Title', 'Display_time', 'Forecast']
      const list = exportList.value
      const data = formatJson(filterVal, list)
      excel.exportJsonToExcel({
        header: tHeader,
        data,
        fileName: fileName.value,
        autoWidth: autoWidth.value,
        bookType: bookType.value
      })
      exportLoading.value = false
      table.value.clearSelection()
    })
  } else {
    ElMessage.warning('请选中所要导出选项')
  }
}
const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

</script>

<style lang='scss' scoped>
.exportSelected-container {
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

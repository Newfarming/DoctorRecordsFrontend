<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="部门名:" class="el_form">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="账号:" class="el_form">
        <el-input v-model="temp.account" />
      </el-form-item>
      <el-form-item label="密码:" class="el_form">
        <el-input type="text" v-model="temp.password" />
      </el-form-item>
      <div style="text-align: center;">
        <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleEditDepart">确定</el-button>
        <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
      </div>
    </el-form>

  </div>
</template>
<script>
import { departEdit, getDepartDetails } from '@/api/table'

const activityStatusOptions = [
  { key: 'processing', display_name: '进行中' },
  { key: 'nostart', display_name: '未开始' },
  { key: 'ended', display_name: '已结束' }
]
const TypeOptions = [
  { key: '1', display_name: '普通权限' },
  { key: '2', display_name: '高级权限' },
  { key: '3', display_name: '最高权限' }
]
const departmentOptions = [
  { key: '1', display_name: '事业发展科' },
  { key: '2', display_name: '小区1' },
  { key: '3', display_name: '小区2' },
  { key: '4', display_name: '小区3' }
]
export default {
  name: 'UserList',
  components: { },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      departmentOptions,
      TypeOptions,
      activityStatusOptions,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      temp: {
        title: '',
        account: '',
        password: ''
      },
      total: 0,
      tableKey: 0,
      list: null,
      depart: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('this.$route.params', this.$route.params)
      this.listLoading = true
      getDepartDetails({
        id: this.$route.params.id
      }).then(response => {
        console.log('depart details info response', response)
        this.temp = response.data
      })
    },
    departEdit() {
      departEdit(this.temp).then(response => {
        if (response.data === 'success') {
          this.$router.push('/department/department-list/')
        }
      })
    },
    handleJumpLists() {
      this.$router.push('/user/user-list/')
    },
    handleEditDepart() {
      this.departEdit()
    }
  }
}
</script>

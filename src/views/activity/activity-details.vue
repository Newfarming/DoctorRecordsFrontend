<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">
      <el-form-item label="活动名称:" class="el_form">
        <div>{{ temp.name }}</div>
      </el-form-item>
      <el-form-item label="日期:" class="el_form">
        <div>{{ temp.start_time }}</div>
      </el-form-item>
      <el-form-item label="地点:" class="el_form">
        <div>{{ temp.place }}</div>
      </el-form-item>
      <el-form-item label="持续时间:" class="el_form">
        <div>{{temp.lasting_time}}天</div>
      </el-form-item>
      <el-form-item label="活动积分:" class="el_form">
        <div>{{temp.score}}</div>
      </el-form-item>
      <el-form-item label="活动状态:" class="el_form">
        <el-tag :type="temp.activity_status | statusFilter">
            {{ temp.activity_status | statusNameFilter }}
          </el-tag>
      </el-form-item>
      <el-form-item label="扫码签到:" class="el_form">
        <el-button @click="scanCode">开始扫码</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { getActivityDetails } from '@/api/table'
// import { userAdd, getUserDetails } from '@/api/user'

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
        0: 'gray',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusNameFilter(status) {
      const statusNameMap = {
        0: '未开始',
        1: '进行中',
        2: '已结束'
      }
      return statusNameMap[status]
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
        id: '',
        username: '',
        name: '',
        password: '',
        depart_id: '',
        phone: '',
        workNo: '',
        identityCard: ''
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
    scanCode() {
      console.log('浏览器信息', navigator.userAgent)
      this.$router.push({
        path: '/activity/scanCodePage/' + this.$route.params.id
      })
    },
    fetchData() {
      console.log('this.$route.params', this.$route.params)
      this.listLoading = true
      getActivityDetails({
        id: this.$route.params.id
      }).then(response => {
        console.log('getActivityDetails response', response)
        this.temp.activity_status = response.data.activity_status
        this.temp.id = response.data.id
        this.temp.name = response.data.name
        this.temp.lasting_time = response.data.lasting_time
        this.temp.score = response.data.score
        this.temp.place = response.data.place
        this.temp.start_time = response.data.start_time
      })
    },
    userAdd() {
      userAdd(this.temp).then(response => {
        if (response.data === 'success') {
          this.$router.push('/activity/activity-list/')
        }
      })
    },
    handleJumpLists() {
      this.$router.push('/activity/activity-list/')
    },
    handleAddUser() {
      this.userAdd()
    }
  }
}
</script>

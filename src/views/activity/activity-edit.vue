<template>
  <div class="m-activity_details">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="活动名称:" class="el_form">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="地点:" class="el_form">
        <el-input v-model="temp.place" />
      </el-form-item>
      <el-form-item label="日期:" class="el_form">
        <el-date-picker v-model="temp.start_time" type="datetime" placeholder="Please pick a date" />
      </el-form-item>
      <el-form-item label="持续时间(天):" class="el_form">
        <el-input v-model="temp.lasting_time" />
      </el-form-item>
      <el-form-item label="活动积分:" class="el_form">
        <el-input v-model="temp.score" />
      </el-form-item>
      <el-form-item label="活动状态:" class="el_form">
        <el-select v-model="temp.activity_status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in activityStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
      </el-form-item>
      <div style="text-align: center;">
        <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleEditActivity">确定</el-button>
        <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
      </div>

    </el-form>

  </div>
</template>

<script>
import { getDepartList, getActivityDetails, activityEdit} from '@/api/table'
import { userEdit, getUserDetails } from '@/api/user'

const activityStatusOptions = [
  { key: '0', display_name: '未开始' },
  { key: '1', display_name: '进行中' },
  { key: '2', display_name: '已结束' }
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
        name: '',
        start_time: '',
        lasting_time: '',
        place: '',
        score: '',
        activity_status: '',
        id: ''
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
      // getDepartList({
      //   search: '',
      //   search_type: 'title',
      //   pageStart: 0,
      //   pagesize: 100
      // }).then(response => {
      //   this.depart = response.data
      //   console.log('getDepartList response', response)
      //   this.listLoading = false
      // })
      getActivityDetails({
        id: this.$route.params.id
      }).then(response => {
        console.log('getActivityDetails details info response', response)
        this.temp.name = response.data.name
        this.temp.place = response.data.place
        this.temp.start_time = response.data.start_time
        this.temp.lasting_time = response.data.lasting_time
        this.temp.score = response.data.score
        this.temp.activity_status = response.data.activity_status
        this.temp.id = response.data.id
      })
    },
    activityEdit() {
      activityEdit(this.temp).then(response => {
        if (response.data === 'success') {
          this.$router.push('/activity/activity-list/')
        }
      })
    },
    handleJumpLists() {
      this.$router.push('/activity/activity-list/')
    },
    handleEditActivity() {
      this.activityEdit()
    }
  }
}
</script>

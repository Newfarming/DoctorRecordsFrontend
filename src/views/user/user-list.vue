<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索内容" style="width: 150px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="搜索类型" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
        <el-option v-for="item in TypeOptions" :key="item.key" :label="item.display_name" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" style="margin-top:5px;" icon="el-icon-search" @click="fetchData">
        搜索人员
      </el-button>
      <el-button v-show="permission_type.indexOf('1')>=0" class="filter-item" style="margin-left: 10px;margin-top:5px;" type="primary" icon="el-icon-edit" @click="handleJumpAdd">
        添加人员
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      :depart="depart"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJumpEdit(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJumpEdit(row)">{{ row.phone }}</span>
          <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="部门" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJumpEdit(row)">{{ row.depart_name }}</span>
          <!--          <el-tag>{{ row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
<!--          <el-button v-show="permission_type.indexOf('4')>=0" type="primary" size="mini" @click="handleJumpEdit(row)">-->
<!--            编辑-->
<!--          </el-button>-->
          <el-button size="mini" type="primary" @click="handleJumpEdit(row)">
            编辑
          </el-button>
          <el-button v-show="permission_type.indexOf('2')>=0" size="mini" type="danger" @click="handleDelete(row,row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getUserList, getDepartList, getActivityList } from '@/api/table'
import { userDelete } from '@/api/user'
import { getPermissionTypeCookie } from '@/utils/auth'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const TypeOptions = [
  { key: '1', display_name: '姓名', value: 'name' },
  // { key: '2', display_name: '工号', value: 'workNo' },
  { key: '3', display_name: '手机号', value: 'phone' }
  // { key: '4', display_name: '部门', value: '' }
]
export default {
  name: 'UserList',
  components: { Pagination },
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
      total: 0,
      tableKey: 0,
      list: null,
      depart: null,
      listLoading: true,
      TypeOptions,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: '',
        type: '',
        sort: '+id'
      },
      permission_type: getPermissionTypeCookie().split(',')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data
        this.listLoading = false
      })
      getUserList({
        search: this.listQuery.title || '',
        search_type: this.listQuery.type || 'username',
        pageStart: this.listQuery.page - 1 || 0,
        pagesize: this.listQuery.limit || 20
      }).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.total
      })
    },
    handleSearch() {
      this.listLoading = true
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data
        this.listLoading = false
      })
      getUserList({
        search: this.listQuery.title || '',
        search_type: this.listQuery.type || 'username',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = 100
      })
    },
    handleJumpDetails(row) {
      this.$router.push('/user/user-details/' + row.id)
    },
    handleJumpEdit(row) {
      console.log('row:' + JSON.stringify(row))
      this.$router.push('/user/user-edit/' + row.id)
    },
    handleJumpAdd() {
      this.$router.push('/user/user-add')
    },
    handleDelete(row) {
      userDelete({
        id: row.pk
      }).then(response => {
        this.fetchData()
        // this.listLoading = false
      })
    },
    handleFilter() {
      // this.listQuery.page = 1
      // this.get()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

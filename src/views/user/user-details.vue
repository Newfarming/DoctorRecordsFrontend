<template>
  <div class="m-activity_details">
    <div class="m-dangan">
      <div class="line">
        <div class="ibox">姓名</div>
        <div class="ibox">{{userinfo.name}}</div>
        <div class="ibox">性别</div>
        <div class="ibox">{{ userinfo.sex }}</div>
        <div class="ibox">生日</div>
        <div class="ibox">{{userinfo.birthday}}</div>
      </div>
      <div class="line">
        <div class="ibox">学历</div>
        <div class="ibox">{{ userinfo.education }}</div>
        <div class="ibox">学位</div>
        <div class="ibox">{{ userinfo.academic_degree }}</div>
        <div class="ibox">专业</div>
        <div class="ibox">{{ userinfo.major }}</div>
      </div>
      <div class="line">
        <div class="ibox">毕业院校</div>
        <div class="ibox">{{ userinfo.graduated_school }}</div>
        <div class="ibox">参加工作时间</div>
        <div class="ibox">{{ userinfo.working_time }}</div>
        <div class="ibox">联系电话</div>
        <div class="ibox">{{ userinfo.phone }}</div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">职称情况</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">职称</div>
            <div class="bx">聘任时间(X年X月)</div>
            <div class="bx bx-3">资格证书编号</div>
          </div>
          <div class="right-line" v-for="item in userinfo.professionalTitleList">
            <div class="bx">{{item.title}}</div>
            <div class="bx">聘任时间(X年X月)</div>
            <div class="bx bx-3">资格证书编号</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">进修（外出学习）情况</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">进修时间（年/月-年/月）</div>
            <div class="bx">进修医院名称</div>
            <div class="bx bx-2">进修专业</div>
            <div class="bx">进修照片</div>
          </div>
          <div class="right-line" v-for="item in userinfo.studyTableList">
            <div class="bx bx-2">{{item.name}}</div>
            <div class="bx">进修医院名称</div>
            <div class="bx bx-2">进修专业</div>
            <div class="bx">进修照片</div>
          </div>
          <div class="right-line">
            <div class="bx bx-2">外出学习时间（年/月-年/月</div>
            <div class="bx">地点</div>
            <div class="bx bx-4">学习会议名称</div>
          </div>
          <div class="right-line" v-for="item in userinfo.outTableList">
            <div class="bx bx-2">外出学习时间（年/月-年/月</div>
            <div class="bx">地点</div>
            <div class="bx bx-4">学习会议名称</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">科研项目</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">立项时间</div>
            <div class="bx">立项类型</div>
            <div class="bx bx-3">题目</div>
          </div>
          <div class="right-line" v-for="item in userinfo.researchProjectList">
            <div class="bx">立项时间</div>
            <div class="bx">立项类型</div>
            <div class="bx bx-3">题目</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">科研获奖</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">获奖年度</div>
            <div class="bx">获奖级别</div>
            <div class="bx bx-2">获奖项目名称</div>
            <div class="bx bx-2">上传获奖证书</div>
          </div>
          <div class="right-line" v-for="item in userinfo.researchAwardList">
            <div class="bx">获奖年度</div>
            <div class="bx">获奖级别</div>
            <div class="bx bx-2">获奖项目名称</div>
            <div class="bx bx-2">上传获奖证书</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">科研论文</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">发表时间（年/月-年/月）</div>
            <div class="bx">期刊名称</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">级别</div>
          </div>
          <div class="right-line" v-for="item in userinfo.researchPapersList">
            <div class="bx bx-2">发表时间（年/月-年/月）</div>
            <div class="bx">期刊名称</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">级别</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">获取专利情况</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">年度（年/月-年/月）</div>
            <div class="bx">类别</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">上传证书</div>
          </div>
          <div class="right-line" v-for="item in userinfo.obtainPatentsList">
            <div class="bx bx-2">年度（年/月-年/月）</div>
            <div class="bx">类别</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">上传证书</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">新技术开展情况</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">获准开展时间</div>
            <div class="bx">转常规开展时间</div>
            <div class="bx bx-4">项目名称</div>
          </div>
          <div class="right-line" v-for="item in userinfo.newTechResearchList">
            <div class="bx bx-2">获准开展时间</div>
            <div class="bx">转常规开展时间</div>
            <div class="bx bx-4">项目名称</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">新技术获奖</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">获奖时间</div>
            <div class="bx">获奖级别</div>
            <div class="bx bx-2">获奖项目名称</div>
            <div class="bx">上传获奖证书</div>
          </div>
          <div class="right-line" v-for="item in userinfo.newTechAwardList">
            <div class="bx bx-2">{{ item.fields.get_year }}</div>
            <div class="bx">{{item.fields.award_rank}}</div>
            <div class="bx bx-2">{{item.fields.award_name}}</div>
            <div class="bx">{{ item.fields.award_certificate_pic }}</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">手术资质</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-5"><input type="checkbox" ><span class="ckword">一级</span> <input type="checkbox"><span class="ckword">二级</span> <input type="checkbox"><span class="ckword">三级</span>  <input type="checkbox"><span class="ckword">四级</span></div>
            <div class="bx">上传授权表</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">处方权限</div>
        <div class="zuoyou-right">
          <div class="right-line oneline">
            <span>普通处方权：</span>
            <input type="checkbox">
          </div>
          <div class="right-line oneline">
            <span>抗菌药物：</span>
            <input type="checkbox"><span class="ckword">非限制类</span>
            <input type="checkbox"><span class="ckword">限制类</span>
            <input type="checkbox"><span class="ckword">特殊级抗菌药物</span>
          </div>
          <div class="right-line oneline">
            <span>抗肿瘤药物：</span>
            <input type="checkbox"><span class="ckword">普通使用级</span>
            <input type="checkbox"><span class="ckword">限制使用级</span>
          </div>
          <div class="right-line oneline">
            <span>麻醉精神类：</span>
            <input type="checkbox"><span class="ckword">麻醉药品</span>
            <input type="checkbox"><span class="ckword">第一类精神药品</span>
            <input type="checkbox"><span class="ckword">第二类精神药品</span>
          </div>
          <div class="right-line oneline">
            <span>皮质激素类药物：</span>
            <input type="checkbox"><span class="ckword">短中程使用糖皮质激素</span>
            <input type="checkbox"><span class="ckword">冲击疗法、长疗程使用糖皮质激素 </span>
          </div>
          <div class="right-line oneline">
            <span>生物与血液制剂：</span>
            <input type="checkbox">
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleJumpLists">确定</el-button>
      <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getDepartList } from '@/api/table'
import { userAdd, getUserDetails } from '@/api/user'

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
      userinfo: {
        'id': '',
        'name': '',
        'sex':'',
        'education': '',
        'academic_degree': '',
        'major': '',
        'graduated_school': '',
        'working_time': '',
        'phone': '',
        'birthday': '',
        'surgical_qualification': '',
        'surgical_qualification_certificate_pic': '',
        'prescription_normal': false,
        'prescription_Antibacterials_restricted': false,
        'prescription_Antibacterials_unrestricted': false,
        'prescription_Antibacterials_special': false,
        'prescription_Antineoplastic_normal': false,
        'prescription_Antineoplastic_limited': false,
        'prescription_Narcotics_Narcotic_drugs': false,
        'prescription_Narcotics_Psychotropic_first': false,
        'prescription_Narcotics_Psychotropic_second': false,
        'prescription_Corticosteroids_Short_glucocorticoid': false,
        'prescription_Corticosteroids_Long_glucocorticoid': false,
        'prescription_Biological_and_blood_preparations': false,
        'depart_id': '',
        'depart_name': '',
        'newTechAwardList': [],
        'newTechResearchList': [],
        'outTableList': [],
        'obtainPatentsList': [],
        'professionalTitleList': [],
        'researchProjectList': [],
        'researchAwardList': [],
        'researchPapersList': [],
        'studyTableList': []
      },
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
        identityCard: '',
        permission_id: '',
        permisstion_name: ''
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
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data
        console.log('getDepartList response', response)
        this.listLoading = false
      })
      getUserDetails({
        id: this.$route.params.id
      }).then(response => {
        console.log('user details info response', response)
        this.userinfo = response.data
        console.log('response.data', response.data)
      })
    },
    userAdd() {
      userAdd(this.temp).then(response => {
        if (response.data === 'success') {
          this.$router.push('/user/user-list/')
        }
      })
    },
    handleJumpLists() {
      this.$router.push('/user/user-list/')
    },
    handleAddUser() {
      this.userAdd()
    }
  }
}
</script>

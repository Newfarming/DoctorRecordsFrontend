<template>
  <div class="m-activity_details">
    <div>
      <span style="margin-right: 10px;">请选择科室:</span>
      <el-select v-model="userinfo.depart_id" placeholder="请选择科室" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
        <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
    </div>
    <div class="m-dangan" style="margin-top:10px; margin-bottom:10px;">
      <div class="line">
        <div class="ibox">姓名</div>
        <div class="ibox"><input v-model="userinfo.name" class="input-text-box" type="text"></div>
        <div class="ibox">性别</div>
        <div class="ibox">
          <el-select v-model="userinfo.sex" placeholder="请选择性别" class="filter-item" style="width: 120px;">
            <el-option v-for="(item,index) in sex" :key="index" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="ibox">生日</div>
        <div class="ibox">
          <input v-model="userinfo.birthday" class="input-text-box" type="date">
        </div>
      </div>
      <div class="line">
        <div class="ibox">学历</div>
        <div class="ibox"><input v-model="userinfo.education" class="input-text-box" type="text"> </div>
        <div class="ibox">学位</div>
        <div class="ibox"><input v-model="userinfo.academic_degree" class="input-text-box" type="text"> </div>
        <div class="ibox">专业</div>
        <div class="ibox"><input v-model="userinfo.major" class="input-text-box" type="text"> </div>
      </div>
      <div class="line">
        <div class="ibox">毕业院校</div>
        <div class="ibox"><input v-model="userinfo.graduated_school" class="input-text-box" type="text"> </div>
        <div class="ibox">参加工作时间</div>
        <div class="ibox"><input v-model="userinfo.working_time" class="input-text-box" type="date"> </div>
        <div class="ibox">联系电话</div>
        <div class="ibox"><input v-model="userinfo.phone" class="input-text-box" type="text"> </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">职称情况
          <div class="add" @click="addlist(userinfo.ProfessionalTitleList,{name:'',engage_time:'',certificate_number:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">职称</div>
            <div class="bx">聘任时间</div>
            <div class="bx bx-3">资格证书编号</div>
          </div>
          <div v-for="(item,index) in userinfo.ProfessionalTitleList" :key="index" class="right-line">
            <div class="bx"><input v-model="item.name" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.engage_time" class="input-text-box" type="date"></div>
            <div class="bx bx-3"><input v-model="item.certificate_number" class="input-text-box" type="text"></div>
            <div class="delete" @click="removeList(userinfo.ProfessionalTitleList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          进修（外出学习）情况
          <div>
            <div class="add" @click="addlist(userinfo.StudyTableList,{study_time:'',study_hospital:'',study_major:'',study_certificate_pic:''})">添加进修</div>
            <div class="add" @click="addlist(userinfo.OutTableList,{out_study_time:'',out_study_place:'',out_study_meeting:''})">添加外出</div>
          </div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">进修时间（年/月-年/月）</div>
            <div class="bx">进修医院名称</div>
            <div class="bx bx-2">进修专业</div>
            <div class="bx">进修照片</div>
          </div>
          <div v-for="(item, index) in userinfo.StudyTableList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.study_time" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.study_hospital" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.study_major" class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.study_certificate_pic.length>0" class="a-jump" :href="item.study_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.study_certificate_pic.length==0"
                class="upload-demo"
                :action="save_img_url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'study_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.study_certificate_pic.length==0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.StudyTableList, index)">删除</div>
          </div>
          <div class="right-line">
            <div class="bx bx-2">外出学习时间（年/月/日)</div>
            <div class="bx">地点</div>
            <div class="bx bx-4">学习会议名称</div>
          </div>
          <div v-for="(item, index) in userinfo.OutTableList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.out_study_time" class="input-text-box" type="date"></div>
            <div class="bx"><input v-model="item.out_study_place" class="input-text-box" type="text"></div>
            <div class="bx bx-4"><input v-model="item.out_study_meeting" class="input-text-box" type="text"></div>
            <div class="delete" @click="removeList(userinfo.OutTableList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          科研项目
          <div class="add" @click="addlist(userinfo.ResearchProjectList,{start_time:'',start_type:'',title:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">立项时间</div>
            <div class="bx">立项类型</div>
            <div class="bx bx-3">题目</div>
          </div>
          <div v-for="(item,index) in userinfo.ResearchProjectList" :key="index" class="right-line">
            <div class="bx"><input v-model="item.start_time" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.start_type" class="input-text-box" type="text"></div>
            <div class="bx bx-3"><input v-model="item.title" class="input-text-box" type="text"></div>
            <div class="delete" @click="removeList(userinfo.ResearchProjectList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          科研获奖
          <div class="add" @click="addlist(userinfo.ResearchAwardList,{award_time:'',award_rank:'',award_name:'',award_certificate_pic:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx">获奖年度</div>
            <div class="bx">获奖级别</div>
            <div class="bx bx-2">获奖项目名称</div>
            <div class="bx bx-2">上传获奖证书</div>
          </div>
          <div v-for="(item, index) in userinfo.ResearchAwardList" :key="index" class="right-line">
            <div class="bx"><input v-model="item.award_time" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.award_rank" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.award_name" class="input-text-box" type="text"></div>
            <div class="bx bx-2">
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.award_certificate_pic.length==0"
                class="upload-demo"
                :action="save_img_url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'award_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.award_certificate_pic.length==0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.ResearchAwardList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          科研论文
          <div class="add" @click="addlist(userinfo.ResearchPapersList,{publication_time:'',journal_name:'',project_name:'',project_rank:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">发表时间（X年X月）</div>
            <div class="bx">期刊名称</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">级别</div>
          </div>
          <div v-for="(item,index) in userinfo.ResearchPapersList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.publication_time" class="input-text-box" type="date"></div>
            <div class="bx"><input v-model="item.journal_name" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.project_name" class="input-text-box" type="text"></div>
            <div class="bx">
              <el-select v-model="item.project_rank" placeholder="请选择级别" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
                <el-option v-for="(item,index) in paper_rank" :key="index" :label="item" :value="item" />
              </el-select>
              <!--              <input v-model="item.project_rank" class="input-text-box" type="text">-->
            </div>
            <div class="delete" @click="removeList(userinfo.ResearchPapersList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          获取专利情况
          <div class="add" @click="addlist(userinfo.ObtainPatentsList,{get_time:'',type:'',name:'',patents_certificate_pic:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">年度</div>
            <div class="bx">类别</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">上传证书</div>
          </div>
          <div v-for="(item,index) in userinfo.ObtainPatentsList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.get_time" class="input-text-box" type="text"></div>
            <div class="bx">
              <el-select v-model="item.type" placeholder="请选择类别" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
                <el-option v-for="(item,index) in obtain_select" :key="index" :label="item" :value="item" />
              </el-select>
              <!--              <input v-model="item.project_rank" class="input-text-box" type="text">-->
            </div>
            <div class="bx bx-2"><input v-model="item.name" class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.patents_certificate_pic.length>0" class="a-jump" :href="item.patents_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.patents_certificate_pic.length==0"
                class="upload-demo"
                :action="save_img_url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'patents_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.patents_certificate_pic.length==0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.ObtainPatentsList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">
          新技术开展情况
          <div class="add" @click="addlist(userinfo.NewTechResearchList,{approved_time:'',to_nomal_time:'',name:''})">添加</div>
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">获准开展时间</div>
            <div class="bx">转常规开展时间</div>
            <div class="bx bx-4">项目名称</div>
          </div>
          <div v-for="(item,index) in userinfo.NewTechResearchList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.approved_time" class="input-text-box" type="date"> </div>
            <div class="bx"><input v-model="item.to_nomal_time" class="input-text-box" type="date"></div>
            <div class="bx bx-4"><input v-model="item.name" class="input-text-box" type="text"></div>
            <div class="delete" @click="removeList(userinfo.NewTechResearchList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">新技术获奖<div class="add" @click="addlist(userinfo.NewTechAwardList,{get_year:'',award_rank:'',award_name:'',award_certificate_pic:''})">添加</div></div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2">获奖时间</div>
            <div class="bx">获奖级别</div>
            <div class="bx bx-2">获奖项目名称</div>
            <div class="bx">上传获奖证书</div>
          </div>
          <div v-for="(item, index) in userinfo.NewTechAwardList" :key="index" class="right-line">
            <div class="bx bx-2"><input v-model="item.get_year " class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.award_rank " class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.award_name " class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.award_certificate_pic.length==0"
                class="upload-demo"
                :action="save_img_url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'award_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.award_certificate_pic.length==0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.NewTechAwardList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">手术资质</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-5">
              <input id="shoushu1" v-model="userinfo.surgical_qualification_1" type="checkbox" value="一级"><label for="shoushu1" class="ckword">一级</label>
              <input id="shoushu2" v-model="userinfo.surgical_qualification_2" type="checkbox" value="二级"><label for="shoushu2" class="ckword">二级</label>
              <input id="shoushu3" v-model="userinfo.surgical_qualification_3" type="checkbox" value="三级"><label for="shoushu3" class="ckword">三级</label>
              <input id="shoushu4" v-model="userinfo.surgical_qualification_4" type="checkbox" value="四级"><label for="shoushu4" class="ckword">四级</label>
            </div>
            <div
              class="bx"
              style="width:275px;"
            >
              <a v-show="userinfo.surgical_qualification_certificate_pic.length>0" class="a-jump" style="margin-right: 15px;" :href="userinfo.surgical_qualification_certificate_pic" target="_blank">查看授权表</a>
              <el-upload
                ref="upload_surgical"
                class="upload-demo"
                style="display:inline-block"
                :action="save_img_url"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(userinfo,'surgical_qualification_certificate_pic')"
                :show-file-list="false"
              >
                <el-button size="small" type="primary" @click="handlePreview">上传授权表</el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">处方权限</div>
        <div class="zuoyou-right">
          <div class="right-line oneline">
            <label for="putongchufang" value="prescription_normal">普通处方权：</label>
            <input id="putongchufang" v-model="userinfo.prescription_normal" type="checkbox">
          </div>
          <div class="right-line oneline">
            <span>抗菌药物：</span>
            <input id="kangjunfeixianzhi" v-model="userinfo.prescription_Antibacterials_unrestricted" type="checkbox"><label for="kangjunfeixianzhi" class="ckword">非限制类</label>
            <input id="kangjunxianzhi" v-model="userinfo.prescription_Antibacterials_restricted" type="checkbox"><label class="ckword" for="kangjunxianzhi">限制类</label>
            <input id="kangjunteshu" v-model="userinfo.prescription_Antibacterials_special" type="checkbox"><label class="ckword" for="kangjunteshu">特殊级抗菌药物</label>
          </div>
          <div class="right-line oneline">
            <span>抗肿瘤药物：</span>
            <input id="putongshiyong" v-model="userinfo.prescription_Antineoplastic_normal" type="checkbox"><label class="ckword" for="putongshiyong">普通使用级</label>
            <input id="xianzhishiyong" v-model="userinfo.prescription_Antineoplastic_limited" type="checkbox"><label class="ckword" for="xianzhishiyong">限制使用级</label>
          </div>
          <div class="right-line oneline">
            <span>麻醉精神类：</span>
            <input id="mazuilei" v-model="userinfo.prescription_Narcotics_Narcotic_drugs" type="checkbox"><label class="ckword" for="mazuilei">麻醉药品</label>
            <input id="jingshenyi" v-model="userinfo.prescription_Narcotics_Psychotropic_first" type="checkbox"><label class="ckword" for="jingshenyi">第一类精神药品</label>
            <input id="jingshener" v-model="userinfo.prescription_Narcotics_Psychotropic_second" type="checkbox"><label class="ckword" for="jingshener">第二类精神药品</label>
          </div>
          <div class="right-line oneline">
            <span>皮质激素类药物：</span>
            <input id="duanzhongcheng" v-model="userinfo.prescription_Corticosteroids_Short_glucocorticoid" type="checkbox"><label class="ckword" for="duanzhongcheng">短中程使用糖皮质激素</label>
            <input id="changqi" v-model="userinfo.prescription_Corticosteroids_Long_glucocorticoid" type="checkbox"><label class="ckword" for="changqi">冲击疗法、长疗程使用糖皮质激素 </label>
          </div>
          <div class="right-line oneline">
            <label for="shengwuxueye">生物与血液制剂：</label>
            <input id="shengwuxueye" v-model="userinfo.prescription_Biological_and_blood_preparations" type="checkbox">
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleEdit">确定</el-button>
      <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getDepartList } from '@/api/table'
import { userAdd, userEdit, getUserDetails } from '@/api/user'

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
      save_img_url: 'http://192.168.250.190/DoctorRecordsServerApp/saveimage/',
      paper_rank: ['一般期刊', '科技核心', '中文核心', '外文', 'SCI'],
      sex: ['男', '女'],
      obtain_select: ['发明专利', '实用新型专利', '外观专利', '软件著作权'],
      userinfo: {
        'id': '',
        'name': '',
        'sex': '',
        'education': '',
        'academic_degree': '',
        'major': '',
        'graduated_school': '',
        'working_time': '',
        'phone': '',
        'birthday': '',
        'surgical_qualification_1': false,
        'surgical_qualification_2': false,
        'surgical_qualification_3': false,
        'surgical_qualification_4': false,
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
        'NewTechAwardList': [],
        'NewTechResearchList': [],
        'OutTableList': [],
        'ObtainPatentsList': [],
        'ProfessionalTitleList': [],
        'ResearchProjectList': [],
        'ResearchAwardList': [],
        'ResearchPapersList': [],
        'StudyTableList': []
      },
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
      depart: [],
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
    uploadImgSuccess(item, dataname) {
      return function(res) {
        console.log('uploadImgSuccess!!! item res', item, res)
        item[dataname] = res.data.imgurl
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.$refs['upload_surgical'].clearFiles()
      console.log('handlePreview file', file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    fetchData() {
      console.log('this.$route.params', this.$route.params)
      this.listLoading = true
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        this.depart = response.data.slice(1)
        console.log('getDepartList response', response)
        this.listLoading = false
      })
      getUserDetails({
        id: this.$route.params.id
      }).then(response => {
        // console.log('user details info response', response)
        this.userinfo = response.data
        // this.userinfo.surgical_qualification = response.data.surgical_qualification.split(',')
        console.log('response.data', response.data)
      })
    },
    testinput() {
      console.log('input', this.userinfo.professionalTitleList)
    },
    userAdd() {
      // this.userinfo.surgical_qualification = this.userinfo.surgical_qualification.join(',')
      userAdd(this.userinfo).then(response => {
        if (response.data === 'success') {
          this.$router.push('/user/user-list/')
        }
      })
    },
    userEdit() {
      userEdit(this.userinfo).then(response => {
        if (response.data === 'success') {
          this.$router.push('/user/user-list/')
        }
      })
    },
    addlist(obj, arr) {
      obj.push(arr)
    },
    removeList(obj, index) {
      console.log(this.userinfo)
      obj.splice(index, 1)
    },
    handleJumpLists() {
      this.$router.push('/user/user-list/')
    },
    handleEdit() {
      this.userEdit()
    },
    handleAddUser() {
      this.userAdd()
    }
  }
}
</script>

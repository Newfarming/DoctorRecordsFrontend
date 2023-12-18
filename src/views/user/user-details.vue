<template>
  <div class="m-activity_details">
    <!--    <div>-->
    <!--      <span style="margin-right: 10px;">科室:</span>-->
    <!--      <el-select v-model="userinfo.depart_id" disabled placeholder="请选择科室" clearable class="filter-item" style="width: 120px;margin-right: 10px;">-->
    <!--        <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />-->
    <!--      </el-select>-->
    <!--    </div>-->
    <div class="m-dangan" style="margin-top:10px; margin-bottom:10px;">
      <div class="line">
        <div class="ibox u-title_color">姓名</div>
        <div class="ibox">{{ userinfo.name }}</div>
        <div class="ibox u-title_color">性别</div>
        <div class="ibox">
          {{ userinfo.sex }}
        </div>
        <div class="ibox u-title_color">生日</div>
        <div class="ibox">
          {{ userinfo.birthday }}
        </div>
      </div>
      <div class="line">
        <div class="ibox u-title_color">学历</div>
        <div class="ibox">{{ userinfo.education }}</div>
        <div class="ibox u-title_color">科室</div>
        <div class="ibox">
<!--          <el-select v-model="userinfo.depart_id" disabled placeholder="请选择科室" clearable class="filter-item" style="width: 120px;margin-right: 10px;">-->
<!--            <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />-->
<!--          </el-select>-->
          <span>{{depart_name}}</span>
        </div>
        <div class="ibox u-title_color">专业</div>
        <div class="ibox">{{ userinfo.major }}</div>
      </div>
      <div class="line">
        <div class="ibox u-title_color">毕业院校</div>
        <div class="ibox">{{ userinfo.graduated_school }}</div>
        <div class="ibox u-title_color">参加工作时间</div>
        <div class="ibox">{{ userinfo.working_time }}</div>
        <div class="ibox u-title_color">联系电话</div>
        <div class="ibox">{{ userinfo.phone }}</div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">职称情况
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx u-title_color">职称</div>
            <div class="bx u-title_color">聘任时间</div>
            <div class="bx bx-3 u-title_color">资格证书编号</div>
          </div>
          <div v-for="(item,index) in userinfo.ProfessionalTitleList" :key="'ProfessionalTitleList'+index" class="right-line">
            <div class="bx">{{ item.name }}</div>
            <div class="bx">{{ item.engage_time }}</div>
            <div class="bx bx-3">{{ item.certificate_number }}</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          进修（外出学习）情况
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2 u-title_color">进修时间（年/月-年/月）</div>
            <div class="bx u-title_color">进修医院名称</div>
            <div class="bx bx-2 u-title_color">进修专业</div>
            <div class="bx u-title_color">进修照片</div>
          </div>
          <div v-for="(item, index) in userinfo.StudyTableList" :key="'StudyTableList'+index" class="right-line">
            <div class="bx bx-2">{{ item.study_time }}</div>
            <div class="bx">{{ item.study_hospital }}</div>
            <div class="bx bx-2">{{ item.study_major }}</div>
            <div class="bx">
              <span v-show="item.study_certificate_pic.length===0">未上传</span>
              <a v-show="item.study_certificate_pic.length>0" class="a-jump" :href="item.study_certificate_pic" target="_blank">查看图片</a>
            </div>
          </div>
          <div class="right-line">
            <div class="bx bx-2 u-title_color">外出学习时间（年/月/日)</div>
            <div class="bx u-title_color">地点</div>
            <div class="bx bx-4 u-title_color">学习会议名称</div>
          </div>
          <div v-for="(item, index) in userinfo.OutTableList" :key="'OutTableList'+index" class="right-line">
            <div class="bx bx-2">{{ item.out_study_time }}</div>
            <div class="bx">{{ item.out_study_place }}</div>
            <div class="bx bx-4">{{ item.out_study_meeting }}</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          科研项目
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx u-title_color">立项时间</div>
            <div class="bx u-title_color">立项类型</div>
            <div class="bx bx-3 u-title_color">题目</div>
          </div>
          <div v-for="(item,index) in userinfo.ResearchProjectList" :key="'ResearchProjectList'+index" class="right-line">
            <div class="bx">{{ item.start_time }}</div>
            <div class="bx">{{ item.start_type }}</div>
            <div class="bx bx-3">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          科研获奖
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx u-title_color">获奖年度</div>
            <div class="bx u-title_color">获奖级别</div>
            <div class="bx bx-2 u-title_color">获奖项目名称</div>
            <div class="bx bx-2 u-title_color">获奖证书</div>
          </div>
          <div v-for="(item, index) in userinfo.ResearchAwardList" :key="'ResearchAwardList'+index" class="right-line">
            <div class="bx">{{ item.award_time }}</div>
            <div class="bx">{{ item.award_rank }}</div>
            <div class="bx bx-2">{{ item.award_name }}</div>
            <div class="bx bx-2">
              <span v-show="item.award_certificate_pic.length===0">未上传</span>
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
            </div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          科研论文
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2 u-title_color">发表时间（X年X月）</div>
            <div class="bx u-title_color">期刊名称</div>
            <div class="bx bx-2 u-title_color">项目名称</div>
            <div class="bx u-title_color">级别</div>
          </div>
          <div v-for="(item,index) in userinfo.ResearchPapersList" :key="'ResearchPapersList'+index" class="right-line">
            <div class="bx bx-2">{{ item.publication_time }}</div>
            <div class="bx">{{ item.journal_name }}</div>
            <div class="bx bx-2">{{ item.project_name }}</div>
            <div class="bx">
              {{ item.project_rank }}
              <!--              <input v-model="item.project_rank" class="input-text-box" type="text">-->
            </div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          获取专利情况
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2 u-title_color">年度</div>
            <div class="bx u-title_color">类别</div>
            <div class="bx bx-2 u-title_color">项目名称</div>
            <div class="bx u-title_color">证书</div>
          </div>
          <div v-for="(item,index) in userinfo.ObtainPatentsList" :key="'ObtainPatentsList'+index" class="right-line">
            <div class="bx bx-2">{{ item.get_time }}</div>
            <div class="bx">
              {{ item.type }}
              <!--              <input v-model="item.project_rank" class="input-text-box" type="text">-->
            </div>
            <div class="bx bx-2">{{ item.name }}</div>
            <div class="bx">
              <span v-show="item.patents_certificate_pic.length===0">未上传</span>
              <a v-show="item.patents_certificate_pic.length>0" class="a-jump" :href="item.patents_certificate_pic" target="_blank">查看图片</a>
            </div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">
          新技术开展情况
        </div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2 u-title_color">获准开展时间</div>
            <div class="bx u-title_color">转常规开展时间</div>
            <div class="bx bx-4 u-title_color">项目名称</div>
          </div>
          <div v-for="(item,index) in userinfo.NewTechResearchList" :key="'NewTechResearchList'+index" class="right-line">
            <div class="bx bx-2">{{ item.approved_time }}</div>
            <div class="bx">{{ item.to_nomal_time }}</div>
            <div class="bx bx-4">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">新技术获奖</div>
        <div class="zuoyou-right">
          <div class="right-line">
            <div class="bx bx-2 u-title_color">获奖时间</div>
            <div class="bx u-title_color">获奖级别</div>
            <div class="bx bx-2 u-title_color">获奖项目名称</div>
            <div class="bx u-title_color">获奖证书</div>
          </div>
          <div v-for="(item, index) in userinfo.NewTechAwardList" :key="'NewTechAwardList'+index" class="right-line">
            <div class="bx bx-2">{{ item.get_year }}</div>
            <div class="bx">{{ item.award_rank }}</div>
            <div class="bx bx-2">{{ item.award_name }}</div>
            <div class="bx">
              <span v-show="item.award_certificate_pic.length===0">未上传</span>
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
            </div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">手术资质
          <div class="border-right-line" />
        </div>
        <div class="zuoyou-right-outbox">
          <div class="zuoyou-right">
            <div v-for="(item, index) in userinfo.shoushuzizhiList" :key="'shoushuzizhiList'+index" class="right-line">
              <div class="bx bx-5 bx-time">
                <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span>
                <span v-show="item.surgical_qualification_1"  class="ckword">一级</span>
                <span v-show="item.surgical_qualification_2"  class="ckword">二级</span>
                <span v-show="item.surgical_qualification_3"  class="ckword">三级</span>
                <span v-show="item.surgical_qualification_4"  class="ckword">四级</span>
                <span v-show="item.other" class="u-otherbox"><span class="u-otherspan">其他:</span><span>{{ item.other }}</span></span>
              </div>
              <div class="bx" style="width: 200px">
                <a v-show="item.surgical_qualification_certificate_pic.length>0" class="a-jump" :href="item.surgical_qualification_certificate_pic" target="_blank">查看图片</a>
                <span v-show="item.surgical_qualification_certificate_pic.length===0">未上传</span>
              </div>
            </div>
          </div></div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left u-title_color">相关授权资质
          <div class="border-right-line" />
        </div>
        <div class="zuoyou-right-outbox">
          <div class="zuoyou-right">
            <div v-for="(item, index) in userinfo.chufang_shouquanList" :key="'chufang_shouquanList'+index" class="right-line">
              <div class="bx bx-5 bx-time">
                <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span>
                <input v-show="false" :id="'youchuangcaozuoshouquan'+index" v-model="item.value" disabled value="youchuangcaozuoshouquan" :name="'youchuangcaozuoshouquan'+index" class="input-fst" type="radio"><label v-show="item.youchuangcaozuoshouquan" :for="'youchuangcaozuoshouquan'+index" class="ckword">有创操作授权</label>
                <input v-show="false" :id="'rijianshoushushouquan'+index" v-model="item.value" disabled value="rijianshoushushouquan" :name="'rijianshoushushouquan'+index" type="radio"><label v-show="item.rijianshoushushouquan" :for="'rijianshoushushouquan'+index" class="ckword">日间手术授权</label>
                <input v-show="false" :id="'mazuishouquan'+index" v-model="item.value" disabled value="mazuishouquan" :name="'mazuishouquan'+index" type="radio"><label v-show="item.mazuishouquan" :for="'mazuishouquan'+index" class="ckword">麻醉授权</label>
                <input v-show="false" :id="'shouquan_other_radio'+index" v-model="item.value" disabled value="other" :name="'other_radio'+index" type="radio">
                <label v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword"><span class="u-otherbox u-otherbox-2">
                  <span>其他:{{ item.other }}</span>
                </span>
                </label>
              </div>
              <div class="bx" style="width: 200px">
                <a v-show="item.shouquanpic.length>0" class="a-jump" :href="item.shouquanpic" target="_blank">查看图片</a>
                <span v-show="item.shouquanpic.length===0">未上传</span>
              </div>
            </div>
          </div></div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left zuoyou-left-chufang u-title_color">
          <span>处方权限</span>
          <div class="border-right-line" />
        </div>
        <div class="zuoyou-right">
          <div v-for="(item, index) in userinfo.chufang_putongchufangquanList" :key="'chufang_putongchufangquanList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span>
            <label class="u-ml5">普通处方权：</label>
            <i v-show="item.putongchufangquan" class="el-icon-check u-icon_right" />
            <i v-show="!item.putongchufangquan" class="el-icon-close u-icon_wrong" />
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_kangjunyaowuList" :key="'chufang_kangjunyaowuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><span class="u-ml5">抗菌药物：</span>
            <span v-show="item.feixianzhi" class="ckword">非限制类</span>
            <span v-show="item.xianzhi" class="ckword">限制类</span>
            <span v-show="item.teshujikangjunyaowu" class="ckword">特殊级抗菌药物</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_kangzhongliuList" :key="'chufang_kangzhongliuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span>
            <span class="u-ml5">抗肿瘤药物：</span>
            <span v-show="item.putongshiyong" class="ckword">普通使用级</span>
            <span v-show="item.xianzhishiyong" class="ckword">限制使用级</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_mazuijingshenList" :key="'chufang_mazuijingshenList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><span class="u-ml5">麻醉精神类：</span>
            <span v-show="item.mazuiyaopin" class="ckword">麻醉药品</span>
            <span v-show="item.diyileijingshenyaopin" class="ckword">第一类精神药品</span>
            <span v-show="item.dierleijingshenyaopin" class="ckword">第二类精神药品</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_pizhijisuleiyaowuList" :key="'chufang_pizhijisuleiyaowuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><span class="u-ml5">皮质激素类药物：</span>
            <span v-show="item.duanzhongcheng" class="ckword">短中程使用糖皮质激素</span>
            <span v-show="item.chongjiliaofachangliaocheng" class="ckword">冲击疗法、长疗程使用糖皮质激素</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_shengwuyuxueyezhijiList" :key="'chufang_shengwuyuxueyezhijiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><label class="u-ml5" >生物与血液制剂：</label>
            <i v-show="item.shengwuyuxueyezhiji" class="el-icon-check u-icon_right" />
            <i v-show="!item.shengwuyuxueyezhiji" class="el-icon-close u-icon_wrong" />
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_changwaiyingyangzhijiList" :key="'chufang_changwaiyingyangzhijiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><label class="u-ml5" >肠外营养制剂：</label>
            <i v-show="item.changwaiyingyangzhiji" class="el-icon-check u-icon_right" />
            <i v-show="!item.changwaiyingyangzhiji" class="el-icon-close u-icon_wrong" />
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_yongxuezizhiList" :key="'chufang_yongxuezizhiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><span class="u-ml5">用血资质：</span>
            <span v-show="item.jizhen" class="ckword">急诊用血</span>
            <span v-show="item.pingzhen" class="ckword">平诊用血</span>
            <span v-show="item.xiaoyu800" class="ckword">用血量&lt;800ml</span>
            <span v-show="item.xiaoyu1600" class="ckword">用血量&lt;1600ml</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div v-for="(item, index) in userinfo.chufang_baogaoqianziquanList" :key="'chufang_baogaoqianziquanList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:<span style="width: 60px;display: inline-block">{{ item.get_year }}</span></span></span><span class="u-ml5">报告签字权：</span>
            <span v-show="item.jianyanbaogao" class="ckword">检验报告</span>
            <span v-show="item.jianchabaogao" class="ckword">检查报告</span>
            <span v-show="item.shuxuejianyanbaogao" class="ckword">输血检验报告</span>
            <span v-show="item.other" :for="'shouquan_other_radio'+index" class="ckword">
              <span class="u-otherbox u-otherbox-2">
                <span>其他:{{ item.other }}</span>
              </span>
            </span>
          </div>
          <div class="u-right-last-line" />
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" style="margin-right: 40px;min-width: 120px;" @click="handleJumpLists">确定</el-button>
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
      depart_name: '',
      fullscreenLoading: false,
      save_img_url: 'http://192.168.214.151/DoctorRecordsServerApp/saveimage/',
      paper_rank: ['一般期刊', '科技核心', '中文核心', '外文', 'SCI'],
      sex: ['男', '女'],
      obtain_select: ['发明专利', '实用新型专利', '外观专利', '软件著作权'],
      userinfo: {
        // 'id': '',
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
        'changwaiyingyangzhiji': false,
        'jizhenyongxue': false,
        'pingzhenyongxue': false,
        'yongxueliangxiaoyu800': false,
        'yongxueliangxiaoyu1600': false,
        'jianyanbaogao': false,
        'jianchabaogao': false,
        'shuxuejianyanbaogao': false,
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
        'StudyTableList': [],
        'shoushuzizhiList': [{
          get_year: '',
          surgical_qualification_1: false,
          surgical_qualification_2: false,
          surgical_qualification_3: false,
          surgical_qualification_4: false,
          other: '',
          surgical_qualification_certificate_pic: ''
        }],
        'chufang_yongxuezizhiList': [{
          get_year: '',
          jizhen: false,
          pingzhen: false,
          xiaoyu800: false,
          xiaoyu1600: false,
          other: ''
        }],
        'chufang_kangjunyaowuList': [{
          get_year: '',
          feixianzhi: false,
          xianzhi: false,
          teshujikangjunyaowu: false,
          other: ''
        }],
        'chufang_kangzhongliuList': [{
          get_year: '',
          putongshiyong: false,
          xianzhishiyong: false,
          other: ''
        }],
        'chufang_mazuijingshenList': [{
          get_year: '',
          mazuiyaopin: false,
          diyileijingshenyaopin: false,
          dierleijingshenyaopin: false,
          other: ''
        }],
        'chufang_changwaiyingyangzhijiList': [{
          get_year: '',
          changwaiyingyangzhiji: false,
          other: ''
        }],
        'chufang_baogaoqianziquanList': [{
          get_year: '',
          jianyanbaogao: false,
          jianchabaogao: false,
          shuxuejianyanbaogao: false,
          other: ''
        }],
        'chufang_pizhijisuleiyaowuList': [{
          get_year: '',
          duanzhongcheng: false,
          chongjiliaofachangliaocheng: false,
          other: ''
        }],
        'chufang_putongchufangquanList': [{
          get_year: '',
          putongchufangquan: false,
          other: ''
        }],
        'chufang_shengwuyuxueyezhijiList': [{
          get_year: '',
          shengwuyuxueyezhiji: false,
          other: ''
        }],
        'chufang_shouquanList': [{
          get_year: '',
          value: 'youchuangcaozuoshouquan',
          youchuangcaozuoshouquan: true,
          rijianshoushushouquan: false,
          mazuishouquan: false,
          shouquanpic: '',
          other: ''
        }]
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
    getDepartName() {
      const that = this
      this.depart.forEach(function(val, key) {
        if (val.id === that.userinfo.depart_id) {
          that.depart_name = val.title
        }
      })
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
    handleAfterGetDate() {
      this.userinfo['chufang_shouquanList'].forEach(function(value, key) {
        value.value = ''
        if (value.mazuishouquan) {
          value.value = 'mazuishouquan'
        } else if (value.rijianshoushushouquan) {
          value.value = 'rijianshoushushouquan'
        } else if (value.youchuangcaozuoshouquan) {
          value.value = 'youchuangcaozuoshouquan'
        } else {
          value.value = 'other'
        }
      })
    },
    fetchData() {
      console.log('this.$route.params', this.$route.params)
      this.listLoading = true
      this.fullscreenLoading = true
      getDepartList({
        search: '',
        search_type: 'title',
        pageStart: 0,
        pagesize: 100
      }).then(response => {
        if (response.data[0] && response.data[0].account === 'admin') {
          this.depart = response.data.slice(1)
        } else {
          this.depart = response.data
        }
        console.log('getDepartList response', response)
        getUserDetails({
          id: this.$route.params.id
        }).then(response => {
          this.fullscreenLoading = false
          this.userinfo = response.data
          this.handleAfterGetDate()
          this.getDepartName()
        })
        this.listLoading = false
      })
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

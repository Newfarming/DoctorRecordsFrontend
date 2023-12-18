<template>
  <div class="m-activity_details">
    <!--    <div>-->
    <!--      <span style="margin-right: 10px;">请选择科室:</span>-->
    <!--      <el-select v-model="userinfo.depart_id" placeholder="请选择科室" clearable class="filter-item" style="width: 120px;margin-right: 10px;">-->
    <!--        <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />-->
    <!--      </el-select>-->
    <!--    </div>-->
    <div class="m-dangan m-dangan-edit-add" style="margin-top:10px; margin-bottom:10px;">
      <div class="line">
        <div class="ibox">姓名</div>
        <div class="ibox"><input v-model="userinfo.name" class="input-text-box" type="text"></div>
        <div class="ibox">性别</div>
        <div class="ibox">
          <el-select v-model="userinfo.sex" placeholder="请选择性别" class="filter-item" style="width: 120px;">
            <el-option v-for="(item,index) in sex" :key="'sex' + index" :label="item" :value="item" />
          </el-select>
          <!--          <el-select v-model="userinfo.depart_id" placeholder="请选择科室" clearable class="filter-item" style="width: 120px;margin-right: 10px;">-->
          <!--            <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />-->
          <!--          </el-select>-->
        </div>
        <div class="ibox">生日</div>
        <div class="ibox">
          <input v-model="userinfo.birthday" class="input-text-box" type="date">
        </div>
      </div>
      <div class="line">
        <div class="ibox">学历</div>
        <div class="ibox"><input v-model="userinfo.education" class="input-text-box" type="text"> </div>
        <div class="ibox">科室</div>
        <div class="ibox">
          <el-select v-model="userinfo.depart_id" placeholder="请选择科室" class="filter-item" style="width: 120px;">
            <el-option v-for="item in depart" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </div>
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
          <div v-for="(item,index) in userinfo.ProfessionalTitleList" :key="'ProfessionalTitleList' + index" class="right-line">
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
          <div v-for="(item, index) in userinfo.StudyTableList" :key="'StudyTableList' + index" class="right-line">
            <div class="bx bx-2"><input v-model="item.study_time" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.study_hospital" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.study_major" class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.study_certificate_pic.length>0" class="a-jump" :href="item.study_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.study_certificate_pic.length===0"
                class="upload-demo"
                action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"

                :on-success="uploadImgSuccess(item,'study_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.study_certificate_pic.length===0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.StudyTableList, index)">删除</div>
          </div>
          <div class="right-line">
            <div class="bx bx-2">外出学习时间（年/月/日)</div>
            <div class="bx">地点</div>
            <div class="bx bx-4">学习会议名称</div>
          </div>
          <div v-for="(item, index) in userinfo.OutTableList" :key="'OutTableList' + index" class="right-line">
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
          <div v-for="(item,index) in userinfo.ResearchProjectList" :key="'ResearchProjectList' + index" class="right-line">
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
          <div v-for="(item, index) in userinfo.ResearchAwardList" :key="'ResearchAwardList' + index" class="right-line">
            <div class="bx"><input v-model="item.award_time" class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.award_rank" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.award_name" class="input-text-box" type="text"></div>
            <div class="bx bx-2">
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.award_certificate_pic.length===0"
                class="upload-demo"
                action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'award_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.award_certificate_pic.length===0" size="small" type="primary">点击上传</el-button>
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
            <div class="bx bx-2">发表时间</div>
            <div class="bx">期刊名称</div>
            <div class="bx bx-2">项目名称</div>
            <div class="bx">级别</div>
          </div>
          <div v-for="(item,index) in userinfo.ResearchPapersList" :key="'ResearchPapersList' + index" class="right-line">
            <div class="bx bx-2"><input v-model="item.publication_time" class="input-text-box" type="date"></div>
            <div class="bx"><input v-model="item.journal_name" class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.project_name" class="input-text-box" type="text"></div>
            <div class="bx">
              <el-select v-model="item.project_rank" placeholder="请选择级别" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
                <el-option v-for="(item,index) in paper_rank" :key="'paper_rank' + index" :label="item" :value="item" />
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
          <div v-for="(item,index) in userinfo.ObtainPatentsList" :key="'ObtainPatentsList' + index" class="right-line">
            <div class="bx bx-2"><input v-model="item.get_time" class="input-text-box" type="text"></div>
            <div class="bx">
              <el-select v-model="item.type" placeholder="请选择类别" clearable class="filter-item" style="width: 120px;margin-right: 10px;">
                <el-option v-for="(item,index) in obtain_select" :key="'obtain_select' + index" :label="item" :value="item" />
              </el-select>
              <!--              <input v-model="item.project_rank" class="input-text-box" type="text">-->
            </div>
            <div class="bx bx-2"><input v-model="item.name" class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.patents_certificate_pic.length>0" class="a-jump" :href="item.patents_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.patents_certificate_pic.length===0"
                class="upload-demo"
                action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'patents_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.patents_certificate_pic.length===0" size="small" type="primary">点击上传</el-button>
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
          <div v-for="(item,index) in userinfo.NewTechResearchList" :key="'NewTechResearchList'+index" class="right-line">
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
          <div v-for="(item, index) in userinfo.NewTechAwardList" :key="'NewTechAwardList'+index" class="right-line">
            <div class="bx bx-2"><input v-model="item.get_year " class="input-text-box" type="text"></div>
            <div class="bx"><input v-model="item.award_rank " class="input-text-box" type="text"></div>
            <div class="bx bx-2"><input v-model="item.award_name " class="input-text-box" type="text"></div>
            <div class="bx">
              <a v-show="item.award_certificate_pic.length>0" class="a-jump" :href="item.award_certificate_pic" target="_blank">查看图片</a>
              <el-upload
                v-show="item.award_certificate_pic.length===0"
                class="upload-demo"
                action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadImgSuccess(item,'award_certificate_pic')"
                :show-file-list="false"
              >
                <el-button v-show="item.award_certificate_pic.length===0" size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="delete" @click="removeList(userinfo.NewTechAwardList, index)">删除</div>
          </div>
        </div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">手术资质
          <div class="add" @click="addlist(userinfo.shoushuzizhiList,{get_year:'',surgical_qualification_1:false,surgical_qualification_2:false,surgical_qualification_3:false,surgical_qualification_4:false,surgical_qualification_certificate_pic:''})">添加</div>
          <div class="border-right-line" />
        </div>
        <div class="zuoyou-right-outbox">
          <div class="zuoyou-right">
            <div v-for="(item, index) in userinfo.shoushuzizhiList" :key="'shoushuzizhiList'+index" class="right-line">
              <div class="bx bx-5 bx-time">
                <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
                <input :id="'shoushu1'+index" v-model="item.surgical_qualification_1" class="input-fst" type="checkbox" value="一级"><label :for="'shoushu1'+index" class="ckword">一级</label>
                <input :id="'shoushu2'+index" v-model="item.surgical_qualification_2" type="checkbox" value="二级"><label :for="'shoushu2'+index" class="ckword">二级</label>
                <input :id="'shoushu3'+index" v-model="item.surgical_qualification_3" type="checkbox" value="三级"><label :for="'shoushu3'+index" class="ckword">三级</label>
                <input :id="'shoushu4'+index" v-model="item.surgical_qualification_4" type="checkbox" value="四级"><label :for="'shoushu4'+index" class="ckword">四级</label>
                <span class="u-otherbox"><span class="u-otherspan">其他:</span><input type="text" class="u-otherinput" style="width: 180px;"></span>
              </div>
              <div class="bx" style="width: 200px">
                <a v-show="item.surgical_qualification_certificate_pic.length>0" class="a-jump" :href="item.surgical_qualification_certificate_pic" target="_blank">查看图片</a>
                <el-upload
                  v-show="item.surgical_qualification_certificate_pic.length===0"
                  class="upload-demo"
                  action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-success="uploadImgSuccess(item,'surgical_qualification_certificate_pic')"
                  :show-file-list="false"
                >
                  <el-button v-show="item.surgical_qualification_certificate_pic.length===0" size="small" type="primary">上传授权表</el-button>
                </el-upload>
                <div class="delete delete-2" @click="removeList(userinfo.shoushuzizhiList, index)">删除</div>
              </div>
            </div>
          </div></div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left">相关授权资质
          <div
            class="add"
            @click="addlist(userinfo.chufang_shouquanList,{get_year: '',
                                                           value:'youchuangcaozuoshouquan',
                                                           youchuangcaozuoshouquan: true,
                                                           rijianshoushushouquan: false,
                                                           mazuishouquan: false,
                                                           shouquanpic: '',
                                                           other: ''})"
          >添加</div>
          <div class="border-right-line" />
        </div>
        <div class="zuoyou-right-outbox">
          <div class="zuoyou-right">
            <div v-for="(item, index) in userinfo.chufang_shouquanList" :key="'chufang_shouquanList'+index" class="right-line">
              <div class="bx bx-5 bx-time">
                <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
                <input :id="'youchuangcaozuoshouquan'+index" v-model="item.value" value="youchuangcaozuoshouquan" :name="'youchuangcaozuoshouquan'+index" class="input-fst" type="radio"><label :for="'youchuangcaozuoshouquan'+index" class="ckword">有创操作授权</label>
                <input :id="'rijianshoushushouquan'+index" v-model="item.value" value="rijianshoushushouquan" :name="'rijianshoushushouquan'+index" type="radio"><label :for="'rijianshoushushouquan'+index" class="ckword">日间手术授权</label>
                <input :id="'mazuishouquan'+index" v-model="item.value" value="mazuishouquan" :name="'mazuishouquan'+index" type="radio"><label :for="'mazuishouquan'+index" class="ckword">麻醉授权</label>
                <input :id="'shouquan_other_radio'+index" v-model="item.value" value="other" :name="'other_radio'+index" type="radio">
                <label :for="'shouquan_other_radio'+index" class="ckword"><span class="u-otherbox u-otherbox-2">
                  <span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput u-otherinput-3" @click="otherRadioClick(item)">
                </span>
                </label>
              </div>
              <div class="bx" style="width: 200px">
                <a v-show="item.shouquanpic.length>0" class="a-jump" :href="item.shouquanpic" target="_blank">查看图片</a>
                <el-upload
                  v-show="item.shouquanpic.length===0"
                  class="upload-demo"
                  action="http://192.168.214.151/DoctorRecordsServerApp/saveimage/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-success="uploadImgSuccess(item,'shouquanpic')"
                  :show-file-list="false"
                >
                  <el-button v-show="item.shouquanpic.length===0" size="small" type="primary">上传授权表</el-button>
                </el-upload>
                <div class="delete delete-2" @click="removeList(userinfo.shoushuzizhiList, index)">删除</div>
              </div>
            </div>
          </div></div>
      </div>
      <div class="zuoyou clearfix">
        <div class="zuoyou-left zuoyou-left-chufang">
          <span>处方权限</span>
          <div
            class="add"
            @click="addlist(userinfo.chufang_putongchufangquanList,
                            {get_year: '',
                             putongchufangquan: false,
                             other: ''})"
          >
            添加普通处方权</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_kangjunyaowuList,
                            {get_year: '',
                             feixianzhi: false,
                             xianzhi: false,
                             teshujikangjunyaowu: false,
                             other: ''})"
          >添加抗菌药物</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_kangzhongliuList,
                            {get_year: '',
                             putongshiyong: false,
                             xianzhishiyong: false,
                             other: ''})"
          >添加抗肿瘤药物</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_mazuijingshenList,
                            {get_year: '',
                             mazuiyaopin: false,
                             diyileijingshenyaopin: false,
                             dierleijingshenyaopin: false,
                             other: ''})"
          >添加麻醉精神类</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_pizhijisuleiyaowuList,
                            {get_year: '',
                             duanzhongcheng: false,
                             chongjiliaofachangliaocheng: false,
                             other: ''})"
          >添加皮质激素类药物</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_shengwuyuxueyezhijiList,
                            {get_year: '',
                             shengwuyuxueyezhiji: false,
                             other: ''})"
          >添加生物与血液制剂</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_changwaiyingyangzhijiList,
                            {get_year: '',
                             changwaiyingyangzhiji: false,
                             other: ''})"
          >添加肠外营养制剂</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_yongxuezizhiList,
                            {get_year: '',
                             jizhen: false,
                             pingzhen: false,
                             xiaoyu800: false,
                             xiaoyu1600: false,
                             other: ''})"
          >添加用血资质</div>
          <div
            class="add"
            @click="addlist(userinfo.chufang_baogaoqianziquanList,
                            {get_year: '',
                             jianyanbaogao: false,
                             jianchabaogao: false,
                             shuxuejianyanbaogao: false,
                             other: ''})"
          >添加报告签字权</div>
          <div class="border-right-line-long" />
        </div>
        <div class="zuoyou-right">
          <div v-for="(item, index) in userinfo.chufang_putongchufangquanList" :key="'chufang_putongchufangquanList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <label class="u-ml5" :for="'putongchufang'+index" value="prescription_normal">普通处方权：</label>
            <input :id="'putongchufang'+index" v-model="item.putongchufangquan" type="checkbox">
            <span class="u-otherbox u-ml200"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput u-otherinput-4"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_putongchufangquanList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_kangjunyaowuList" :key="'chufang_kangjunyaowuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">抗菌药物：</span>
            <input :id="'kangjunfeixianzhi'+index" v-model="item.feixianzhi" type="checkbox"><label :for="'kangjunfeixianzhi'+index" class="ckword">非限制类</label>
            <input :id="'kangjunxianzhi'+index" v-model="item.xianzhi" type="checkbox"><label class="ckword" :for="'kangjunxianzhi'+index">限制类</label>
            <input :id="'kangjunteshu'+index" v-model="item.teshujikangjunyaowu" type="checkbox"><label class="ckword" :for="'kangjunteshu'+index">特殊级抗菌药物</label>
            <span class="u-otherbox"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_kangjunyaowuList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_kangzhongliuList" :key="'chufang_kangzhongliuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">抗肿瘤药物：</span>
            <input :id="'putongshiyong'+index" v-model="item.putongshiyong" type="checkbox"><label class="ckword" :for="'putongshiyong'+index">普通使用级</label>
            <input :id="'xianzhishiyong'+index" v-model="item.xianzhishiyong" type="checkbox"><label class="ckword" :for="'xianzhishiyong'+index">限制使用级</label>
            <span class="u-otherbox"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_kangzhongliuList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_mazuijingshenList" :key="'chufang_mazuijingshenList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">麻醉精神类：</span>
            <input :id="'mazuilei'+index" v-model="item.mazuiyaopin" type="checkbox"><label class="ckword" :for="'mazuilei'+index">麻醉药品</label>
            <input :id="'jingshenyi'+index" v-model="item.diyileijingshenyaopin" type="checkbox"><label class="ckword" :for="'jingshenyi'+index">第一类精神药品</label>
            <input :id="'jingshener'+index" v-model="item.dierleijingshenyaopin" type="checkbox"><label class="ckword" :for="'jingshener'+index">第二类精神药品</label>
            <span class="u-otherbox"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_mazuijingshenList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_pizhijisuleiyaowuList" :key="'chufang_pizhijisuleiyaowuList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">皮质激素类药物：</span>
            <input :id="'duanzhongcheng'+index" v-model="item.duanzhongcheng" type="checkbox"><label class="ckword" :for="'duanzhongcheng'+index">短中程使用糖皮质激素</label>
            <input :id="'changqi'+index" v-model="item.chongjiliaofachangliaocheng" type="checkbox"><label class="ckword" :for="'changqi'+index">冲击疗法、长疗程使用糖皮质激素 </label>
            <span class="u-otherbox u-otherbox-2"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput u-otherinput-2"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_pizhijisuleiyaowuList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_shengwuyuxueyezhijiList" :key="'chufang_shengwuyuxueyezhijiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <label class="u-ml5" :for="'shengwuxueye'+index">生物与血液制剂：</label>
            <input :id="'shengwuxueye'+index" v-model="item.shengwuyuxueyezhiji" type="checkbox">
            <span class="u-otherbox u-ml200"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput u-otherinput-4"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_shengwuyuxueyezhijiList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_changwaiyingyangzhijiList" :key="'chufang_changwaiyingyangzhijiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <label class="u-ml5" :for="'changwaiyinyang'+index">肠外营养制剂：</label>
            <input :id="'changwaiyinyang'+index" v-model="item.changwaiyingyangzhiji" type="checkbox">
            <span class="u-otherbox u-ml200"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput u-otherinput-4"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_changwaiyingyangzhijiList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_yongxuezizhiList" :key="'chufang_yongxuezizhiList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">用血资质：</span>
            <input :id="'jizhen'+index" v-model="item.jizhen" type="checkbox"><label class="ckword" :for="'jizhen'+index">急诊用血</label>
            <input :id="'pingzhen'+index" v-model="item.pingzhen" type="checkbox"><label class="ckword" :for="'pingzhen'+index">平诊用血</label>
            <input :id="'xiaoyu800'+index" v-model="item.xiaoyu800" type="checkbox"><label class="ckword" :for="'xiaoyu800'+index">用血量&lt;800ml</label>
            <input :id="'xiaoyu1600'+index" v-model="item.xiaoyu1600" type="checkbox"><label class="ckword" :for="'xiaoyu1600'+index">用血量&lt;1600ml</label>
            <span class="u-otherbox"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_yongxuezizhiList, index)">删除</div>
          </div>
          <div v-for="(item, index) in userinfo.chufang_baogaoqianziquanList" :key="'chufang_baogaoqianziquanList'+index" class="right-line oneline">
            <span class="u-timebox"><span class="u-timespan">年份:</span><input v-model="item.get_year" type="text" class="u-timeinput"></span>
            <span class="u-ml5">报告签字权：</span>
            <input :id="'jianyanbaogao'+index" v-model="item.jianyanbaogao" type="checkbox"><label class="ckword" :for="'jianyanbaogao'+index">检验报告</label>
            <input :id="'jianchabaogao'+index" v-model="item.jianchabaogao" type="checkbox"><label class="ckword" :for="'jianchabaogao'+index">检查报告</label>
            <input :id="'shuxuejianyanbaogao'+index" v-model="item.shuxuejianyanbaogao" type="checkbox"><label class="ckword" :for="'shuxuejianyanbaogao'+index">输血检验报告</label>
            <span class="u-otherbox"><span class="u-otherspan">其他:</span><input v-model="item.other" type="text" class="u-otherinput"></span>
            <div class="delete delete-2" @click="removeList(userinfo.chufang_baogaoqianziquanList, index)">删除</div>
          </div>
          <div class="u-right-last-line" />
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" style="margin-right: 40px;min-width: 120px;" @click="handleAddUser">确定</el-button>
      <el-button type="info" style="min-width: 120px;" @click="handleJumpLists">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getDepartList } from '@/api/table'
import { userAdd, userEdit } from '@/api/user'

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
      fullscreenLoading: false,
      save_img_url: 'http://192.168.214.151/DoctorRecordsServerApp/saveimage/',
      sex: ['男', '女'],
      paper_rank: ['一般期刊', '科技核心', '中文核心', '外文', 'SCI'],
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
    testmouseup(item) {
      console.log('item', item)
    },
    otherRadioClick(item) {
      item.value = 'other'
    },
    shouquanFocus(item, chooseAttr) {
      item['youchuangcaozuoshouquan'] = false
      item['rijianshoushushouquan'] = false
      item['mazuishouquan'] = false
      item[chooseAttr] = !item[chooseAttr]
      // item[chooseAttr] = true
      console.log('chooseAttr', chooseAttr)
      if (chooseAttr !== 'other') {
        item['other'] = ''
      }
      console.log('item', item)
    },
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
        if (response.data[0] && response.data[0].account === 'admin') {
          this.depart = response.data.slice(1)
        } else {
          this.depart = response.data
        }
        console.log('getDepartList response', response)
        this.listLoading = false
      })
      // getUserDetails({
      //   id: this.$route.params.id
      // }).then(response => {
      //   console.log('user details info response', response)
      //   this.userinfo = response.data
      //   this.userinfo.surgical_qualification = response.data.surgical_qualification.split(',')
      //   console.log('response.data', response.data)
      // })
    },
    testinput() {
      console.log('input', this.userinfo.professionalTitleList)
    },
    handdleBeforeRequest() {
      this.userinfo['chufang_shouquanList'].forEach(function(value, key) {
        value.mazuishouquan = false
        value.rijianshoushushouquan = false
        value.youchuangcaozuoshouquan = false
        if (value.value !== 'other') {
          value[value.value] = true
        }
      })
      // this.userinfo['chufang_shouquanList'][this.userinfo['chufang_shouquanList']['value']]=true
      this.deleteRadio(this.userinfo, 'chufang_shouquanList', 'other_radio')
      this.deleteRadio(this.userinfo, 'chufang_shouquanList', 'value')
    },
    userAdd() {
      if (this.userinfo.depart_id === '') {
        alert('请选择科室')
        return
      }
      if (this.userinfo.birthday === '') {
        alert('请填写生日')
        return
      }
      if (this.userinfo.working_time === '') {
        alert('请填写参加工作时间')
        return
      }
      let tempDel = true
      this.userinfo.ProfessionalTitleList.forEach(function(item, index) {
        if (item.engage_time === '') {
          alert('请填写聘任时间')
          tempDel = false
          return false
        }
      })
      this.userinfo.OutTableList.forEach(function(item, index) {
        if (item.study_time === '') {
          alert('请填写外出学习时间')
          tempDel = false
          return false
        }
      })
      this.userinfo.ResearchPapersList.forEach(function(item, index) {
        if (item.publication_time === '') {
          alert('请填写论文发表时间')
          tempDel = false
          return false
        }
      })
      this.userinfo.NewTechResearchList.forEach(function(item, index) {
        if (item.approved_time === '') {
          alert('请填写获准开展时间')
          tempDel = false
          return false
        }
        if (item.to_nomal_time === '') {
          alert('请填写转常规开展时间')
          tempDel = false
          return false
        }
      })
      if (tempDel === false) {
        return
      }
      // this.userinfo.surgical_qualification = this.userinfo.surgical_qualification.join(',')
      this.handdleBeforeRequest()
      this.fullscreenLoading = true
      console.log('this.userinfo', this.userinfo)
      userAdd(this.userinfo).then(response => {
        this.fullscreenLoading = false
        if (response.data === 'success') {
          this.$router.push('/user/user-list/')
        }
      })
    },
    deleteRadio(obj, attr, name) {
      obj[attr].forEach(function(item, key) {
        delete item[name]
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

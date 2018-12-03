<style lang="less">
    @import '../../../styles/common.less';
    @import './add.less';
</style>
<template>
    <div>
        <h1>{{titile1}}</h1>

        <Card>
            <p slot="title">
                <Icon type="paper-airplane"></Icon>
            {{titile2}}
            </p>
            <Row class="padding-left-20" style="margin-left:25%;">
                <p class="margin-top-10 ">
                    <Icon type="clock"></Icon>&nbsp;&nbsp;任务名：
                    <Input :readonly="otherAble" v-model="name" placeholder="必须与实际的程序dll文件名一致！！" style="width: 200px"/>
                </p>
                <p class="margin-top-10">
                    <Icon type="grid"></Icon>&nbsp;&nbsp;组&nbsp;&nbsp;&nbsp; 别：
                    <Select  :disabled="otherAble" size="small" style="width:90px"  placeholder="请选择" v-model="selectedCategory.Name"  @on-change="categoryChange">
                        <Option :value="selectedCategory.Name" :key="selectedCategory.Id" selected >{{selectedCategory.Name}}</Option>
                        <Option v-for="item in categoryList" v-model="item.Name">{{ item.Name }}</Option>
                    </Select>
                </p>
                <p class="margin-top-10">
                    <Icon type="person"></Icon>&nbsp;&nbsp;创建人：
                    <Input v-model="user" :readonly="true"  style="width: 100px"/>
                </p>
                <p class="margin-top-10">
                    <Icon type="monitor"></Icon>&nbsp;&nbsp;节&nbsp;&nbsp;&nbsp; 点：
                    <Select  :disabled="nodeSelectAble" size="small" style="width:90px" v-model="selectedNode.Name"  @on-change="nodeChange" >
                        <Option :value="selectedNode.Name" :key="selectedNode.Id" selected >{{selectedNode.Name}}</Option>
                        <Option v-for="item in nodeList"v-model="item.Name">{{ item.Name }}</Option>
                    </Select>
                </p>
                <p class="margin-top-10">
                    <Icon type="gear-b"></Icon>
                    任务配置Json：<br/>
                    <Input :readonly="otherAble" v-model="dataJson" style="width:50%" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入任务配置Json字符串"/>
                </p>
                <p class="margin-top-10 ">
                    <Icon type="calendar"></Icon>
                    Cron表达式：
                    <Input :readonly="otherAble" v-model="cron" placeholder="0 0 0 * * ?" style="width: 200px"/>
                    <a @click="cronDemo">示例</a>
                </p>
                <p class="margin-top-10 ">
                    <Icon type="toggle"></Icon>
                    是否单次任务：
                    <i-switch :disabled="otherAble" size="large" v-model="single" ></i-switch>
                </p>
                <p class="margin-top-10">
                    <Icon type="navicon"></Icon>&nbsp;&nbsp;版&nbsp;&nbsp;&nbsp; 本：
                    <InputNumber :min="1" :max="10" v-model="version"  style="width: 100px"/>
                </p>
                <div class="margin-top-10">
                    <Icon type="folder"></Icon>
                     上传文件：
                    <Upload style="width:50%;" :multiple="true" :show-upload-list="true"
                            type="drag" :format="['rar','zip','dll']" :max-size="2048" action="//jsonplaceholder.typicode.com/posts/"
                            :on-success="handleSuccess":before-upload="handleBeforeUpload" :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize">
                        <div style="padding: 20px 0;height: 100px;">
                            <Icon  type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>

                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </Upload>
                </div>
                <p class="margin-top-10">
                    <Icon type="information-circled"></Icon>&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp; 注：<br/>
                    <Input v-model="remark" style="width:50%" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入任务备注"/>
                </p>
            </Row>
            <Row class="margin-top-20 publish-button-con " >
                <div style="margin-right:48%;">
                <span class="publish-button" ><Button @click="handleCancel">取消
                </Button>
                </span>
                <span class="publish-button" style="margin-right:40px;"><Button :disabled="otherAble" @click="handlePublish" :loading="publishLoading" icon="ios-checkmark"
                                                     style="width:90px;" type="primary">发布
                </Button>
                </span>

                </div>
            </Row>

        </Card>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import qs from 'qs';
    var _this;
    export default {
        name: 'addJob',
        data () {
            return {
                job:null,
                name:"",
                cron:'',
                dataJson:'',
                version:1,
                single:true,
                categoryId:0,
                nodeId:0,
                user: Cookies.get('user'),
                remark:'',
                categoryList:[],
                nodeList:[],
                publishLoading: false,
                uploadList: [],
                userId:Cookies.get('userid'),
                nodeSelectAble:false,
                selectedNode:{Id:0,Name:""},//默认选中节点
                selectedCategory:{Id:0,Name:""},//默认选中节点
                queryState:0,
                titile1:"新增任务",
                titile2:"add.job",
                otherAble:false,
            };
        },
        methods: {
            handleBeforeUpload(file) {
                    _this.uploadList.push(file)
            },
            handleRemove(file) {
                this.uploadList.splice(this.uploadList.indexOf(file), 1)
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                })
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                })
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = 'http://127.0.0.1:8001/upload';
                file.name = 'job1';
            },
            cronDemo(){
                window.open("http://www.pdtools.net/tools/becron.jsp");
            },
            categoryChange(ele){
                for (var i=0;i<_this.categoryList.length;i++)
                {
                    if(_this.categoryList[i].Name===ele)
                    {
                        _this.categoryId=_this.categoryList[i].Id;
                        break;
                    }
                }

            },
            nodeChange(ele){
                for (var i=0;i<_this.nodeList.length;i++)
                {
                    if(_this.nodeList[i].Name===ele)
                    {
                        _this.nodeId=_this.nodeList[i].Id;
                        break;
                    }
                }
            },
            handleCancel(){
                _this.$router.push({name: 'jobs'});
            },
            handlePublish(){

                var formData = new FormData();
                var jobid=0;
                if(_this.job!=null)
                {
                    jobid= _this.job.Id;
                }
                var datajson="";
                if(_this.dataJson!=null){
                    datajson=_this.dataJson;
                }
                // if(_this.uploadList.length==0)
                // {
                //     _this.$Message.info({
                //         render: h => {
                //             return h('span', [
                //                 '请上传程序文件！ ',
                //                 h('a', ''),
                //                 ' '
                //             ])
                //         }
                //     });
                //     return;
                // }
                formData.append( 'id',jobid)
                if(_this.uploadList.length>0)
                    formData.append("uploadfile",_this.uploadList[0])
                formData.append( 'name', _this.name)
                formData.append( 'single',_this.single)
                formData.append('datamap',datajson)
                formData.append('nodeid',_this.nodeId)
                formData.append('categoryid',_this.categoryId)
                formData.append('userid', _this.userId)
                formData.append( 'version',_this.version)
                formData.append( 'cron',_this.cron)
                formData.append('remark',_this.remark)
                formData.append ('state',false)

                //queryState 0-新增 1-查看 2-修改
                if( _this.queryState===0)
                {
                    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                    axios.post('/job',formData).then(function (response) {
                        console.log(response.data.msg);
                        _this.$Message.info({
                            render: h => {
                                return h('span', [
                                    '任务创建成功！ ',
                                    h('a', ''),
                                    ' '
                                ])
                            }
                        });
                        _this.$router.push({name: 'jobs'});
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
                if(_this.queryState==2)
                {
                    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                    axios.post('/job',formData).then(function (response) {
                        //console.log(response.data.msg);
                        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                        axios.post('/command',qs.stringify({'jobid':jobid,'commandtype':0})).then(function (response) {
                        }).catch(function (error) {
                            _this.$Message.error({
                                render: h => {
                                    return h('span', [
                                        error,
                                        h('a', ''),
                                        ' '
                                    ])
                                }
                            });
                        });
                        _this.$Message.info({
                            render: h => {
                                return h('span', [
                                    '任务修改成功！ ',
                                    h('a', ''),
                                    ' '
                                ])
                            }
                        });
                        _this.$router.push({name: 'jobs'});
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            },
            getcategoryList () {
                axios.get('/categorys').then(function (response) {
                    _this.categoryList = response.data.msg;
                    if(_this.categoryId!==0){
                        for (var i=0;i< _this.categoryList.length;i++) {
                            if(_this.categoryList[i].Id===_this.categoryId){
                                _this.selectedCategory={Id: _this.categoryId,Name:_this.categoryList[i].Name}
                                break;
                            }
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getnodeList () {
                axios.get('/nodes').then(function (response) {
                    _this.nodeList = response.data.msg;
                    if(_this.nodeId!==0){
                        for (var i=0;i< _this.nodeList.length;i++) {
                            if(_this.nodeList[i].Id===_this.nodeId){
                                _this.selectedNode={Id: _this.nodeId,Name:_this.nodeList[i].Name}
                                break;
                            }
                        }
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            getParams () {
                // 取到路由带过来的参数
                let routerParams = _this.$route.params.job;
                // 将数据放在当前组件的数据内
                _this.job = routerParams;
                _this.queryState= _this.$route.params.queryState;
            },
            initJob(){
                if( _this.queryState===1){
                    _this.titile1="任务详情";
                    _this.titile2="query.job";
                    if(_this.job!==null){
                        _this.name=_this.job.Name;
                        _this.cron=_this.job.Cron;
                        _this.dataJson=_this.job.Datamap;
                        _this.version=_this.job.Version;
                        _this.single=_this.job.Single;
                        _this.categoryId=_this.job.CategoryId;

                        _this.nodeId=_this.job.NodeId;

                        _this.remark=_this.job.Remark;
                        _this.nodeSelectAble=true;
                        _this.otherAble=true;
                    }else{
                        _this.nodeSelectAble=false;
                        _this.otherAble=false;
                    }
                }
                if( _this.queryState===2){
                    _this.titile1="修改任务";
                    _this.titile2="update.job";
                    if(_this.job!==null){
                        _this.name=_this.job.Name;
                        _this.cron=_this.job.Cron;
                        _this.dataJson=_this.job.Datamap;
                        _this.version=_this.job.Version;
                        _this.single=_this.job.Single;
                        _this.categoryId=_this.job.CategoryId;

                        _this.nodeId=_this.job.NodeId;

                        _this.remark=_this.job.Remark;
                        _this.nodeSelectAble=true;
                        _this.otherAble=false;
                    }else{
                        _this.nodeSelectAble=false;
                    }
                }
                if( _this.queryState===0){
                    _this.titile1="新增任务";
                    _this.titile2="add.job";
                    if(_this.job!==null){
                        _this.name=_this.job.Name;
                        _this.cron=_this.job.Cron;
                        _this.dataJson=_this.job.Datamap;
                        _this.version=_this.job.Version;
                        _this.single=_this.job.Single;
                        _this.categoryId=_this.job.CategoryId;

                        _this.nodeId=_this.job.NodeId;

                        _this.remark=_this.job.Remark;
                        _this.nodeSelectAble=true;
                        _this.otherAble=true;
                    }else{
                        _this.nodeSelectAble=false;
                        _this.otherAble=false;
                    }
                }

            },
        },
        created() {
           _this = this;
            this.getcategoryList();
            this.getnodeList();
            this.getParams();
            this. initJob();//初始化job数据，几种的判定
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    };
</script>


<style lang="less">
    @import '../../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <h1>任务列表</h1>
        <div class="margin-top-20 ivu-row" style="height: auto">
            <div class="ivu-col ivu-col-span-24">
                <div class="ivu-card ivu-card-bordered">
                    <div class="ivu-card-head"><p><i class="ivu-icon ivu-icon-android-remove"></i>
                        job.list
                    </p></div> <!---->
                    <button  type="button" class="ivu-btn ivu-btn-primary"
                            style="margin: 5px 15px;" @click="addJob"><!----> <!---->
                        <span>新增</span>
                    </button>
                    <div class="ivu-card-body">
                        <div class="edittable-table-height-con">
                            <div>
                                <div class="ivu-table-wrapper">
                                    <div class="ivu-table ivu-table-border"><!---->
                                        <div class="ivu-table-header">
                                            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                <colgroup>
                                                    <col width="7%">
                                                    <col width="10%">
                                                    <col width="14%">
                                                    <col width="23%">
                                                    <col width="23%">
                                                    <col width="23%">
                                                    <!----></colgroup>
                                                <thead>
                                                <tr>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">序号</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">任务名</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">当前运行状态</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">任务信息</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">任务备注</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">操作</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <!----></tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div class="ivu-table-body ivu-table-overflowX">
                                            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                <colgroup>
                                                    <col width="7%">
                                                    <col width="10%">
                                                    <col width="14%">
                                                    <col width="23%">
                                                    <col width="23%">
                                                    <col width="23%">
                                                </colgroup>
                                                <tbody class="ivu-table-tbody">
                                                <tr class="ivu-table-row" v-for=" item in jobsData">
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>
                                                               {{item.Id}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>{{item.Name}}</span></div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>
                                                            【最近开始时间】{{item.Lastedstart | time}}<br/>
                                                            【最近结束时间】{{item.Lastedend | time}}<br/>
                                                                【任务运行状态】 <span style="color:red;" v-if="item.State==0">停止</span>
                                                                <span style="color:green;" v-else>运行</span><br/>
                                                            【运行成功次数】{{item.Runcount}}<br/>
                                                                【下次开始时间】{{item.Nextstart | time}}<br/>
                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>
                                                                 【分类】{{item.CategoryId}}<br/>
                                                                 【节点】{{item.NodeId}}<br/>
                                                                 【cron】{{item.Cron}}<br/>
                                                                 【版本】{{item.Version}}<br/>
                                                                 【修改时间】{{item.Createtime | time}}<br/>
                                                                 【创建时间】{{item.Createtime | time}}<br/>
                                                                 【创建人】{{item.UserId}}<br/>
                                                            </span></div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>{{item.Remark}}</span></div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!---->
                                                            <div>
                                                                <button v-if="!item.State" @click="handleStartJob(item.Id)" type="button" class="ivu-btn ivu-btn-primary"
                                                                        style="margin: 0px 5px;"><!----> <!---->
                                                                    <span>启动</span>
                                                                </button>
                                                                <button @click="handlePauseJob(item.Id)" v-if="item.State" type="button" class="ivu-btn ivu-btn-primary"
                                                                        style="margin: 0px 5px;"><!----> <!---->
                                                                    <span>暂停</span>
                                                                </button>
                                                                <br/>
                                                                <div class="ivu-poptip ivu-poptip-confirm">
                                                                    <div class="ivu-poptip-rel">
                                                                        <button @click="handleDeleteJob(item.Id)"  v-if="item.State" type="button"
                                                                                class="ivu-btn ivu-btn-error"
                                                                                style="margin: 0px 5px;"><!----> <!---->
                                                                            <span>卸载</span>
                                                                        </button>
                                                                        <button @click="handleDeleteJob(item.Id)"  v-if="!item.State" type="button"
                                                                                class="ivu-btn ivu-btn-error"
                                                                                style="margin: 0px 5px;"><!----> <!---->
                                                                            <span>删除</span>
                                                                        </button>
                                                                    </div>
                                                                </div><br/>
                                                                <button @click="handleJobDetail(item)" v-if="item.State" type="button" class="ivu-btn ivu-btn-primary"style="margin: 0px 5px;">
                                                                    <span>查看</span>
                                                                </button>
                                                                <button @click="handleUpdateJob(item)" v-if="!item.State" type="button" class="ivu-btn ivu-btn-primary"style="margin: 0px 5px;">
                                                                    <span>修改</span>
                                                                </button>
                                                                <br/>
                                                                <button @click="handleJobLog(item)" type="button" class="ivu-btn ivu-btn-primary"
                                                                        style="margin: 0px 5px;"><!----> <!---->
                                                                    <span>查看日志</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr> <!---->
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="ivu-table-tip" style="display: none;">
                                            <table cellspacing="0" cellpadding="0" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="width: 50%;"><span>暂无筛选结果</span></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div> <!----> <!----> <!----> <!----></div> <!---->
                                    <object tabindex="-1" type="text/html" data="about:blank"
                                            style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import canEditTable from './components/canEditTable.vue';
    import tableData from './components/table_data.js';
    import axios from 'axios';
    import qs from 'qs';
    var _this;
   // axios.defaults.baseURL = 'http://127.0.0.1:8001';
    export default {
        name: 'jobs',
        components: {
            canEditTable
        },
        data () {
            return {
                //categoryName: '',
               // nodeName: '',
               // userName: '',
                jobsData: [],

            };
        },
        methods: {

            getJobs () {
                axios.get('/jobs').then(function (response) {
                    _this.jobsData = response.data.msg;
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
            },
            addJob(){
                _this.$router.push({name:"addJob",params: {
                        job: null,
                        queryState:0
                    }});
               // _this.$router.push({name: 'addJob'});
            },
            handleStartJob(jobid){
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                axios.post('/command',qs.stringify({'jobid':jobid,'commandtype':1})).then(function (response) {
                    _this.$Message.info({
                        content: 'cmd send success!wait for refresh',
                        duration: 3
                    });
                    setTimeout(function (){
                        _this.getJobs();
                    }, 3000);
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

                //setTimeout( _this.getJobs(), 3000)
            },
            handlePauseJob(jobid){
                axios.post('/command',qs.stringify({'jobid':jobid,'commandtype':-2})).then(function (response) {
                    _this.$Message.info({
                        content: 'cmd send success!wait for refresh',
                        duration: 3
                    });
                    setTimeout(function (){
                        _this.getJobs();
                    }, 3000);
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
            },
            handleDeleteJob(jobid){
                axios.post('/command',qs.stringify({'jobid':jobid,'commandtype':-1})).then(function (response) {
                    _this.$Message.info({
                        content: 'cmd send success!wait for refresh',
                        duration: 3
                    });
                    setTimeout(function (){
                        _this.getJobs();
                    }, 3000);
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
            },
            handleUpdateJob(job){
                _this.$router.push({name:"addJob",params: {
                        job: job,
                        queryState:2
                    }});
            },
            handleJobDetail(job){
                _this.$router.push({name:"addJob",params: {
                        job: job,
                        queryState:1
                    }});
            },
            handleJobLog(job){
                _this.$router.push({name:"logs",params: {
                        job: job
                    }});
            },
            handleNetConnect (state) {
                this.breakConnect = state;
            },
            handleLowSpeed (state) {
                this.lowNetSpeed = state;
            },
            getCurrentData () {
                this.showCurrentTableData = true;
            },
            handleDel (val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
            },
            handleCellChange (val, index, key) {
                this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
            },
            handleChange (val, index) {
                this.$Message.success('修改了第' + (index + 1) + '行数据');
            }
        },
        created () {
            _this = this;
            this.getJobs();
        }
    };
</script>

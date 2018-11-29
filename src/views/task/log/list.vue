<style lang="less">
    @import '../../../styles/common.less';
    @import '../job/components/table.less';
</style>

<template>
    <div>
        <h1>日志列表</h1>
        <div class="margin-top-20 ivu-row" style="height: auto">
            <div class="ivu-col ivu-col-span-24">
                <div class="ivu-card ivu-card-bordered">
                    <div class="ivu-card-head"><p><i class="ivu-icon ivu-icon-android-remove"></i>
                        log.list
                    </p></div> <!---->

                    <div class="ivu-card-body">
                        <div class="edittable-table-height-con">
                            <div>
                                <div class="ivu-table-wrapper">
                                    <div class="ivu-table ivu-table-border"><!---->
                                        <div class="ivu-table-header">
                                            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                <colgroup>
                                                    <col width="7%">
                                                    <col width="7%">
                                                    <col width="72%">
                                                    <col width="14%">
                                                    <!----></colgroup>
                                                <thead>
                                                <tr>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">序号</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">任务ID</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">错误信息</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">创建时间</span> <!---->
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
                                                    <col width="7%">
                                                    <col width="72%">
                                                    <col width="14%">
                                                </colgroup>
                                                <tbody class="ivu-table-tbody">
                                                <tr class="ivu-table-row" v-for=" item in logsData">
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>
                                                               {{item.Id}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>{{item.JobId}}</span></div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>{{item.Msg}}
                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>
                                                                 {{item.Createtime  | time}}
                                                            </span></div>
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
    import canEditTable from '../job/components/canEditTable.vue';
    import tableData from '../job/components/table_data.js';
    import axios from 'axios';
    import qs from 'qs';
    var _this;
    //axios.defaults.baseURL = 'http://127.0.0.1:8001';
    export default {
        name: 'logs',
        components: {
            canEditTable
        },
        data () {
            return {
                job:null,
                logsData:[],
                jobid:0
            };
        },
        methods: {

            getLogs () {

                if(_this.job!=null)
                {
                    _this.jobid=_this.job.Id;
                }
                axios.get('/logs',{
                    params: { 'jobid': _this. jobid}
                }).then(function (response) {
                    _this.logsData = response.data.msg;
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
            getParams () {
                // 取到路由带过来的参数
                let routerParams = _this.$route.params.job;
                // 将数据放在当前组件的数据内
                _this.job = routerParams;
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
        created() {
            _this = this;
            this.getParams();
            this.getLogs();
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    };
</script>

<style lang="less">
    @import '../../styles/common.less';
    @import '.././task/job/components/table.less';
</style>

<template>
    <div>
        <h1>节点性能</h1>
        <div class="margin-top-20 ivu-row" style="height: auto">
            <div class="ivu-col ivu-col-span-24">
                <div class="ivu-card ivu-card-bordered">
                    <div class="ivu-card-head"><p><i class="ivu-icon ivu-icon-android-remove"></i>
                        performance.list
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
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="14%">
                                                    <!----></colgroup>
                                                <thead>
                                                <tr>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">序号</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">节点ID</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">CPU(%)</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">内存(MB)</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">线程数</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">更新时间</span> <!---->
                                                            <!----></div>
                                                    </th>
                                                    <th class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><span class="">备 注</span> <!---->
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
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="18%">
                                                    <col width="14%">
                                                </colgroup>
                                                <tbody class="ivu-table-tbody">
                                                <tr class="ivu-table-row" v-for=" item in performancesData">
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>
                                                               {{item.Id}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>{{item.NodeId}}</span></div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>{{item.Cpu}}
                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>{{item.Memory}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>{{item.Installdirsize}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell">
                                                            <span>{{item.Updatetime  | time}}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td class="ivu-table-column-center">
                                                        <div class="ivu-table-cell"><!----> <!----> <!----> <!---->
                                                            <!----> <span>
                                                                 {{item.Remark}}
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
    import canEditTable from '.././task/job/components/canEditTable.vue';
    import tableData from '.././task/job/components/table_data.js';
    import axios from 'axios';
    import qs from 'qs';
    var _this;
    //axios.defaults.baseURL = 'http://127.0.0.1:8001';
    export default {
        name: 'performances',
        components: {
            canEditTable
        },
        data () {
            return {
                performancesData:[]
            };
        },
        methods: {

            getPerformances () {
                axios.get('/performances').then(function (response) {
                    _this.performancesData = response.data.msg;
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
            this.getPerformances();
        }
    };
</script>

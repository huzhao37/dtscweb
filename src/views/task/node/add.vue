<style lang="less">
    @import '../../../styles/common.less';
    @import './add.less';
</style>
<template>
    <div>
        <h1>新增节点</h1>

        <Card>
            <p slot="title">
                <Icon type="paper-airplane"></Icon>
            add.node
            </p>
            <Row class="padding-left-20" style="margin-left:25%;">
                <p class="margin-top-10 ">
                    <Icon type="clock"></Icon>&nbsp;&nbsp;节点名：
                    <Input  v-model="name" placeholder="请输入节点名称" style="width: 200px"/>
                </p>
                <p class="margin-top-10 ">
                    <Icon type="monitor"></Icon>&nbsp;&nbsp;主机Ip地址：
                    <Input  v-model="ip" placeholder="请输入节点主机Ip" style="width: 200px"/>
                </p>
                <p class="margin-top-10">
                    <Icon type="information-circled"></Icon>&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp; 注：<br/>
                    <Input v-model="remark" style="width:50%" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入节点备注"/>
                </p>
            </Row>
            <Row class="margin-top-20 publish-button-con " >
                <div style="margin-right:48%;">
                <span class="publish-button" ><Button @click="handleCancel">取消
                </Button>
                </span>
                <span class="publish-button" style="margin-right:40px;"><Button :disabled="otherAble" @click="handlePublish" :loading="publishLoading" icon="ios-checkmark"
                                                     style="width:90px;" type="primary">保存
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
        name: 'addNode',
        data () {
            return {
                name:"",
                ip:'',
                remark:"",
                user: Cookies.get('user'),
                userId:Cookies.get('userid'),
            };
        },
        methods: {

            handleCancel(){
                _this.$router.push({name: 'nodes'});
            },
            handlePublish(){
                    axios.post('/node',qs.stringify({
                        'name': _this.name,
                        'ip': _this.ip,
                        'remark':_this.remark
                    })).then(function (response) {
                        console.log(response.data.msg);
                        _this.$Message.info({
                            render: h => {
                                return h('span', [
                                    '节点创建成功！ ',
                                    h('a', ''),
                                    ' '
                                ])
                            }
                        });
                        _this.$router.push({name: 'nodes'});
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

        },
        created() {
           _this = this;
        }
    };
</script>


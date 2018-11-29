<style lang="less">
    @import '../../../styles/common.less';
    @import './add.less';
</style>
<template>
    <div>
        <h1>新增分类</h1>

        <Card>
            <p slot="title">
                <Icon type="paper-airplane"></Icon>
            add.category
            </p>
            <Row class="padding-left-20" style="margin-left:25%;">
                <p class="margin-top-10 ">
                    <Icon type="clock"></Icon>&nbsp;&nbsp;分类名：
                    <Input  v-model="name" placeholder="请输入分类名称" style="width: 200px"/>
                </p>
                <p class="margin-top-10">
                    <Icon type="information-circled"></Icon>&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp; 注：<br/>
                    <Input v-model="remark" style="width:50%" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入分类备注"/>
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
        name: 'addCategory',
        data () {
            return {
                name:"",
                remark:"",
                user: Cookies.get('user'),
                userId:Cookies.get('userid'),
            };
        },
        methods: {

            handleCancel(){
                _this.$router.push({name: 'categorys'});
            },
            handlePublish(){
                    axios.post('/category',qs.stringify({
                        'name': _this.name,
                        'remark':_this.remark
                    })).then(function (response) {
                        console.log(response.data.msg);
                        _this.$Message.info({
                            render: h => {
                                return h('span', [
                                    '分类创建成功！ ',
                                    h('a', ''),
                                    ' '
                                ])
                            }
                        });
                        _this.$router.push({name: 'categorys'});
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


<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs';
import  Vue from 'vue'
//axios.defaults.baseURL = 'http://127.0.0.1:8001';
//axios.defaults.headers.common['Authorization'] = 'unitoon2018';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var _this;
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit: function () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    Cookies.set('user', this.form.userName);
                    Cookies.set('pwd', this.form.password);
                    //xhr
                    // var request = new XMLHttpRequest();
                    // request.open('GET', 'http://127.0.0.1:8001/tbcategorys', true);//http://127.0.0.1/api/JXD/GetMonthData
                    // request.setRequestHeader('Content-Type', 'application/json');//application/x-www-form-urlencoded
                    // request.onload = function() {
                    //     console.log(this.status)
                    //     if (this.status >= 200 && this.status < 400) {
                    //         console.log("success!")
                    //     }
                    // };

                    //cors test
                    // axios.defaults.baseURL = 'http://127.0.0.1:5200/api';
                    //
                    // axios.defaults.headers.post['Content-Type'] = 'application/json';
                    // axios.post('/oauth/authenticate', {
                    //     'LoginName': "bob",
                    //     'Password': "bob"
                    // }).then(function (response) {
                    //     console.log(response);
                    // }).catch(function (error) {
                    //     console.log(error);
                    // });


                    // request.send();
                    // 也可以通过 params 对象传递参数
                    // var params = new URLSearchParams()
                    // params.append('name',  this.form.userName)
                    // params.append('pwd',  this.form.password)
                    axios.post('/login', qs.stringify({
                        'name': this.form.userName,
                        'pwd': this.form.password
                    })).then(function (response) {
                        console.log(response.data.msg);
                        Cookies.set('userid', response.data.msg.Id);
                        _this.$store.commit("changeLogin",true);
                          sessionStorage.setItem('isLogin','true');
                        _this.$router.push({name: 'home_index'});
                        //登录后改变登录状态 isLogin = true ；
                        //_this.$store.commit("changeExit",false);
                    }).catch(function (error) {
                        console.log(error);
                        _this.$store.commit("changeLogin",false);
                        sessionStorage.setItem('isLogin','false');
                        _this.$router.push({name: 'error-403'});
                       // _this.$store.commit("changeExit",true);
                    });
                }
                _this=this;
                //_this.commit("changeLogin","100");
            });

        }
    }
};
</script>

<style>

</style>

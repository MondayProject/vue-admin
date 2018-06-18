<template>
  <div class="bg">
    <div class="title">
      {{type==='login'?'登入':type==='register'?'註冊':'重設密碼'}}
    </div>
    <div class="form-container">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="userCode">
          <Input type="text" v-model="formInline.userCode" clearable placeholder="帳號">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" clearable :placeholder="type==='reset'?'新密碼':'密碼'">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="passwdCheck" v-show="type!=='login'">
          <Input type="password" v-model="formInline.passwdCheck" clearable :placeholder="type==='register'?'確認密碼':'確認新密碼'">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button long type="primary" :loading="loading" @click="handleSubmit('formInline')">
            {{type==='login'?'登入':type==='register'?'立即註冊':'重設密碼'}}
          </Button>
        </FormItem>
        <div class="link">
          <div class="fl" v-show="type!=='reset'">
            <a @click="loginType('reset')">忘記密碼？</a>
          </div>
          <div class="fr" v-show="type==='login'">
            沒有帳號？
            <a @click="loginType('register')">去註冊</a>
          </div>
          <div class="fr" v-show="type==='register'">
            有帳號？
            <a @click="loginType('login')">去登入</a>
          </div>
          <div class="fr" v-show="type==='reset'">
            記得密碼？
            <a @click="loginType('login')">去登入</a>
          </div>
        </div>
      </Form>
    </div>
    <div class="indexLizi" id="indexLizi"></div>
  </div>
</template>
<script>
import liziInit from "../../libs/tree/buildtree";
import md5 from "js-md5";
import { mapState, mapMutations } from "vuex";
import { accountLogin } from "../../service/getData";
export default {
  data() {
    return {
      loading: false,
      formInline: {},
      type: "login",
      ruleInline: {}
    };
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    async login() {
      let res = await accountLogin(this.type, {
        userCode: this.formInline.userCode,
        password: md5(this.formInline.password)
      });
      this.loading = false;
      if (res && res.respCode === "000000" && res.values) {
        this.$Message.success(res.respMsg);
        this.RECORD_USERINFO({
          userCode: res.values[0].userCode
        });
        if (this.type === "login") {
          this.$router.push("/home");
        } else {
          this.type = "login";
          setTimeout(() => {
            this.handleSubmit("formInline");
          }, 2000);
        }
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    loginType(type = "login") {
      this.type = type;
      if (type === "login") {
        this.ruleInline = {
          userCode: [
            {
              required: true,
              message: "請輸入帳號",
              trigger: "blur"
            },
            {
              pattern: /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,20}$/,
              message: "請輸入 6-20 個數字和英文大小寫",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "請輸入密碼",
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              message: "密碼長度不少於 6 位",
              trigger: "blur"
            }
          ]
        };
      }
      if (type !== "login") {
        const password = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("請輸入密碼"));
          } else {
            if (this.formInline.passwdCheck !== "") {
              // 对第二个密码框单独验证
              this.$refs.formInline.validateField("passwdCheck");
            }
            callback();
          }
        };
        const validatePassCheck = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("請輸入確認密碼"));
          } else if (value !== this.formInline.password) {
            callback(new Error("兩次輸入的密碼不一致"));
          } else {
            callback();
          }
        };
        this.ruleInline = {
          userCode: [
            {
              required: true,
              message: "請輸入帳號",
              trigger: "blur"
            },
            {
              pattern: /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,20}$/,
              message: "請輸入 6-20 個數字和英文大小寫",
              trigger: "blur"
            }
          ],
          password: [
            {
              validator: password,
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              message: "密碼長度不少於 6 位",
              trigger: "blur"
            }
          ],
          passwdCheck: [
            {
              validator: validatePassCheck,
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              message: "確認密碼長度不少於 6 位",
              trigger: "blur"
            }
          ]
        };
      }
    },
    handleSubmit(name) {
      this.loading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.loading = false;
          // this.$Message.error("登录失败");
        }
      });
    }
  },
  created() {
    this.loginType();
  },
  mounted() {
    liziInit();
  }
};
</script>
<style lang="less">
.indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.bg {
  background: #141b48;
  height: 100%;
  width: 100%;
  position: absolute;
}
.title {
  font-size: 30px;
  color: #fff;
  margin-top: 150px;
  text-align: center;
}
.form-container {
  text-align: center;
  margin: 20px auto;
  width: 300px;
  position: absolute;
  z-index: 2;
  margin-left: -150px;
  left: 50%;
}
.link {
  margin-top: -20px;
}
</style>


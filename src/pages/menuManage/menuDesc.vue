<template>
  <div>
    <i-layout>
      <i-breadcrumb t2="病患列表" t3="詳細資訊">
        <Button class="fr vue-back-btn" @click="$router.go(-1)" shape="circle">返回</Button>
      </i-breadcrumb>
      <div class="vue-panel">
        <Row type="flex" justify="center">
          <Col span="12" :md="14" :lg="12" :xs="24" :sm="24">
          <Form ref="formValidate" :model="formValidate" :label-width="100">
            <FormItem label="病患編碼:" prop="menuId">
              <label>{{formValidate.menuId}}</label>
            </FormItem>
            <FormItem label="病患姓名:" prop="menuName">
              <label>{{formValidate.menuName}}</label>
            </FormItem>
            <FormItem label="初診時間:" prop="createTime">
              <label>{{formValidate.createTime | formatDate}}</label>
            </FormItem>
            <FormItem label="最近更新時間:" prop="updateTime">
              <label>{{formValidate.updateTime | formatDate}}</label>
            </FormItem>
            <FormItem label="目前狀況:" prop="platType">
              <label>{{formValidate.platType | platType}}</label>
            </FormItem>
            <FormItem label="病歷號:" prop="icon">
              <label>{{formValidate.icon}}</label>
            </FormItem>
            <FormItem label="病患性別:" prop="menuLevel">
              <label>{{formValidate.menuLevel | menuLevel}}</label>
            </FormItem>
            <FormItem label="地址:" prop="url">
              <label>{{formValidate.url}}</label>
            </FormItem>
            <FormItem label="出生日期:">
              <label>{{formValidate.pmenuId}}</label>
            </FormItem>
            <FormItem label="備註:" prop="remark">
              <label>{{formValidate.remark}}</label>
            </FormItem>

          </Form>
          </Col>
        </Row>
      </div>
    </i-layout>
  </div>
</template>

<script>
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import { getMenuList } from "../../service/getData";
import filters from "../../filters";
export default {
  name: "menuDesc",
  components: {
    iLayout,
    iBreadcrumb
  },
  filters: {
    formatDate(date) {
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    menuLevel(name) {
      return filters.menuLevel(name);
    },
    platType(name) {
      return filters.platType(name);
    }
  },
  data() {
    return {
      formValidate: {}
    };
  },
  created() {
    if (this.$route.query && this.$route.query.menuId) {
      this.findMenuInfo(this.$route.query.menuId);
    }
  },
  methods: {
    async findMenuInfo(menuId) {
      const res = await getMenuList({
        params: {
          menuId
        }
      });
      if (res.respCode === "000000" && res.values) {
        this.formValidate = res.values[0];
      }
    }
  }
};
</script>

<style>

</style>

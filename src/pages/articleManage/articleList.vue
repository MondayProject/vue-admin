<template>
  <i-layout>
    <i-breadcrumb>
    </i-breadcrumb>

    <div class="vue-panel">
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="發布日期:">
            <DatePicker style="width:100%" v-model="formItem.createTime" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="請選擇日期"></DatePicker>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="文章標題:">
            <Input v-model="formItem.articleTitle" placeholder="請輸入文章標題" clearable></Input>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="文章作者:">
            <Select v-model="formItem.userCode">
              <Option value="USER">普通用户</Option>
              <Option value="ADMIN">管理员</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="文章分類:">
            <Select v-model="formItem.category">
              <Option value="USER">衛教資訊</Option>
              <Option value="ADMIN">戒菸撇步</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="文章狀態:">
            <Select v-model="formItem.status">
              <Option value="100">已發布</Option>
              <Option value="500">未發布</Option>
            </Select>
          </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="8" :lg="8">
          <FormItem label="文章摘要:">
            <Input v-model="formItem.abstract" placeholder="請輸入文章摘要" clearable></Input>
          </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" @click="getList" style="width:80px" long shape="circle">查詢</Button>
          <Button type="ghost" style="width:80px;margin-left: 8px" @click="clearForm" shape="circle">清除</Button>
        </FormItem>
      </Form>
    </div>
    <div class="vue-panel-table">
      <nav-content>
        <router-link to="/articleManage/editArticle">
          <Button class="fr vue-back-btn" shape="circle">新增文章</Button>
        </router-link>
      </nav-content>
      <Table :loading="tableLoading" :data="tableData1" :columns="tableColumns1" stripe></Table>
      <div class="vue-panel-page" >
        <div style="float: right;">
          <Page :total="total" show-total show-elevator show-sizer :page-size="pageSize" :current="pageNo" @on-page-size-change="changeSize" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!-- 对话框 -->

    <Modal v-model="modal6" :title="modalTitle" :loading="modalLoading" @on-ok="asyncOK">
      <p>{{modalContent}}</p>
    </Modal>
  </i-layout>
</template>
<script>
import iLayout from "../../components/layout.vue";
import iBreadcrumb from "../../components/breadcrumb.vue";
import navContent from "../../components/navcontent.vue";
import filters from "../../filters";
import { getArticleList, deleteArticleList } from "../../service/getData";
export default {
  name: "articleList",
  components: {
    iLayout,
    iBreadcrumb,
    navContent
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return filters.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  data() {
    return {
      pageSize: 10,
      total: 0,
      pageNo: 1,
      value2: "",
      value14: "",
      tableLoading: false,
      modal6: false,
      // 对话框
      modalLoading: true,
      modalContent: "",
      modalTitle: "",
      modalType: "",
      formItem: {},
      tableData1: [],
      tableColumns1: [
        {
          title: "編號",
          type: "index",
          width: 80,
          align: "center",
          sortable: true
        },
        {
          title: "發布日期",
          width: 150,
          key: "createTime",
          render: (h, params) => {
            const row = params.row;
            const time = row.createTime
              ? filters.formatDate(row.createTime, "yyyy-MM-dd hh:mm:ss")
              : "";
            return h("span", time);
          },
          sortable: true
        },
        {
          title: "標題",
          key: "articleTitle",
          sortable: true
        },
        {
          title: "作者",
          key: "userCode",
          sortable: true
        },
        {
          title: "摘要",
          key: "abstract",
          width: 130,
          sortable: true
        },
        {
          title: "狀態",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const status = row.status
              ? filters.articleStatus(row.status)
              : row.status;
            if (row.status === "100") {
              return h(
                "Tag",
                {
                  props: {
                    type: "border",
                    color: "green"
                  }
                },
                "已發布"
              );
            } else if (row.status === "500") {
              return h(
                "Tag",
                {
                  props: {
                    color: "red",
                    type: "border"
                  }
                },
                "未發布"
              );
            }
          },
          sortable: true
        },
        {
          title: "操作",
          width: 180,
          key: "edit",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editArticle(params.row._id);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.openModal({
                        id: params.row._id,
                        modalType: "delete",
                        modalTitle: "提醒",
                        modalContent: "將永遠刪除文章，確定嗎？"
                      });
                    }
                  }
                },
                "刪除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.goDesc(params.row._id);
                    }
                  }
                },
                "更多"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.getList();
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },
    // 获取表格数据
    async getList() {
      this.tableLoading = true;
      const res = await getArticleList({
        params: this.formItem,
        pagenation: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      });
      this.tableLoading = false;
      if (res && res.respCode === "000000" && res.values) {
        if (res.values) {
          this.tableData1 = res.values;
          this.total = res.pagenation.itemCount;
          this.pageNo = res.pagenation.pageNo;
        }
      } else {
        this.tableData1 = [];
        this.total = 0;
        this.pageNo = 1;
      }
    },
    clearForm() {
      this.formItem = {};
    },
    // 删除用户
    async deleteUser(id) {
      const res = await deleteArticleList(id);
      this.modal6 = false;
      this.modalLoading = false;
      if (res && res.respCode === "000000") {
        this.$Message.success(res.respMsg);
        this.getList();
      } else {
        this.$Message.error(res.respMsg);
      }
    },
    // 打开对话框
    openModal(obj) {
      this.modal6 = true;
      this.modalTitle = obj.modalTitle;
      this.modalContent = obj.modalContent;
      this.modalType = obj.modalType;
      this.modalId = obj.id;
    },
    editArticle(id) {
      this.$router.push({
        name: "editArticle",
        path: "/articleManage/editArticle",
        query: { id }
      });
    },
    goDesc(id) {
      this.$router.push({
        name: "articleDesc",
        path: "/articleManage/articleList/articleDesc",
        query: { id }
      });
    },
    //对话框 is-ok
    asyncOK() {
      this.modalLoading = true;
      if (this.modalType === "delete") {
        this.deleteUser(this.modalId);
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>

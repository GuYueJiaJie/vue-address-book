<template>
  <div id="add-info">
    <div class="title">添加联系人</div>
    <ul>
      <!-- <li>
        <span>头像</span>
        <input type />
      </li>-->
      <li>
        <span class="left-info">姓名</span>
        <input class="right-info right-input" type="text" v-model="name" placeholder="请添加联系人姓名" />
        <span class="clear-icon" :class="{active: showIconName}" @click="clearName">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
        <!-- <span class="reminder" v-show="showNameReminder">*姓名不能为空</span> -->
      </li>
      <li>
        <span class="left-info">电话号码</span>
        <input class="right-info right-input" type="text" v-model="phone" placeholder="请添加联系人号码" />
        <span class="clear-icon" :class="{active: showIconPhone}" @click="clearPhone">
          <i class="fa fa-times" aria-hidden="true"></i>
        </span>
        <!-- <span class="reminder" v-show="showPhoneReminder">*电话号码不能为空</span> -->
      </li>
      <li>
        <span class="left-info">与我的关系</span>
        <select name="relation" id="relation" class="right-info right-select" v-model="selected">
          <option value="family">家人</option>
          <option value="friend">朋友</option>
          <option value="colleague">同事</option>
        </select>
      </li>
    </ul>
    <button class="addinfo-button" @click="addItem" :disabled="buttonDisabled">
      添加
      <span>
        <i class="fa fa-ban" aria-hidden="true" v-show="buttonDisabled"></i>
      </span>
    </button>
    <div class="add-successful" v-show="addSuccess">添加成功</div>
  </div>
</template>
<script>
import Mock from "mockjs";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      phone: "",
      classify: "",
      selected: "family",
      showNameReminder: false,
      showPhoneReminder: false,
      addSuccess: false
    };
  },
  computed: {
    showIconName() {
      return !!this.name;
    },
    showIconPhone() {
      return !!this.phone;
    },
    buttonDisabled() {
      return !this.name || !this.phone;
    }
    // ...mapGetters("addressBook", ["count"])
  },
  methods: {
    ...mapActions("addressBook", {
      addItemAsync: "addItemAsync"
    }),
    clearName() {
      this.name = "";
    },
    clearPhone() {
      this.phone = "";
    },
    addItem() {
      let itemId = Mock.mock("@guid");
      console.log(itemId);
      let item = {
        name: this.name,
        phone: this.phone,
        id: itemId,
        classify: this.selected
      };
      this.addItemAsync(item).then(v => {
        this.addSuccess = true;
        setTimeout(() => {
          this.addSuccess = false;
        }, 2000);
      });
    }
  }
};
</script>

<style scoped>
#add-info {
  width: 70%;
  margin: 10% auto;
  font-size: 2rem;
}
#add-info .title {
  text-align: center;
  font-size: 4rem;
  font-family: "幼圆";
}
#add-info ul li {
  list-style-type: none;
  margin-top: 5%;
  height: 3rem;
  line-height: 3rem;
}
#add-info ul li .left-info {
  display: inline-block;
  text-align: right;
  width: 20%;
  margin-left: 15%;
  font-weight: bold;
}
#add-info ul li .right-info {
  display: inline-block;
  height: 2.5rem;
  margin-left: 10%;
}

.right-input {
  width: 30%;
  padding-left: 10px;
}
.right-select {
  width: 15%;
}
.clear-icon {
  vertical-align: middle;
  margin-left: 5px;
  visibility: hidden;
}
.active {
  visibility: visible;
}
.reminder {
  margin-left: 10px;
  font-size: 1.2rem;
  color: red;
  vertical-align: middle;
}

.addinfo-button {
  display: block;
  margin: 3rem auto;
  width: 45%;
  background-color: #0f88eb;
  text-align: center;
  border: none;
  border-radius: 0.3rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 2rem;
  color: #fff;
}
.add-successful {
  margin: auto;
  text-align: center;
}
button[disabled] {
  color: black;
  background: gray;
}
</style>

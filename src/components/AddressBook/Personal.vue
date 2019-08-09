<template>
  <div id="personal">
    <div class="title">个人信息</div>
    <ul>
      <li>
        <span class="left-info">昵称:</span>
        <input type="text" v-if="isEdit" v-model="nickName" class="right-info" />
        <span v-else class="right-info">{{nickName}}</span>
      </li>
      <li>
        <span class="left-info">电话号码:</span>
        <input type="text" v-if="isEdit" v-model="phoneNumber" class="right-info" />
        <span v-else class="right-info">{{phoneNumber}}</span>
      </li>
    </ul>
    <div v-if="isEdit" class="save-back">
      <button class="save" @click="saveInfos">保存</button>
      <button class="back" @click="back">返回</button>
    </div>
    <button class="edit-button" @click.stop="editPersonalInfo" v-else>编辑信息</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isEdit: false,
      temporaryNickName: "",
      temporaryPhoneNumber: "",
      setNickName: false,
      setPhoneNumber: false
    };
  },
  computed: {
    nickName: {
      get() {
        return this.$store.state.addressBook.nickName;
      },
      set(value) {
        this.setNickName = true;
        this.temporaryNickName = value;
      }
    },
    phoneNumber: {
      get() {
        return this.$store.state.addressBook.phoneNumber;
      },
      set(value) {
        this.setPhoneNumber = true;
        this.temporaryPhoneNumber = value;
      }
    }
  },
  methods: {
    ...mapActions("addressBook", ["changePersonalInfoAsync"]),
    editPersonalInfo() {
      this.isEdit = true;
      console.log("编辑信息");
    },
    saveInfos() {
      this.isEdit = false;
      console.log(this.temporaryNickName);
      this.changePersonalInfoAsync({
        nickName: this.setNickName ? this.temporaryNickName : this.nickName,
        phoneNumber: this.setPhoneNumber
          ? this.temporaryPhoneNumber
          : this.phoneNumber
      });
      // this.$store.commit("addressBook/changePersonalInfo", {
      //   nickName: this.setNickName ? this.temporaryNickName : this.nickName,
      //   phoneNumber: this.setPhoneNumber
      //     ? this.temporaryPhoneNumber
      //     : this.phoneNumber
      // });
    },
    back() {
      this.isEdit = false;
    }
  },
  created() {}
};
</script>

<style scoped>
#personal {
  width: 70%;
  margin: 10% auto;
  font-size: 2rem;
}
#personal .title {
  text-align: center;
  font-size: 4rem;
  font-family: "幼圆";
}
#personal ul li {
  list-style-type: none;
  margin-top: 10%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}
#personal ul li .left-info {
  display: inline-block;
  text-align: right;
  width: 20%;
  height: 3rem;
}

#personal ul li .right-info {
  display: inline-block;
  width: 50%;
  text-align: center;
  margin-left: 2rem;
  box-sizing: border-box;
  height: 3rem;
}
.edit-button {
  display: block;
  margin: 3rem auto;
  width: 45%;
  background-color: #0f88eb;
  text-align: center;
  cursor: pointer;
  height: 4rem;
  line-height: 4rem;
  font-size: 2rem;
  border: none;
  border-radius: 0.3rem;
  color: #ffffff;
}

.save-back {
  margin: 3rem auto;
  width: 45%;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  line-height: 4rem;
}

.save,
.back {
  cursor: pointer;
  width: 45%;
  border: none;
  border-radius: 0.3rem;
  background-color: #0f88eb;
  color: #fff;
}
</style>

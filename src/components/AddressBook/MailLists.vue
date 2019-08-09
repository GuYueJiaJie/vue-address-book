<template>
  <div id="mail-lists">
    <div class="search">
      <input type="text" placeholder="请输入要搜索的联系人" v-model="search" />
      <span>
        <i class="fa fa-search"></i>
      </span>
    </div>
    <p class="total">共有{{latestItems.length}}个联系人</p>
    <div class="classify total">
      <label for="all">
        <input type="radio" name="contacts" id="all" checked @click="classifyId='all'" />所有联系人
      </label>
      <label for="family">
        <input type="radio" name="contacts" id="family" @click="classifyId='family'" />家人
      </label>
      <label for="friend">
        <input type="radio" name="contacts" id="friend" @click="classifyId='friend'" />朋友
      </label>
      <label for="colleague">
        <input type="radio" name="contacts" id="colleague" @click="classifyId='colleague'" />同事
      </label>
    </div>
    <div class="total contact-lists" v-if="hasInfo">
        <ContactLists
          v-for="item in latestItems"
          :key="item.id"
          :item="item"
          @change-item="changeItemAsync"
          @delete-item="deleteItemAsync({id: item.id})"
        ></ContactLists>
    </div>
    <p class="total no-contact" v-else>没有联系人</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ContactLists from "./ContactLists";
export default {
  components: {
    ContactLists
  },
  data() {
    return {
      search: "",
      hasInfo: true,
      classifyId: "all"
    };
  },
  computed: {
    ...mapState("addressBook", {
      items: state => state.items
    }),
    latestItems() {
      if (this.items.length === 0) {
        return "";
      }
      switch (this.classifyId) {
        case "family":
          return this.search
            ? this.fileterLists("family").filter(
              item => item.name.indexOf(this.search) > -1
            )
            : this.fileterLists("family");
        case "friend":
          return this.search
            ? this.fileterLists("friend").filter(
              item => item.name.indexOf(this.search) > -1
            )
            : this.fileterLists("friend");
        case "colleague":
          return this.search
            ? this.fileterLists("colleague").filter(
              item => item.name.indexOf(this.search) > -1
            )
            : this.fileterLists("colleague");
        default:
          return this.search
            ? this.items.filter(item => item.name.indexOf(this.search) > -1)
            : this.items;
      }
    }
  },
  methods: {
    // ...mapMutations("addressBook", {
    //   changeItem: "changeItem",
    //   deleteItem: "deleteItem"
    // }),
    ...mapActions("addressBook", {
      deleteItemAsync: "deleteItemAsync",
      changeItemAsync: "changeItemAsync"
    }),
    fileterLists(type) {
      return this.items.filter(item => item.classify === type);
    }
  }
};
</script>

<style scoped>
.search {
  width: 80%;
  margin-top: 5%;
  margin-left: 5%;
  text-align: center;
}
.search input {
  height: 4rem;
  width: 95%;
  padding-left: 10px;
  border: 2px solid rgb(177, 173, 173);
  border-radius: 3px;
  outline: none;
}

.search span {
  display: inline-block;
  margin-left: -30px;
  font-size: 2rem;
  height: 3rem;
  vertical-align: middle;
}

.total {
  margin-left: 7%;
  margin-top: 3%;
  font-size: 1.5rem;
}

.no-contact {
  width: 80%;
  font-size: 3rem;
  color: blueviolet;
  text-align: center;
  height: 10rem;
  line-height: 10rem;
}

.contact-lists {
  margin-right: 7%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
</style>

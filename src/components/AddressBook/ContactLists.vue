<template>
  <div class="contact">
    <img src="./../../assets/logo.png" alt="头像" />
    <span class="caontat-content">
      <span v-if="!isEdit">{{item.name}}</span>
      <span v-else>
        <input type="text" v-model="name" class="content-input" />
      </span>
      <br />
      <span v-if="!isEdit">{{item.phone}}</span>
      <span v-else>
        <input type="text" v-model="phone" class="content-input" />
      </span>
    </span>
    <span class="edit-delete">
      <span class="edit" @click="isEdit = true" v-if="!isEdit">
        <i class="fa fa-edit"></i>
      </span>
      <span v-else @click="saveContact" class="edit">
        <i class="fa fa-check"></i>
      </span>
      <br />
      <span class="delete" v-if="!isEdit" @click="deleteContact">
        <i class="fa fa-trash-o"></i>
      </span>
      <span v-else class="delete" @click="exitEdit">
        <i class="fa fa-times"></i>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      choosenId: "",
      isEdit: false,
      name: this.item.name,
      phone: this.item.phone
    };
  },
  methods: {
    saveContact() {
      this.isEdit = false;
      if (this.name !== this.item.name || this.phone !== this.item.phone) {
        this.$emit("change-item", {
          id: this.item.id,
          name: this.name,
          phone: this.phone
        });
      }
    },
    deleteContact() {
      this.$emit("delete-item", {
        id: this.item.id,
        name: this.item.name,
        phone: this.item.phone
      });
    },
    exitEdit() {
      this.isEdit = false;
      this.name = this.item.name;
      this.phone = this.item.phone;
    }
  }
};
</script>

<style scoped>
.contact {
  border: 1px solid rgba(255, 255, 255, 0);
  overflow: hidden;
  width: 200px;
  margin-right: 30px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.contact:hover {
  border: 1px solid rgb(52, 169, 207);
}

.contact:active {
  border: 1px solid blue;
}
.contact img {
  width: 6rem;
  height: 6rem;
  vertical-align: middle;
}
.contact .caontat-content {
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  margin: 5%;
  line-height: 1.6;
}
.content-input {
  width: 100%;
}

.contact .edit-delete {
  display: inline-block;
  vertical-align: middle;
}
.contact .edit-delete i {
  display: none;
  font-size: 1.8rem;
}
.edit-delete .edit {
  color: rgb(42, 86, 230);
}
.edit-delete .delete {
  color: red;
}
.contact:hover i,
.contact:hover i {
  display: inline;
}
</style>

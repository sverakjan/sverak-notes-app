<template>
  <div v-if="note" transition="modal" class="backdrop" v-on:click="dismissModal">
    <form class="edit-note" v-on:submit.prevent="update" v-on:click.stop="">
      <input name="title" v-model="note.title" placeholder="Titulek" />
      <textarea name="content" v-model="note.content" placeholder="Text záznamu" rows="8"></textarea>
      <!-- <button type="button" v-on:click="remove"><i class="fa fa-trash" aria-hidden="true"></i></button> -->
      <button type="submit">Uložit</button>
    </form>
  </div>
</template>
<script>
import noteRepository from "../../data/NoteRepository";
export default {
  props: ["note"],
  methods: {
    remove() {
      noteRepository.remove(this.note, err => {
        if (err) return this.$dispatch("alert", { type: "error", message: "Nepodařilo se záznam odstranit" });
        this.dismissModal();
      });
    },
    update() {
      noteRepository.update(this.note, err => {
        if (err) return this.$dispatch("alert", { type: "error", message: "Nepodařilo se záznam aktualizovat" });
        this.dismissModal();
        this.$dispatch("alert", { type: "success", message: "Záznam byl upraven" });
      });
    },
    dismissModal() {
      this.note = null;
    }
  }
};
</script>
<style>
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(50, 50, 50, 0.8);
  z-index: 10;
}
form.edit-note {
  position: relative;
  width: 480px;
  max-width: calc(100% - 30px);
  margin: 25vh auto 0;
  background: #fff;
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 1px 50px #555;
}
form.edit-note input,
form.edit-note textarea {
  width: 100%;
  max-width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
  resize: none;
  margin-bottom: 20px;
}

form.edit-note textarea {
  margin-bottom: 40px;
}

form.edit-note button[type="submit"] {
  position: absolute;
  right: 10px;
  bottom: 10px;
  transform: none;
  background: #66bb6a;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 80px;
  height: 40px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  transition: background-color 0.2s;
}
form.edit-note button[type="submit"]:hover {
  background: #43a047;
  color: white;
}

form.edit-note button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: opacity 0.5s;
  color: #777;
  transition: color 0.2s;
  padding: 5px 10px;
  transform: translateX(-5px) translateY(5px);
}
form.edit-note button:hover {
  color: #d32f2f;
}

/* modal transition */
.modal-transition {
  transition: opacity 0.3s ease;
  opacity: 1;
}
.modal-transition form {
  transition: transform 0.3s ease;
}
.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter form,
.modal-leave form {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
  <div v-if="notex" transition="modal" class="backdrop" v-on:click="dismissModal">
    <form class="comment-note" v-on:submit.prevent="comment" v-on:click.stop="">
      <textarea class="comment-textarea" name="comment" v-model="notex.newcomment" placeholder="Text komentáře" rows="8"></textarea>
      <button type="submit">Odeslat</button>
      <span v-on:click="dismissModal" class="close-modal"><i class="fa fa-times" aria-hidden="true"></i></span>
    </form>
  </div>
</template>
<script>
import noteRepository from "../../data/NoteRepository";
export default {
  props: ["notex"],
  methods: {
    comment() {
      if ($(".comment-textarea").val() != "") {
        noteRepository.comment(this.notex, err => {
          if (err) return this.$dispatch("alert", { type: "error", message: "Nepodařilo se komentář přidat" });
          this.dismissModal();
          this.$dispatch("alert", { type: "success", message: "Komentář přidán" });
        });
      } else {
      }
    },
    dismissModal() {
      this.notex = null;
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
form.comment-note {
  position: relative;
  width: 480px;
  max-width: calc(100% - 30px);
  margin: 25vh auto 0;
  background: #fff;
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 1px 50px #555;
}
form.comment-note input,
form.comment-note textarea {
  width: 100%;
  max-width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
  resize: none;
  margin-bottom: 20px;
}

form.comment-note textarea {
  margin-bottom: 40px;
}

form.comment-note button[type="submit"] {
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
form.comment-note button[type="submit"]:hover {
  background: #43a047;
  color: white;
}

form.comment-note button {
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
form.comment-note button:hover {
  color: #d32f2f;
}

form.comment-note .close-modal {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  transition: color 0.2s;
  color: #777;
}

form.comment-note .close-modal:hover {
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

<template>
  <form class="create-note" v-on:submit.prevent="createNote">
    <input name="title" v-model="title" placeholder="Titulek" />
    <textarea name="content" v-model="content" placeholder="Text záznamu" rows="3"></textarea>
    <button type="submit">Přidat záznam</button>
  </form>
</template>
<script>
import noteRepository from "../../data/NoteRepository";
import Auth from "../../data/Auth";

export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    createNote() {
      if (this.title.trim() || this.content.trim()) {
        var email = Auth.getAuth().currentUser.email;
        var uid = Auth.getAuth().currentUser.uid;

        var today = new Date();
        var date = today.getDate() + ". " + (today.getMonth() + 1) + ". " + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();

        noteRepository.create({ title: this.title, content: this.content, uid: uid, email: email, date: date }, err => {
          if (err) return this.$dispatch("alert", { type: "error", message: "Záznam se nepodařilo vytvořit" });
          this.title = "";
          this.content = "";
          this.$dispatch("alert", { type: "success", message: "Záznam vytvořen" });

          //If sorted by oldest
          if ($(".notes").hasClass("oldest")) {
            $(".note").each(function() {
              $(this).removeAttr("style");
            });

            var notesCount = $(".note").length;

            $(".note").each(function() {
              $(this).css("order", notesCount);

              notesCount -= 1;
            });
          }

          //If filtered by author
          if ($(".filter-current").text() != "Všichni") {
            $(".note").each(function() {
              if (
                $(this)
                  .find(".note-email")
                  .text() != $(".filter-current").text()
              ) {
                $(this).addClass("hidden");
              }
            });
          }
        });
      }
    }
  }
};
</script>
<style>
form.create-note {
  position: relative;
  max-width: calc(100% - 30px);
  width: 550px;
  height: 200px;
  background: #fff;
  border: 1px solid black;

  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
}
form.create-note textarea {
  margin-top: 15px;
}

form.create-note input,
form.create-note textarea {
  width: 100%;
  max-width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
  resize: none;
  font-family: inherit;
}
form.create-note button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: #66bb6a;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 150px;
  height: 40px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  transition: background-color 0.2s;
  user-select: none;
}

form.create-note button:hover {
  background: #43a047;
}
</style>

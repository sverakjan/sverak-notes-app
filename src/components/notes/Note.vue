<template>
  <div class="note" v-bind:class="[size]">
    <h2 class="note-title">{{ note.title }}</h2>
    <span class="note-author">{{ note.email }}</span>
    <span class="note-date">{{ note.date }}</span>
    <pre class="note-content">{{ note.content }}</pre>
    <div class="comments">
      <div class="comment" v-for="comment in note.comments">
        <div class="comment-author">{{ comment[0] }}</div>
        <div class="comment-content">{{ comment[1] }}</div>
      </div>
    </div>
    <div class="note-buttons">
      <button class="delete" type="button" v-on:click.stop="remove"><i class="fa fa-trash" aria-hidden="true"></i></button>
      <button class="edit" type="button" v-on:click="selectNote(note)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      <button class="comment" type="button" v-on:click="selectNoteComment(note)"><i class="fa fa-comments" aria-hidden="true"></i></button>
    </div>
  </div>
</template>
<script>
import noteRepository from "../../data/NoteRepository";
export default {
  props: ["note", "notex"],
  computed: {
    size() {
      let length = this.note.content.length;
      if (length < 500) {
        return "small";
      }
      return "medium";
    }
  },
  methods: {
    remove() {
      noteRepository.remove(this.note, err => {
        if (err) return this.$dispatch("alert", { type: "error", message: "Nepodařilo se záznamu odstranit" });
      });
    },
    selectNote({ key, title, content }) {
      // notify listeners that user selected a note
      // pass in a copy of the note to prevent edits on the original note in the array
      this.$dispatch("note.selected", { key, title, content });
    },
    selectNoteComment({ key, title, content, comments }) {
      // notify listeners that user selected a note
      // pass in a copy of the note to prevent edits on the original note in the array

      this.$dispatch("notex.selected", { key, title, content, comments });
    }
  }
};
</script>
<style>
.note {
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 10px;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: default;
  margin: 10px;
  width: calc(25% - 20px);

  display: flex;
  flex-direction: column;
}
.note.medium {
  width: calc(50% - 20px);
}

.note.hidden {
  display: none;
}

.note-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
  word-wrap: break-word;
}

.note-author {
  font-size: 0.85rem;
  display: block;
  color: gray;
  word-break: break-all;
}

.note-date {
  font-size: 0.85rem;
  display: block;
  margin-bottom: 10px;
  color: gray;
}

.note-content {
  font-size: 1rem;
  margin-bottom: 25px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}

.note-buttons {
  margin-top: auto;
}

.note button {
  color: #777;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 4px 0 0;
  float: right;
  margin-left: 5px;
  padding: 5px 10px;
  transform: translateX(15px);
  background: transparent;
}

.note:hover,
.note:focus {
  /* box-shadow: 0 7px 10px 0px rgba(0, 0, 0, 0.1); */
  /* transform: translateY(-5px); */
  /* cursor: pointer; */
}
.note:hover button,
.note:focus button {
  /* opacity: 0.6; */
}

.note button:focus {
  outline: none;
}

.note button.edit {
}

.note button.comment:hover {
  color: #66bb6a;
}

.note button.edit:hover {
  color: #66bb6a;
}

.note button.delete:hover {
  /* background: #d32f2f; */
  /* color: white; */
  color: #d32f2f;
}

.comment {
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 5px;
}

.comment-author {
  font-size: 0.85rem;
  display: block;
  color: gray;
  word-break: break-all;
}

.comment-content {
  font-size: 15px;
}

@media (max-width: 1100px) {
  .note {
    width: calc(50% - 20px);
  }

  .note.medium {
    width: calc(100% - 20px);
  }
}

@media (max-width: 600px) {
  .note {
    width: calc(100% - 20px);
  }
}
</style>

<template>
  <div class="note" v-bind:class="[size]">
    <h2 class="note-title">{{ note.title }}</h2>
    <span class="note-email">{{ note.email }}</span>
    <span class="note-date">{{ note.date }}</span>
    <pre class="note-content">{{ note.content }}</pre>
    <button class="delete" type="button" v-on:click.stop="remove"><i class="fa fa-trash" aria-hidden="true"></i></button>
    <button class="edit" type="button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
  </div>
</template>
<script>
import noteRepository from "../../data/NoteRepository";
export default {
  props: ["note"],
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
  margin: 12px 0;
  width: 240px; /* collumn size */
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: default;
}
.note.medium {
  width: 496px; /* medium = (col * 2) + gutter | 496px = (240px * 2) + 16px */
}
.note-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
  word-wrap: break-word;
}

.note-email {
  font-size: 0.85rem;
  display: block;
  color: gray;
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
  box-shadow: 0 7px 10px 0px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  cursor: pointer;
}
.note:hover button,
.note:focus button {
  /* opacity: 0.6; */
}

.note button.edit {
}

.note button.edit:hover {
  color: #66bb6a;
}

.note button.delete:hover {
  /* background: #d32f2f; */
  /* color: white; */
  color: #d32f2f;
}
</style>

<template>
  <div class="note" v-bind:class="[size]">
    <h2>{{note.title}}</h2>
    <pre>{{note.content}}</pre>
    <button type="button" v-on:click.stop="remove">
      <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <button class="edit" type="button">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
  </div>
</template>
<script>
import noteRepository from '../../data/NoteRepository'
export default {
  props: ['note'],
  computed: {
    size () {
      let length = this.note.content.length
      if (length < 500) {
        return 'small'
      }
      return 'medium'
    }
  },
  methods: {
    remove () {
      noteRepository.remove(this.note, (err) => {
        if (err) return this.$dispatch('alert', {type: 'error', message: 'Nepodařilo se poznámku odstranit'})
      })
    }
  }
}
</script>
<style>
.note{
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 12px 0;
  width: 240px; /* collumn size */
  transition: box-shadow .2s, transform 0.2s;
  cursor: default;
	
}
.note.medium{
  width: 496px; /* medium = (col * 2) + gutter | 496px = (240px * 2) + 16px */
}
.note h2{
  font-size: 1.2em;
  margin-bottom: 18px;
  word-wrap: break-word;
}
.note pre {
  font-size: 1em;
  margin-bottom: 25px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
.note button{
  background: #eee;
  border: none;
  font-size: 20px;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity .5s;
  margin: 0 4px 0 0;
	box-shadow: 0 2px 5px #ccc;
	border-radius: 7px;
	padding: 7px 15px;
	float: right;
	margin-left: 12px;
}

.note:hover, .note:focus{
  box-shadow: 0 7px 10px 0px rgba(0, 0, 0, 0.1);
	transform: translateY(-5px);
	cursor: pointer;
}
.note:hover button, .note:focus button{
  opacity: 0.6;
}
.note button:hover, .note button:focus{
  opacity: 1;
}
</style>

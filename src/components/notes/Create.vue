<template>
  <form class="create-note" v-on:submit.prevent="createNote">
    <input name="title" v-model="title" placeholder="Titulek"/>
    <textarea name="content" v-model="content" placeholder="Text poznámky..." rows="3">
    </textarea>
    <button type="submit"></button>
  </form>
</template>
<script>
import noteRepository from '../../data/NoteRepository'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    createNote () {
      if (this.title.trim() || this.content.trim()) {
        noteRepository.create({title: this.title, content: this.content}, (err) => {
          if (err) return this.$dispatch('alert', {type: 'error', message: 'Poznámku se nepodařilo vytvořit'})
          this.title = ''
          this.content = ''
          this.$dispatch('alert', {type: 'success', message: 'Poznámka vytvořena'})
        })
      }
    }
  }
}
</script>
<style>
form.create-note{
  position: relative;
  width: 600px;
	height: 200px;
  max-width: 100%;
  margin: 30px auto;
	margin-top: 0;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}
form.create-note textarea{
	margin-top: 15px;
}

form.create-note input, form.create-note textarea{
  width: 100%;
  max-width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
	resize: none;
}
form.create-note button{
  position: absolute;
  right: 18px;
  bottom: -17px;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
	outline: none;
	font-size: 35px;
}

form.create-note button:before{
	content: "\002B";
	position: absolute;
	top: calc(50% - 3px);
	left: 50%;
	transform: translate(-50%,-50%);
}
</style>

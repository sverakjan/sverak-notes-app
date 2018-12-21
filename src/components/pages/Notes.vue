<template>
  <div class="wrapper">
		<div class="app-container">
	    <create-note-form></create-note-form>
  	  <notes></notes>
    	<update-modal :note.sync="selectedNote"></update-modal>
		</div>
		<div class="guide-container">

<div class="item-section">
			<h2 class="item-heading">
				Přidání poznámky
			</h2>

			<div class="guide-item">
				<h3>Formlulář přidání poznámky</h3>
			<pre>

<span class="file-line">Create.vue:1</span>

&lt;template>
  &lt;form class="create-note" <strong>v-on:submit.prevent="createNote"</strong>>
    &lt;input name="title" v-model="title" placeholder="Titulek"/>
    &lt;textarea name="content" v-model="content" placeholder="Text poznámky..." rows="3">
    &lt;/textarea>
    &lt;button type="submit">+&lt;/button>
  &lt;/form>
&lt;/template>
			</pre>

			<p>
			Atribut
			<code><strong>v-on:submit.prevent="createNote"</strong></code>
			na formuláři říká, jaká funkce bude zavolána po odeslání formuláře: <code><strong>CreateNote()</strong></code>
			</p>

			</div>



			<div class="guide-item">
				<h3>Přidání poznámky, funkce <code><strong>CreateNote()</strong></code></h3>
			<pre>

<span class="file-line">Create.vue:20</span>

createNote () {
  if (this.title.trim() || this.content.trim()) {
    noteRepository.create({title: this.title, content: this.content})
  }
}
			</pre>
			<p>A komplexnější varianta s ošetřením chyby a upozorněním pro uživatele:</p>

			<pre>

<span class="file-line">Create.vue:20</span>

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
			</pre>

			<p>
			Funkce	<code><strong>this.title.trim()</strong></code> odstraní z řetezce mezery a zalomení řádků. Podmínka tedy bude splněna pokud v hodnotě titulku je nějaký znak, který není <em>whitespace.</em>
			</p>

			<p>
				V takovém případě je volána funkce <code><strong>noteRepository.create()</strong></code>, které předáváme hodnotu <code>title</code> (Titulek) a <code>content</code> (Text poznámky) z elementů input a textarea.
			</p>

			</div>


			<div class="guide-item">
				<h3>Přidání poznámky, funkce <code><strong>noteRepository.create()</strong></code></h3>
			<pre>

<span class="file-line">NoteRepository.js:18</span>

create ({title = '', content = ''}, onComplete) {
  this.notesRef.push({title, content}, onComplete)
}
			</pre>

			<p>
			<code>notesRef</code> je pole obsahující všechny záznamy (poznámky).
			Funkce tedy “vkládá” položku do pole. 
			</p>

			<p>
			Tato funkce odpovídá Firebase metodě určené pro vkládání položek do databáze viz.
			<a href="https://firebase.google.com/docs/database/admin/save-data" target="_blank">https://firebase.google.com/docs/database/admin/save-data</a>
			</p>

			<p>
			<strong>Přístup ke konkrétní databázi:</strong>
			</p>

			<pre>
<span class="file-line">NoteRepository.js:13</span>

constructor () {
  super()
  this.ref = new Firebase('https://sverak-notes-app.firebaseio.com')   
}
			</pre>

			<p>
			<strong>Načtení záznamů z databáze do pole zmíněného výše</strong>
			</p>

			<pre>
<span class="file-line">NoteRepository.js:10</span>

get notesRef () {
  return this.ref.child(`users/${this.uid}/notes`)
}
			</pre>

			</div>

</div>

<div class="item-section">
	<h2 class="item-heading">Výpis poznámek</h2>

	<div class="guide-item">
				<h3>Šablona položky příručky</h3>
			<pre>

<span class="file-line">JmenoSouboru.js:cislo-radku</span>

prikladFunkce () {
  //Komentář
  objekt.funkce();
  prikaz;
}
			</pre>

			<p>
			Doplňující popisek, vysvětlnení funkce / principu.
			Zmiňovaný kus kódu je tučně
			<code><strong>pro="lepsi-citelnost"</strong></code>
			Součátí textu může <a href="#">samozřejmě být i odkaz</a> na externí stránku (dokumentace atd).
			</p>

			</div>
</div>

<div class="item-section">
	<h2 class="item-heading">Mazání poznámky</h2>

		<div class="guide-item">
				<h3>Šablona položky příručky</h3>
			<pre>

<span class="file-line">JmenoSouboru.js:cislo-radku</span>

prikladFunkce () {
  //Komentář
  objekt.funkce();
  prikaz;
}
			</pre>

			<p>
			Doplňující popisek, vysvětlnení funkce / principu.
			Zmiňovaný kus kódu je tučně
			<code><strong>pro="lepsi-citelnost"</strong></code>
			Součátí textu může <a href="#">samozřejmě být i odkaz</a> na externí stránku (dokumentace atd).
			</p>

			</div>
</div>
		</div>
  </div>
</template>
<script>
import Notes from 'src/components/notes/Index'
import CreateNoteForm from 'src/components/notes/Create'
import UpdateModal from 'src/components/notes/UpdateModal'
export default {
  components: {
    Notes,
    CreateNoteForm,
    UpdateModal
  },
  data () {
    return {
      selectedNote: null
    }
  },
  events: {
    'note.selected': function (note) {
      this.selectedNote = note
    }
  }
}
$(document).ready(function () {
  $('.guide-item').hide()
  $('.item-heading').click(function () {
    $(this).siblings('.guide-item').slideToggle()
  })
})
</script>
<style>

.wrapper{
	position: relative;
}

.app-container{
	width: 70%;
	height: calc(100vh - 50px);
	overflow-y: scroll;
	padding: 10px;
}

.guide-container{
	width: 30%;
	background: #ddd;
	height: 100%;
	min-height: calc(100vh - 100px);
	position: absolute;
	top: 0;
	right: 0;
	padding: 10px;
	overflow-y: scroll;
	border-left: 2px solid #aaa
}

.item-section{
	background: #bbb;
	padding-bottom: 1px;
	margin-bottom: 10px;
	border-radius: 3px;
}

.item-heading{
	padding: 10px 0;
	padding-left: 15px;
}

.item-heading:hover{
	cursor: pointer;

}

.guide-item{
	background: white;
	padding: 15px;
	font-size: 15px;
	margin: 15px;
	margin-top: 0;
	border-radius: 3px;
}

.guide-item:last-child{
}

.guide-item pre{
	font-size: 14px;
	overflow-x: scroll;
	margin-bottom: 15px;
}

.guide-item p{
	margin-bottom: 15px;
}

.guide-item code{
	word-break: break-all;
}

.guide-item a{
	color: blue;
	word-break: break-all;
}

.guide-item a:hover{
	text-decoration: none;
}

.file-line{
	color: gray;
	font-style: italic;
}

</style>


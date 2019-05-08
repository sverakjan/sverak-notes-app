<template>
  <div class="wrapper">
    <div class="app-container">
      <create-note-form></create-note-form>
      <div class="filters hidden">
        <div class="order">
          <span class="filter-title">Řadit od:</span>
          <div>
            <span class="order-new active">Nejnovějšího</span>
            <span class="order-old">Nejstaršího</span>
          </div>
        </div>
        <div class="author">
          <span class="filter-title">Filtrovat autora:</span>
          <span class="filter-current">Všichni</span>
          <div class="filter-list hidden">
            <div class="filter-list-inner"></div>
          </div>
        </div>
      </div>
      <notes></notes>
      <update-modal :note.sync="selectedNote"></update-modal>
    </div>
    <span class="guide-button open">
      <i class="fa fa-book"></i>
    </span>
    <div class="guide-container open">
      <div class="item-section">
        <h2 class="item-heading">
          <i class="fa fa-database" aria-hidden="true"></i>
          Inicializace databáze
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </h2>

        <div class="guide-item">
          <h3>Importování Firebase</h3>
          <pre>

<span class="file-line">Firebase.js:1</span>

import * as firebase from "firebase";
			</pre>

          <p>
            Firebase je součástí NPM jako balíče, proto můžeme Firebase jednoduše přidat do projektu pomocí příkazu
            <code>npm i firebase --save</code>
            .
          </p>
        </div>

        <div class="guide-item">
          <h3>Konfigurace</h3>
          <pre>

<span class="file-line">Firebase.js:3</span>

const config = {
  apiKey: "AIzaSyDhvdDaXVBc25RVdZA4DKdMurqZUd1ejUE",
  authDomain: "sverak-notes-app.firebaseapp.com",
  databaseURL: "https://sverak-notes-app.firebaseio.com",
  projectId: "sverak-notes-app"
};
			</pre>

          <p>
            <code>apiKey:</code>
            nejdůležitější položka při inicializaci, bez vygenerovaného klíče není možné přistupovat k API
          </p>
          <p>
            <code>authDomain:</code>
            doména k autentizaci
          </p>
          <p>
            <code>databaseURL:</code>
            adresa databáze
          </p>
          <p>
            <code>projectId:</code>
            Jedinečné id projektu, vybírané při tvorbě projektu v administraci firebase.
          </p>
        </div>

        <div class="guide-item">
          <h3>Export inicializace</h3>
          <pre>

<span class="file-line">Firebase.js:12</span>

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
			</pre>

          <p>Tento export nám umožnuje přístup k databázi, bez nutnosti inicializace v každém souboru, kde k téže databázi přistupujeme a tím zabraňuje redundantnosti a možným chybám s tím spojeným.</p>
        </div>
      </div>

      <div class="item-section">
        <h2 class="item-heading">
          <i class="fa fa-list-ul" aria-hidden="true"></i>
          Výpis záznamů
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </h2>
        <div class="guide-item">
          <h3>Přístup k záznamům</h3>
          <p></p>
          <p><strong>Přístup ke konkrétní databázi:</strong></p>

          <pre>
<span class="file-line">NoteRepository.js:13</span>

constructor () {
  super()
  var database = firebase.database(); 
}
			</pre>

          <p><strong>Reference pro zápis a čtení z databáze</strong></p>

          <p>
            V tomto případě, budou všechny záznamy do databáze a čtení z databáze na větvi
            <code>notes</code>
          </p>

          <pre>
<span class="file-line">NoteRepository.js:10</span>

get notesRef () {
  return firebase.database().ref(`notes`);
}
			</pre>
          <pre>

<span class="file-line">Index.vue:13</span>

import Note from './Note'
import noteRepository from '../../data/NoteRepository'
			</pre>

          <p>
            Pro výpis záznamů jsou přitomné tyto dva důležité importy ze souborů:

            <code><strong>Note.vue</strong></code>
            kde mimo jiné najdeme markup pro samotný záznam a

            <code><strong>NoteRepository.js</strong></code>
            kde získáváme přistup k samotné databázi a událostem jako přidání, aktualizace a smazaní záznamu.
          </p>

          <p>
            Jednotlivé záznamy jsou přísupné jako pole a u každého záznamu máme přistup ke třem hodnotám
            <code><strong>note.key</strong></code>
            (jedinečný identifikátor záznamu),
            <code><strong>note.title</strong></code>
            (text titulku) a
            <code>
              <strong>note.content</strong>
              (samotný text záznamu)
            </code>
            . Při samotném výpisu záznamu na stránky využijeme poslední dvě zmíněné.
          </p>
        </div>

        <div class="guide-item">
          <h3>Markup záznamu</h3>
          <pre>

<span class="file-line">Note.vue:1</span>

&lt;template>
  &lt;div class="note" v-bind:class="[size]">
    &lt;h2>{{<strong>note.title</strong>}}&lt;/h2>
    &lt;pre>{{<strong>note.content</strong>}}&lt;/pre>
    &lt;button type="button" v-on:click.stop="remove">
      &lt;i class="fa fa-trash-o" aria-hidden="true">&lt;/i>
    &lt;/button>
    &lt;button class="edit" type="button">
      &lt;i class="fa fa-pencil" aria-hidden="true">&lt;/i>
    &lt;/button>
  &lt;/div>
&lt;/template>
			</pre>

          <p>
            Markup výpisu jednotlivých záznamů je statický, jedinnou promměnou složkou je text titulku a obsahu záznamu. Tyto hodnoty jsou reprezentovány jako
            <code><strong>note.title</strong></code>
            a
            <code><strong>note.content</strong></code>
            .
          </p>
        </div>
      </div>

      <div class="item-section">
        <h2 class="item-heading">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Přidání záznamu
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </h2>

        <div class="guide-item">
          <h3>Formlulář přidání záznamu</h3>
          <pre>

<span class="file-line">Create.vue:1</span>

&lt;template>
  &lt;form class="create-note" <strong>v-on:submit.prevent="createNote"</strong>>
    &lt;input name="title" v-model="title" placeholder="Titulek"/>
    &lt;textarea name="content" v-model="content" placeholder="Text záznamu..." rows="3">
    &lt;/textarea>
    &lt;button type="submit">+&lt;/button>
  &lt;/form>
&lt;/template>
			</pre>

          <p>
            Atribut
            <code><strong>v-on:submit.prevent="createNote"</strong></code>
            na formuláři říká, jaká funkce bude zavolána po odeslání formuláře:
            <code><strong>CreateNote()</strong></code>
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Přidání záznamu, funkce
            <code><strong>CreateNote()</strong></code>
          </h3>
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
    if (err) return this.$dispatch('alert', {type: 'error', message: 'Záznam se nepodařilo vytvořit'})
      this.title = ''
      this.content = ''
      this.$dispatch('alert', {type: 'success', message: 'Záznamu vytvořen'})
    })
  }
}
			</pre>

          <p>
            Funkce
            <code><strong>this.title.trim()</strong></code>
            odstraní z řetezce mezery a zalomení řádků. Podmínka tedy bude splněna pokud v hodnotě titulku je nějaký znak, který není
            <em>whitespace.</em>
          </p>

          <p>Tato funkce je použita pouze pro kontrolu při tvorbě záznamu, Záznam je poté uložena a i vypysována včerně těchto znaků. Vypisované záznamy jsou tedy i včetně mezer a zalomených řádků.</p>

          <p>
            V takovém případě je volána funkce
            <code><strong>noteRepository.create()</strong></code>
            , které předáváme hodnotu
            <code>title</code>
            (Titulek) a
            <code>content</code>
            (Text záznamu) z elementů input a textarea.
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Přidání záznamu, funkce
            <code><strong>noteRepository.create()</strong></code>
          </h3>
          <pre>

<span class="file-line">NoteRepository.js:19</span>

create ({title = '', content = ''}, onComplete) {
  this.notesRef.push({title, content}, onComplete)
}
			</pre>

          <p>
            <code>notesRef</code>
            je pole obsahující všechny záznamy. Funkce tedy “vkládá” položku do pole.
          </p>

          <p>
            Tato funkce odpovídá Firebase metodě určené pro vkládání položek do databáze viz.
            <a href="https://firebase.google.com/docs/database/admin/save-data" target="_blank">https://firebase.google.com/docs/database/admin/save-data</a>
          </p>
        </div>
      </div>

      <div class="item-section">
        <h2 class="item-heading">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          Úprava záznamu
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </h2>

        <div class="guide-item">
          <h3>Modal pro úpravu záznamu</h3>
          <pre>

<span class="file-line">UpdateModal.vue:1</span>

&lt;template>
  &lt;div v-if="note" transition="modal" class="backdrop" v-on:click="dismissModal">
    &lt;form class="edit-note" v-on:submit.prevent="update" v-on:click.stop="">
      &lt;input name="title" v-model="note.title" placeholder="Title"/>
      &lt;textarea name="content" v-model="note.content" placeholder="Text goes here..." rows="8">&lt;/textarea>
      &lt;button type="button" v-on:click="remove">
        &lt;i class="fa fa-trash-o" aria-hidden="true">&lt;/i>
      &lt;/button>
      &lt;button type="submit">Hotovo&lt;/button>
    &lt;/form>
  &lt;/div>
&lt;/template>
			</pre>

          <p>
            Atribut
            <code><strong>v-on:submit.prevent="update"</strong></code>
            na formuláři říká, jaká funkce bude zavolána po odeslání formuláře:
            <code><strong>update()</strong></code>
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Funkce
            <code>update()</code>
          </h3>
          <pre>

<span class="file-line">UpdateModal.vue:25</span>

update () {
  noteRepository.update(this.note, (err) => {
    if (err) return this.$dispatch('alert', {type: 'error', message: 'Nepodařilo se záznam aktualizovat'})
    this.dismissModal()
    this.$dispatch('alert', {type: 'success', message: 'Záznam byl upraven'})
  })
}
			</pre>

          <p>
            Funkce
            <code><strong>update()</strong></code>
            ve skutečnosti volá funkci ze souboru
            <code><strong>noteRepository</strong></code>
            a záznam na který bylo klinuto předává funkci jako parametr. Né element záznamu jaký je vykreslený na stránkce, ale
            <code><strong>key</strong></code>
            tedy jednoznačný identifikátor konkrétního záznamu a nové texty zadané ve formuláři modalu.
          </p>

          <p>
            V případě, že funkce
            <code><strong>noteRepository.update()</strong></code>
            vrátí chybu, tato funkce uživateli zobrazí výstražnou hlášku. Pokud se tak nestane, zamená to že záznam byl úspěšně upraven a uživateli je zobrazena hláška oznamusící úspěch operace.
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Funkce
            <code>NoteRepository.update()</code>
          </h3>
          <pre>

<span class="file-line">NoteRepository.js:23</span>

update ({key, title = '', content = ''}, onComplete) {
  this.notesRef.child(key).update({title, content}, onComplete)
}
			</pre>

          <p>Funkce na základně klíče najde položku v poli záznamů a pokud byla poskytnuta nová hodnota pro titulek, aktualizuje tuto hodnotu přímo v poli databáze. To samé je provedeno pro hodnotu obsahu záznamu.</p>

          <p>Tím je záznam aktualizována v databázi, ale na stránce viditelné uživatelem bude vidět stále původní verze.</p>
        </div>

        <div class="guide-item">
          <h3>Aktualizace záznamu na stránce</h3>
          <pre>

<span class="file-line">Index.vue:66</span>

noteRepository.on('changed', ({key, title, content}) => {
  let note = noteRepository.find(this.notes, key)
  note.title = title
  note.content = content
})
			</pre>

          <p>Poté co je záznam aktualizovan v poli databáze, je vyvolána událost, jež aktualizuje reprezentaci záznamu, kterou vidí na stránce uživatel.</p>
        </div>
      </div>

      <div class="item-section">
        <h2 class="item-heading">
          <i class="fa fa-trash" aria-hidden="true"></i>
          Mazání záznamu
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </h2>

        <div class="guide-item">
          <h3>Odstranění záznamu při kliknutí na tlačítko</h3>
          <pre>

<span class="file-line">Note.vue:5</span>

&lt;button type="button" v-on:click.stop="remove">
			</pre>

          <p>
            Atribut
            <code><strong>v-on:submit.prevent="remove"</strong></code>
            na tlačítku záznamu říká, jaká funkce (
            <code><strong>remove()</strong></code>
            ) bude zavolána při kliku na tlačítko zobrazovaném jako ikona popelnice.
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Funkce
            <code>remove()</code>
          </h3>
          <pre>

<span class="file-line">Note.vue:27</span>

remove () {
  noteRepository.remove(this.note, (err) => {
    if (err) return this.$dispatch('alert', {type: 'error', message: 'Nepodařilo se odstranit záznam'})
  })
}
			</pre>

          <p>
            Funkce
            <code><strong>remove()</strong></code>
            ve skutečnosti volá funkci ze souboru
            <code><strong>noteRepository</strong></code>
            a záznam na který bylo klinuto předává funkci jako parametr (Né element záznamu jaký je vykreslený na stránkce, ale
            <code><strong>key</strong></code>
            tedy jednoznačný identifikátor konkrétního záznamu). V případě, že funkce
            <code><strong>noteRepository.remove()</strong></code>
            vrátí chybu, tato funkce uživateli zobrazí výstražnou hlášku.
          </p>
        </div>

        <div class="guide-item">
          <h3>
            Funkce
            <code>NoteRepository.remove()</code>
          </h3>
          <pre>

<span class="file-line">NoteRepository.js:28</span>

remove ({key}, onComplete) {
  this.notesRef.child(key).remove(onComplete)
}
			</pre>

          <p>Funkce pouze odstraní položku z pole obsahující všechny záznamy.</p>

          <p>To ostraní záznamy z databáze, ale pro uživatele bude na stránce stále viditelný.</p>
        </div>

        <div class="guide-item">
          <h3>Odstranění záznamu ze stránky</h3>
          <pre>

<span class="file-line">Index.vue:71</span>

noteRepository.on('removed', ({key}) => {
  let note = noteRepository.find(this.notes, key)
  this.notes.$remove(note)
})
			</pre>

          <p>Poté co je záznam odstraněn z pole databáze, je vyvolána událost, jež ostraní reprezentaci oného záznamu zobrazovaného na stránce. Poté již záznam není součástí databáze a taktéž není viditelný pro uživatele.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notes from "src/components/notes/Index";
import CreateNoteForm from "src/components/notes/Create";
import UpdateModal from "src/components/notes/UpdateModal";
import { functions } from "firebase";
export default {
  components: {
    Notes,
    CreateNoteForm,
    UpdateModal
  },
  data() {
    return {
      selectedNote: null
    };
  },
  events: {
    "note.selected": function(note) {
      this.selectedNote = note;
    }
  }
};

$(document).ready(function() {
  guideInitCheck();
  notesInitCheck();

  $(".sign-out-button").click(function() {
    guideInitCheck();
    notesInitCheck();
  });
});

function guideInitCheck() {
  clearInterval(guideTimer);

  var guideTimer = setInterval(function() {
    if ($(".guide-item").length > 0) {
      clearInterval(guideTimer);

      guideInit();
    }
  }, 100);
}

function notesInitCheck() {
  clearInterval(notesTimer);

  var notesTimer = setInterval(function() {
    if ($(".note").length > 0) {
      clearInterval(notesTimer);

      orderSort();
      filterAuthorInit();
    }
  }, 100);
}

function guideInit() {
  $(".item-heading").click(function() {
    $(this)
      .siblings(".guide-item")
      .stop()
      .slideToggle(300);
    $(this)
      .closest(".item-section")
      .toggleClass("open");
    $(this).toggleClass("open");
  });

  $(".guide-button").click(function() {
    $(this).toggleClass("open");
    $(".guide-container").toggleClass("open");
  });
}

function orderSort() {
  $(".filters").removeClass("hidden");

  $(".order-new").click(function() {
    $(".order-old").removeClass("active");
    $(".order-new").addClass("active");

    $(".notes").removeClass("oldest");

    $(".note").each(function() {
      $(this).removeAttr("style");
    });
  });

  $(".order-old").click(function() {
    $(".order-new").removeClass("active");
    $(".order-old").addClass("active");

    $(".notes").addClass("oldest");

    var notesCount = $(".note").length;

    $(".note").each(function() {
      $(this).css("order", notesCount);

      notesCount -= 1;
    });
  });
}

function filterAuthorInit() {
  var notesCount = 0;
  var namesArr = ["Všichni"];

  $(".note").each(function() {
    var thisEmail = $(this)
      .find(".note-email")
      .text();
    var presenceCheck = false;

    for (var i = 0; i < namesArr.length; i++) {
      if (thisEmail === namesArr[i]) {
        presenceCheck = true;
      }
    }

    if (presenceCheck === false) {
      namesArr.push(thisEmail);
    }
  });

  for (var j = 0; j < namesArr.length; j++) {
    $(".filter-list-inner").append('<span class="filter-item">' + namesArr[j] + "</span>");
  }

  filterAuthor();
}

function filterAuthor() {
  $(".filter-current").click(function() {
    $(".filter-list").removeClass("hidden");
  });

  $(".filter-item").click(function() {
    $(".filter-list").addClass("hidden");

    var filteredEmail = $(this).text();

    $(".note").each(function() {
      $(this).removeClass("hidden");
    });

    if (filteredEmail != "Všichni") {
      $(".note").each(function() {
        if (
          $(this)
            .find(".note-email")
            .text() != filteredEmail
        ) {
          $(this).addClass("hidden");
        }
      });
    }

    $(".filter-current").text(filteredEmail);
  });
}
</script>
<style>
.wrapper {
  position: relative;
  height: calc(100vh - 130px);
}

.app-container {
  width: calc(100% - 350px);
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
  padding-top: 30px;
  background-color: #f5f5f5;
}

.filters {
  max-width: calc(100% - 30px);
  width: 550px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
}

.filters.hidden {
  visibility: hidden;
}

.filter-title {
  font-size: 18px;
  margin-bottom: 8px;
  display: block;
}

.order {
  width: 50%;
}

.order div {
  display: flex;
}

.order-new {
  margin-right: 5px;
}

.order-new,
.order-old {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  display: block;
  text-align: center;
  background: #cfd8dc;
  color: black;
  margin-bottom: 5px;
  transition: background-color 0.2s;
  user-select: none;
}

.order-new:hover,
.order-old:hover {
  background: #b0bec5;
}

.order .active {
  background: #66bb6a;
  color: #fff;
  cursor: default;
}

.author {
  width: 50%;
}

.filter-current {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  display: block;
  text-align: center;
  background: #66bb6a;
  color: white;
  transition: background-color 0.2s;
  user-select: none;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter-list {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.filter-list.hidden {
  display: none;
}

.filter-list-inner {
  position: absolute;
  width: 100%;
  z-index: 10;
}

.filter-item {
  display: block;
  text-align: center;
  padding: 8px 10px;
  cursor: pointer;
  color: #cfd8dc;
  display: block;
  text-align: center;
  background: #cfd8dc;
  color: black;
  transition: background-color 0.2s;
  user-select: none;
  word-break: break-all;
}

.filter-item:first-child {
  border-radius: 4px 4px 0 0;
}

.filter-item:last-child {
  border-radius: 0 0 4px 4px;
}

.filter-item:hover {
  background: #b0bec5;
}

.notes {
  display: flex;
  flex-wrap: wrap;
}

.oldest .note {
  order: 99999;
}

.guide-container {
  width: 350px;
  height: 100%;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
  overflow-y: scroll;
  box-shadow: -5px 0 10px 0 rgba(0, 0, 0, 0.05);
}

.item-section {
  background: #fff;
  padding-bottom: 1px;
  /* margin-bottom: 20px; */
  transition: background-color 0.3s;
}

.item-section:hover {
  background: #b0bec5;
}

.item-section.open {
  background: #b0bec5;
}

.item-section.open:nth-child(even) {
  background: #cfd8dc;
}

.item-heading {
  padding: 13px 0;
  padding-left: 15px;
  font-size: 20px;
  display: flex;
  align-items: center;
  user-select: none;
  color: #333;
}

.item-heading i {
  margin-right: 15px;
}

.item-heading .fa-caret-down {
  margin-left: auto;
  margin-right: 20px;
  transition: transform 0.3s;
  backface-visibility: hidden;
}

.item-heading.open .fa-caret-down {
  transform: rotate(180deg);
}

.item-heading:hover {
  cursor: pointer;
}

.guide-item {
  background: #fff;
  padding: 15px;
  font-size: 15px;
  margin: 15px;
  margin-top: 0;
  border-radius: 3px;

  display: none;
}

.guide-item:last-child {
}

.guide-item pre {
  font-size: 14px;
  overflow-x: auto;
  margin-bottom: 15px;
}

.guide-item p {
  margin-bottom: 15px;
}

.guide-item code {
  word-break: break-all;
}

.guide-item a {
  color: blue;
  word-break: break-all;
}

.guide-item a:hover {
  text-decoration: none;
}

.file-line {
  color: gray;
  font-style: italic;
}

@media (max-width: 1400px) {
  .app-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .guide-container {
    position: fixed;
    top: 100px;
    right: 0;
    transition: transform 0.2s;
    transform: translateX(350px);
  }

  .guide-button {
    width: 40px;
    height: 40px;
    background: #66bb6a;
    position: absolute;
    top: 0;
    right: 350px;
    transition: transform 0.2s, background-color 0.2s;
    transform: translateX(350px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px 0 0 4px;
    color: white;
  }

  .guide-button:hover {
    cursor: pointer;
    background: #43a047;
  }

  .guide-button i {
    font-size: 20px;
  }

  .guide-container.open,
  .guide-button.open {
    transform: none;
  }
}

@media (max-width: 1000px) {
  .filters {
    width: 300px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .order {
    width: 100%;
    max-width: 227px;
    margin-bottom: 25px;
    margin-top: 10px;
  }

  .author {
    width: 100%;
    max-width: 227px;
  }
}

@media (max-width: 390px) {
  .guide-container {
    width: 280px;

    transform: translateX(280px);
  }

  .guide-button {
    right: 280px;
    transform: translateX(280px);
  }
}
</style>

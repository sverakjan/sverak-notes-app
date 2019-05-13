<template>
  <div class="notes" v-el:notes>
    <note v-for="note in filteredNotes" :note="note"></note>
  </div>
</template>
<script>
import Masonry from "masonry-layout";
import Note from "./Note";
import noteRepository from "../../data/NoteRepository";
import { functions } from "firebase";
export default {
  components: {
    Note
  },
  data() {
    return {
      notes: [],
      searchQuery: ""
    };
  },
  methods: {},
  computed: {
    filteredNotes() {
      return this.notes.filter(note => {
        if (this.searchQuery) return note.title.indexOf(this.searchQuery) !== -1 || note.content.indexOf(this.searchQuery) !== -1; // returns truthy if query is found in title or content
        return true;
      });
    }
  },
  ready() {
    noteRepository.on("added", note => {
      this.notes.unshift(note); // add the note to the beginning of the array

      setTimeout(function() {
        $(".comment-author").each(function() {
          if ($(this).text() === "") {
            $(this)
              .closest(".comment")
              .addClass("hidden");
          }
        });

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

        $(".filter-list-inner span").each(function() {
          $(this).remove();
        });

        for (var j = 0; j < namesArr.length; j++) {
          $(".filter-list-inner").append('<span class="filter-item">' + namesArr[j] + "</span>");
        }
      }, 0);
    });
    noteRepository.on("changed", ({ key, title, content, comments }) => {
      let note = noteRepository.find(this.notes, key); // get specific note from the notes in our VM by key
      note.title = title;
      note.content = content;
      note.comments = comments;

      setTimeout(function() {
        $(".comment-author").each(function() {
          if ($(this).text() === "") {
            $(this)
              .closest(".comment")
              .addClass("hidden");
          }
        });

        var currentUser = $(".user-title").text();
        $(".comment").each(function() {
          if (
            $(this)
              .find(".comment-author")
              .text() != currentUser
          ) {
            $(this)
              .find(".comment-buttons")
              .remove();
          }
        });
      }, 0);
    });
    noteRepository.on("removed", ({ key }) => {
      let note = noteRepository.find(this.notes, key); // get specific note from the notes in our VM by key
      this.notes.$remove(note); // remove note from notes array

      var notesCount = 0;
      var namesArr = ["Všichni"];

      setTimeout(function() {
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

        $(".filter-list-inner span").each(function() {
          $(this).remove();
        });

        for (var j = 0; j < namesArr.length; j++) {
          $(".filter-list-inner").append('<span class="filter-item">' + namesArr[j] + "</span>");
        }
      }, 0);
    });
    noteRepository.attachFirebaseListeners();
  }
};
</script>

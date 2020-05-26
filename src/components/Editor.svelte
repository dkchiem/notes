<script>
  import marked from 'marked';
  import hljs from 'highlight.js/lib/core';
  import langMarkdown from 'highlight.js/lib/languages/markdown';
  import { onMount } from 'svelte';

  import CodeMirror from 'codemirror';
  import emmet from '@emmetio/codemirror-plugin';
  import '../styles/codemirror.css';

  let html = '';
  let markdownField;
  let editor;

  onMount(() => {
    emmet(CodeMirror);

    editor = CodeMirror.fromTextArea(markdownField, {
      lineNumbers: true,
      mode: 'text/html',
      extraKeys: {
        Tab: 'emmetExpandAbbreviation',
        Esc: 'emmetResetAbbreviation',
        Enter: 'emmetInsertLineBreak',
      },
    });
    markdownField = editor.getInputField();
    markdownField.addEventListener('keydown', makeMarkdown, true);
  });

  // hljs.registerLanguage('markdown', langMarkdown);

  function makeMarkdown() {
    const textEntered = editor.getValue();
    html = marked(textEntered);
  }
</script>

<style lang="scss">
  @import 'src/styles/_colors.scss';
  @import 'src/styles/_variables.scss';

  #container {
    display: flex;
    flex-direction: column;
    height: 100%;
    #title {
      width: 100%;
      padding: 10px 20px;
      border: $border;
      font-size: 1.5rem;
      margin-bottom: 10px;
      border-radius: 10px;
    }

    #content {
      flex: 1;
      display: grid;
      grid-gap: 10px;
      grid-template-columns: 1fr 1fr;
      #result {
        background-color: white;
        border: $border;
        border-radius: 10px;
        padding: 20px;
        min-width: 1fr;
        overflow: scroll;
      }
      #markdown {
        background-color: white;
        border: $border;
        border-radius: 10px;
        padding: 20px;
        min-width: 1fr;
        resize: none;
        font-size: 1rem;
        outline: none;
        font-family: monospace;
        overflow: scroll;
      }
    }
  }

  // [contenteditable][placeholder]:empty:before {
  //   content: attr(placeholder);
  //   position: absolute;
  //   color: gray;
  //   background-color: transparent;
  // }
</style>

<div id="container">
  <input id="title" type="text" placeholder="Title" />
  <div id="content">
    <!-- <div
      id="markdown"
      contenteditable="true"
      on:input={makeMarkdown}
      bind:this={markdownField}
      placeholder="Markdown" /> -->
    <textarea
      name="markdown"
      id="markdown"
      cols="30"
      rows="10"
      bind:this={markdownField} />
    <div id="result">
      {@html html}
    </div>
  </div>
</div>

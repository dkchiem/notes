<script>
  import marked from 'marked';
  import CodeMirror from 'codemirror';
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  import '../styles/codemirror.css';
  import 'github-markdown-css/github-markdown.css';

  export let title = '',
    markdown = '';

  let html = '';
  let markdownField;
  let editor;

  onMount(() => {
    editor = CodeMirror.fromTextArea(markdownField, {
      mode: 'markdown',
      lineNumbers: true,
      lineWrapping: true,
      highlightFormatting: true,
    });

    markdownField = editor.getInputField();
    markdownField.addEventListener('keyup', makeMarkdown, true);
    //markdown && editor.getDoc().setValue(markdown);
    //console.log(CodeMirror.modes);
  });

  $: if (markdown && editor) {
    editor.getDoc().setValue(markdown);
    makeMarkdown();
  }

  // hljs.registerLanguage('markdown', langMarkdown);

  function makeMarkdown() {
    const textEntered = editor.getValue();
    marked.setOptions({
      highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
      },
    });
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
        min-width: 1fr;
        position: relative;
        #result-content {
          padding: 20px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: scroll;
        }
      }
      #markdown {
        background-color: white;
        border: $border;
        border-radius: 10px;
        padding: 20px;
        min-width: 1fr;
        font-size: 1rem;
        outline: none;
        font-family: monospace;
      }
    }

    .codeArea {
      margin-top: 0;
      height: 100%;
      position: relative;
      max-height: 100%;
    }
  }
</style>

<div id="container">
  <input
    id="title"
    type="text"
    placeholder="Title"
    bind:value={title}
    autocomplete="off" />
  <div id="content">

    <div class="codeArea">
      <textarea
        name="markdown"
        id="markdown"
        cols="30"
        rows="10"
        bind:this={markdownField} />
    </div>

    <div id="result" class="markdown-body">
      <div id="result-content">
        {@html html}
      </div>
    </div>
  </div>
</div>

import "./Markdown_github.css";
import "highlight.js/styles/github.css";

import React from 'react';
import highlight from 'highlight.js';
import marked from 'marked';

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

const renderer = new marked.Renderer();

/**
 * Espaço de texto rico, não editável, com sintaxe Markdown Github
 * 
 * Uso básico:
 * ~~~js
 * <MarkdownViewer content={content}></MarkdownViewer>
 * ~~~
 */
function MarkdownViewer(props) {
    const { 
        content,
        ...otherProps
    } = props;
    const compiled = marked(content, {renderer: renderer});
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{__html : compiled}} {...otherProps}></div>
    )
}

export default MarkdownViewer;
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
const marked = window.marked;

marked.setOptions({
  gfm: true,
  breaks: true,
});

const placeholder = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:
Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editor: placeholder,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
  }

  handleInput(event) {
    this.setState({
      editor: event.target.value,
    });
  }

  handleMaximize(event) {
    const target = event.target.parentElement.parentElement.nextSibling;
    if (target.id === "edit") {
      target.parentElement.lastChild.lastChild.classList.toggle("maximize");
      target.parentElement.nextSibling.classList.toggle("hidden");
    } else {
      target.parentElement.previousSibling.classList.toggle("hidden");
    }
  }

  render() {
    const html = marked.parse(this.state.editor);

    return (
      <div className="container">
        <Editor
          handleInput={this.handleInput}
          value={this.state.editor}
          maximize={this.handleMaximize}
        />
        <Preview content={html} maximize={this.handleMaximize} />
      </div>
    );
  }
}

const Title = (props) => {
  return (
    <div className="title row p-2 border">
      <div className="col-6">
        <h5 className="m-0 text-start">{props.name}</h5>
      </div>
      <div className="col-6 text-end">
        <i
          className="fa fa-window-maximize align-self-center"
          aria-hidden="true"
          onClick={props.onClick}
        ></i>
      </div>
    </div>
  );
};

class Editor extends React.Component {
  render() {
    return (
      <section className="pt-4">
        <Title name="Editor" onClick={this.props.maximize} />
        <div id="edit" className="row ">
          <textarea
            className={"border p-4 col"}
            name="editor"
            id="editor"
            onInput={this.props.handleInput}
            value={this.props.value}
          />
        </div>
      </section>
    );
  }
}
class Preview extends React.Component {
  render() {
    return (
      <section id="previewer" className="pt-4">
        <Title name="Previewer" onClick={this.props.maximize} />
        <div
          id="preview"
          className="border row p-4"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        ></div>
      </section>
    );
  }
}

export default App;

import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import { TextHelper } from 'components/Layout/Layout';
/*
 * Simple editor component that takes placeholder text as a prop
 */
export default class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleChange(html) {
    const quill = this.quillRef;
    if (quill && this.props.maxLength) {
      const limit = this.props.maxLength;
      quill.on('text-change', function (delta, old, source) {
        const txt = quill.getText();

        if (txt.length > limit) {
          quill.deleteText(limit, quill.getLength());
        }
      });
    }
    if (this.props.onChange) {
      const length = quill?.getLength();
      this.props.onChange(html, length > 0 ? length - 1 : 0);
    }
  }

  getTextLength = () => {
    if (this.quillRef) {
      return this.quillRef.getText().length;
    }
    return 0;
  };

  render() {
    const txtLength = this.quillRef?.getText().length - 1; //minus default \n
    // const maxLength = this.props.maxLength ?? 1000;
    return (
      <div>
        <ReactQuill
          theme="snow"
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          onChange={this.handleChange}
          value={this.props.value}
          modules={QuillEditor.modules}
          formats={QuillEditor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
        {txtLength >= 0 && (
          <TextHelper>
            {txtLength}/{this.props.maxLength ?? 0}
          </TextHelper>
        )}
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  // 'blockquote',
  // 'list',
  // 'bullet',
  'indent',
  'link'
  // 'image',
  // 'video'
];

/*
 * PropType validation
 */
QuillEditor.propTypes = {
  placeholder: PropTypes.string
};

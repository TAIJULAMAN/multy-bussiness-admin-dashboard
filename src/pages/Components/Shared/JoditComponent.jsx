import React, { memo, useRef } from 'react';
import JoditEditor from 'jodit-react';

const JoditComponent = ({ content, setContent }) => {
  const editor = useRef(null);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content || ''}
        onBlur={(newContent) => setContent(newContent)}
        config={{
          readonly: false,
          toolbarSticky: false,
          minHeight: 600,
        }}
      />
    </div>
  );
};

export default memo(JoditComponent);

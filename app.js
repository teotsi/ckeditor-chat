import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Chat from './chat/chat';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';                 // ADDED

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, Chat ],
        toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'chat' ]
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
        CKEditorInspector.attach( 'editor', editor );

        // Expose for playing in the console.
        window.editor = editor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );
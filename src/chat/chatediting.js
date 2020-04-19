import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';


import InsertChatCommand from './insertchatcommand';                 // ADDED

export default class ChatEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {

        console.log( 'ChatEditing#init() got called' );
        this._defineSchema();          

        this._defineConverters();                                              // ADDED

        this.editor.commands.add( 'insertChat', new InsertChatCommand( this.editor ) );


    }
    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'chat', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'chatInfo', {
            // Cannot be split or left by the caret.
            isLimit: false,

            allowIn: 'chatMessage',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( (context.endsWith( 'chat' ) || context.endsWith( 'chatMessage' ) || 
            context.endsWith('chatMessageContainer')|| context.endsWith('chatInfo')) && childDefinition.name == 'chat' ) {
                return false;
            }
        } );

    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement( {

            model: 'chat',
            view: {
                name: 'div',
                classes: 'chat-container'
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'chat',
            view: {
                name: 'div',
                classes: 'chat-container'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'chat',
            view: ( modelElement, viewWriter ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'chat-container' } );
                return toWidget( div, viewWriter, { label: 'Chat widget' } );
            }
        } );

    }
}
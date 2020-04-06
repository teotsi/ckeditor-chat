import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';


import InsertChatCommand from './insertchatcommand';                 // ADDED
import InsertChatMessageCommand from './insertchatmessagecommand';                

export default class ChatEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {

        console.log( 'ChatEditing#init() got called' );
        this._defineSchema();          

        this._defineConverters();                                              // ADDED

        this.editor.commands.add( 'insertChat', new InsertChatCommand( this.editor ) );
        this.editor.commands.add( 'insertChatMessage', new InsertChatMessageCommand( this.editor ) );


    }
    _defineSchema() {                                                          // ADDED
        const schema = this.editor.model.schema;

        schema.register( 'chat', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'chatMessageContainer', {
            // Cannot be split or left by the caret.
            isObject: true,

            allowIn: 'chat',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'chatMessage', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'chatMessageContainer',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block'
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

        schema.addChildCheck( ( context, childDefinition ) => {
            if (!context.endsWith('chat')&& childDefinition.name == 'chatMessageContainer' ) {
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

        console.log( 'Chat about to widgetize' );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'chat',
            view: ( modelElement, viewWriter ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'chat-container' } );
                return toWidget( div, viewWriter, { label: 'Chat widget' } );
            }
        } );


        conversion.for('upcast').elementToElement( {
            model: 'chatMessageContainer',
            view: {
                name: 'div',
                classes: 'chat-message-container'
            }
        } );


        
        conversion.for('dataDowncast').elementToElement( {
            model: 'chatMessageContainer',
            view: {
                name: 'div',
                classes: 'chat-message-container'
            }
        } );


        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'chatMessageContainer',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'chat-message-container' } );
                return toWidget( div, viewWriter, { label: 'Chat message container' } );
            }
        } );


        conversion.for('upcast').elementToElement( {
            model: 'chatMessage',
            view: {
                name: 'div',
                classes: 'chat-message'
            }
        } );


        conversion.for('dataDowncast').elementToElement( {
            model: 'chatMessage',
            view: {
                name: 'div',
                classes: 'chat-message'
            }
        } );


        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'chatMessage',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'chat-message' } );
                return toWidgetEditable( div, viewWriter, { label: 'Chat message' } );
            }
        } );

        conversion.for('upcast').elementToElement( {
            model: 'chatInfo',
            view: {
                name: 'p',
                classes: 'chat-info'
            }
        } );

        conversion.for('dataDowncast').elementToElement( {
            model: 'chatInfo',
            view: {
                name: 'p',
                classes: 'chat-info'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'chatInfo',
            view: ( modelElement, viewWriter ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const p = viewWriter.createEditableElement( 'p', { class: 'chat-info' } );
                return toWidgetEditable( p, viewWriter, { label: 'Chat info' } );
            }
        } );

    }
}
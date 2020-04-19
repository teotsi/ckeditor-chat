import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import InsertChatMessageCommand from './insertchatmessagecommand';


export default class ChatMessageEditing extends Plugin{

    static get pluginName() {
		return 'ChatMessageEditing';
	}

    init(){

        console.log( 'ChatMessageEditing#init() got called' );
        this._defineSchema();

        this._defineConverters();

        this.editor.commands.add('insertChatMessage', new InsertChatMessageCommand( this.editor ) );
    }
    _defineSchema(){
        const schema = this.editor.model.schema;
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

        schema.addChildCheck( ( context, childDefinition ) => {
            if (!context.endsWith('chat')&& childDefinition.name == 'chatMessageContainer' ) {
                return false;
            }
        } );
    }

    _defineConverters(){
        const conversion = this.editor.conversion;

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
                return toWidgetEditable( div, viewWriter, { label: 'Chat message container' } );
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
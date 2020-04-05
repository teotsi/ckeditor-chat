import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ChatEditing extends Plugin {
    init() {
        console.log( 'ChatEditing#init() got called' );
        this._defineSchema();          
        this._defineConverters();                                              // ADDED


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
            isLimit: true,

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
        schema.register( 'chatMessageFiller', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'chatMessageContainer',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: ''
        } );

        schema.register( 'chatInfo', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'chatMessage',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block'
        } );
    }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;

        conversion.elementToElement( {
            model: 'chat',
            view: {
                name: 'div',
                classes: 'chat-container'
            }
        } );

        conversion.elementToElement( {
            model: 'chatMessageContainer',
            view: {
                name: 'div',
                classes: 'chat-message-container'
            }
        } );

        conversion.elementToElement( {
            model: 'chatMessage',
            view: {
                name: 'div',
                classes: 'chat-message'
            }
        } );
        conversion.elementToElement( {
            model: 'chatMessage',
            view: {
                name: 'div',
                classes: 'chat-message-filler'
            }
        } );

        conversion.elementToElement( {
            model: 'chatInfo',
            view: {
                name: 'p',
                classes: 'chat-info'
            }
        } );
    }
}
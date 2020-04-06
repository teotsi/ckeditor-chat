import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertChatCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <chat>*</chat> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createChat( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'chat' );

        this.isEnabled = allowedIn !== null;
    }
}

function createChat( writer ) {
    const chat = writer.createElement( 'chat' );
    const chatMessageContainer = writer.createElement( 'chatMessageContainer' );
    const chatMessage = writer.createElement( 'chatMessage' );
    const chatInfo = writer.createElement('chatInfo')

    writer.append( chatMessageContainer, chat );
    writer.append( chatMessage, chatMessageContainer );
    writer.append( chatInfo, chatMessage);
    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', chatInfo );

    return chat;
}

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ChatMessageEditing from './chatMessage/chatmessageediting';

export default class ChatMessage extends Plugin{
    static get requires() {
		return [ ChatMessageEditing ];
    }
    
    static get pluginName() {
		return 'ChatMessage';
	}
}
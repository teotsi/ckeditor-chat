import ChatEditing from './chat/chatediting';
import ChatUI from './chat/chatui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Chat extends Plugin {
    static get requires() {
        return [ ChatEditing, ChatUI ];
    }
}

import ChatEditing from './chatediting';
import ChatUI from './chatui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Chat extends Plugin {
    static get requires() {
        return [ ChatEditing, ChatUI ];
    }
}

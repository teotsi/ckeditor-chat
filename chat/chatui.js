import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ChatUI extends Plugin {
    init() {
        console.log( 'ChatUI#init() got called' );
        const editor = this.editor;
        const t = editor.t;

 
        editor.ui.componentFactory.add( 'chat', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertChat' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t( 'Chat' ),
                withText: true,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertChat' ) );

            return buttonView;
        } );

    }
}
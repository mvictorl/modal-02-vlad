const opt = {
    title: 'TitleT',
    closable: true,
    content: `
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, voluptate!</p>`,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary button clicked');
            modal.close();
        }},
        {text: 'Cancel', type: 'info', handler () {
            console.log('Secondary button clicked');
            modal.close();
        }}
    ]
}

const modal = $.modal(opt);

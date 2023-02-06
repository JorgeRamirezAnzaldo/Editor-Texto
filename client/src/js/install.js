//Get button install using its id
const butInstall = document.getElementById('buttonInstall');

//Implement logic to install the PWA

//Event controller for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store active events
    window.deferredPrompt = event;
    //Set hidden class of the install button to false
    butInstall.classList.toggle('hidden', false);
});


//Event controller for click event over butInstall element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
    return;
    }
    //Show question
    promptEvent.prompt();
    //Reset variable for the deferredPrompt, it can only be used once
    window.deferredPrompt = null;
    //Set hidden class of the install button to true
    butInstall.classList.toggle('hidden', true);
});

//Event controller for appinstalled event
window.addEventListener('appinstalled', (event) => {
    //Delete question
    window.deferredPrompt = null;
});

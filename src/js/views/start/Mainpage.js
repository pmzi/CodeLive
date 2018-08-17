const Server = require('./Server');

const Runner = require('./Runner');

window.server = new Server();

class MainPage {

    static initChoosingPageEvents() {

        let choicesOfChoosingPage = $$('.choosingPage .choice');

        for (let choice of choicesOfChoosingPage) {
            choice.onclick = async function () {

                await this.classList.add('choosingPage__item--selected');

                $('.choosingPage .choice:not(.choosingPage__item--selected)').classList.add('choosingPage__item--not-selected');


                let action = this.getAttribute('data-action');

                if (action == 'create') {

                    $('.choosingPage__loading').classList.add('choosingPage__loading--show');

                    // Let's create

                    server.create().then(() => {

                        setTimeout(() => {
                            $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                            $('.choosingPage').classList.add('choosingPage--fadeOut');

                            setTimeout(() => {
                                $('.choosingPage').classList.add('none');
                            }, 500)

                        }, 500)

                    })

                } else {

                    // Let's join

                    setTimeout(() => {

                        $('.choosingPage__address-wrapper').classList.add('choosingPage__address-wrapper--show');

                        $('.choosingPage__address-wrapper input').onkeydown = function (e) {

                            if (e.key.toLowerCase() == 'enter') {

                                let ipAddress = this.value;

                                $('.choosingPage__loading').classList.add('choosingPage__loading--show');

                                server.join(ipAddress).then(() => {

                                    setTimeout(() => {

                                        $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                                        $('.choosingPage').classList.add('choosingPage--fadeOut');

                                        setTimeout(() => {

                                            $('.choosingPage').classList.add('none');

                                        }, 500)

                                    }, 500)

                                }).catch(() => {

                                    $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                                    this.classList.add('input--error');

                                });
                            }

                        };

                    }, 500)

                }

            };
        }

    }

    static initMainPageEvents() {

        // disconnect event

        $('.header__left-side>div:first-child').onclick = () => {

            server.disconnect();

            // Let's show the choosingPage

            $('.choosingPage').classList.remove('none');
            setTimeout(() => {

                $('.choosingPage').classList.remove('choosingPage--fadeOut');
                $('.choosingPage__address-wrapper').classList.remove('choosingPage__address-wrapper--show');
                $('.choosingPage__loading').classList.remove('choosingPage__loading--show');
                $('.choosingPage .choosingPage__item--selected').classList.remove('choosingPage__item--selected');
                $('.choosingPage .choosingPage__item--not-selected').classList.remove('choosingPage__item--not-selected');

            }, 100)

        };

        // Run event

        $('.header__right-side>div:first-child').onclick = () => {

            server.emit({}, "runHTML");

            Runner.runHTML(mainEditor.editor.getValue());
        };

    }

    static initHTMLRunnerEvents() {
        
        $('.HTMLRunner__tool:nth-child(1)').onclick = () => {

            server.emit({}, "hideHTML");

            Runner.hideHTML();
        };

        $('.HTMLRunner__tool:nth-child(2)').onclick = () => {
            server.emit({}, "reloadHTML");
            Runner.reloadHTML()
            
        };

        $('.HTMLRunner__tool:nth-child(3)').onclick = () => {
            
            if(!$('.HTMLRunner__console').classList.contains('HTMLRunner__console--show')){
                $('.HTMLRunner__console').classList.add('HTMLRunner__console--show');
            }else{
                $('.HTMLRunner__console').classList.remove('HTMLRunner__console--show');
            }
        };
    }

}

MainPage.initChoosingPageEvents();

MainPage.initMainPageEvents();

MainPage.initHTMLRunnerEvents();
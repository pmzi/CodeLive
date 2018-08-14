
const Server = require('./Server');

const server = new Server();

class ChoosingPage{

    static initStaticEvents(){

        let choicesOfChoosingPage = $$('.choosingPage .choice');

        for(let choice of choicesOfChoosingPage){
            choice.onclick = async function(){
                
                await this.classList.add('choosingPage__item--selected');
    
                $('.choosingPage .choice:not(.choosingPage__item--selected)').classList.add('choosingPage__item--not-selected');
    

                let action = this.getAttribute('data-action');

                if(action == 'create'){

                    $('.choosingPage__loading').classList.add('choosingPage__loading--show');

                    // Let's create

                    server.create().then(()=>{

                        setTimeout(()=>{
                            $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                            $('.choosingPage').classList.add('choosingPage--fadeOut');
                        },500)

                    })

                }else{

                    // Let's join

                    server.join("127.0.0.1:2020");

                }

            };
        }

    }

}

ChoosingPage.initStaticEvents();
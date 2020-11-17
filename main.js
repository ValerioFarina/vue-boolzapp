var app = new Vue({
    el: '#root',

    data: {
        currentIndex: 0,

        newMessage: '',

        contactSearched : '',

        showDropdown : undefined,

        isWriting : false,

        showDeletionWindow : false,

        messageClicked : undefined,

        showResetButton : false,

        user : {
            name : 'Valerio',
            avatar : '_user'
        },

        contacts: [
            {
                name: 'Marco',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ]
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Martina',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Marta',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai comprato il pane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, il panettiere era chiuso',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Andrea',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Allora che film andiamo a vedere?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Mi dispiace, non ho più voglia di andare al cinema',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Perfetto! Tanto neanche io volevo andarci',
                        status: 'sent'
                    }
                ]
            },
            {
                name: 'Antonio',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '15/02/2020 16:32:55',
                        message: 'Buon compleanno Antonio',
                        status: 'sent'
                    },
                    {
                        date: '15/02/2020 17:50:00',
                        message: 'Grazie!!!',
                        status: 'received'
                    }
                ]
            },
            {
                name: 'Luca',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '15/02/2020 7:12:03',
                        message: 'Mi presti la macchina?',
                        status: 'received'
                    },
                    {
                        date: '15/02/2020 8:10:22',
                        message: 'No',
                        status: 'sent'
                    }
                ]
            }
        ],

        answers : [
            'Non ci sono più le mezze stagioni',
            'Si stava meglio quando si stava peggio',
            'Sono sempre i migliori che se ne vanno',
            'Non si finisce mai di imparare',
            'Qui una volta era tutta campagna',
            'Nella vita non si può mai sapere',
            'Non c’è due senza tre',
            'Quest’anno è proprio volato'
        ]
    },

    methods: {
        // this function adds a new message to the currently displayed conversation
        // the message will appear (inside the div with id "messages") to the right and within a green box
        // the message will not be sent if it is an empty string
        sendMessage() {
            // we remove whitespaces from both sides of the string newMessage
            this.newMessage = this.newMessage.trim();
            if (this.newMessage != '') {
                // if the result is not an empty string, we create a new object representing a new message, and we svae it in the variable myMessage
                let myMessage = this.getMessageObject(this.newMessage, 'sent');

                // we add this new message to the currently displayed conversation
                this.contacts[this.currentIndex].messages.push(myMessage);

                // after the new message is added to the messages panel, the panel automatically scrolls to the end
                Vue.nextTick(this.scrollMessages);

                // we reset the value of newMessage (i.e. the value of the input placed inside the div with id "send-message")
                this.newMessage = '';

                // we automatically generate an answer
                // this answer will be displayed in the messages panel after 1 second
                setTimeout(this.answer, 1000);
            }
        },

        // this function simulates an answer to the message sent by the user
        // the answer will appear after one second
        // moreover, the ansew will be displayed (inside the div with id "messages") to the left and within a white box
        answer() {
            // we pick from the array answers a random element which will be the text of our random answer
            let rndAnswer = this.answers[this.getRndInteger(0, this.answers.length - 1)];

            // we generate a new object representing the randomly generated answer
            let receivedMessage = this.getMessageObject(rndAnswer, 'received');

            // we add this randomly generated answer to the currently displayed conversation
            this.contacts[this.currentIndex].messages.push(receivedMessage);

            // after the answer is added to the messages panel, the panel automatically scrolls to the end
            Vue.nextTick(this.scrollMessages);
        },

        // this function creates a new object representing a new message
        // the first argument of the function will be the text of the message
        // the second argument should be either the string 'received' or the string 'sent'
        // the message object returned by the function will contain a property date, whose value will be a string representing the day and hour the new message has been sent
        getMessageObject(messageText, status) {
            let day = moment().format('L');

            let hour = moment().format('LTS');

            let messageObject = {
                date: day + ' ' + hour,
                message: messageText,
                status: status
            };

            return messageObject;
        },

        // this function deletes the message selected by the user
        deleteMessage(index) {
            this.contacts[this.currentIndex].messages.splice(index, 1);
        },

        // this function takes as input an object representing a message and returns a string corresponding to the text of the message
        getTextOf(messageObject) {
            if (messageObject != undefined) {
                return messageObject.message;
            }
        },

        // this function takes as input an object representing a message
        // and returns as output a string corresponding to the hour the message was sent
        getHourOf(messageObject) {
            if (messageObject != undefined) {
                return moment(messageObject.date, 'DD/MM/YY hh:mm:ss').format('LT');
            }
        },

        // this function takes as input an object representing a message
        // and returns as output a string corresponding to the day the message was sent
        // unless the day is today, in which case we return the string 'OGGI'
        getDayOf(messageObject) {
            if (messageObject != undefined) {
                let day = moment(messageObject.date, 'DD/MM/YY hh:mm:ss').format('L');
                return day == moment().format('L') ? 'OGGI' : day;
            }
        },

        // this function checks if the name of a given contact matches the contact searched by the user
        // the comparison is not case sensitive
        matchTheSearch(contact) {
            let searched = this.contactSearched.toLowerCase();
            searched = searched.trim();
            return contact.name.toLowerCase().includes(searched) ? true : false;
        },

        // this function takes as input an object representing a contact
        // and returns as output an object corresponding to the last message this contact has sent to/has received from the user
        lastMessage(contact) {
            if (contact.messages.length != 0) {
                return contact.messages[contact.messages.length - 1];
            }
        },

        // this function scrolls to the end of the messages panel
        scrollMessages() {
            let containerMessages = document.getElementById("messages");

            containerMessages.scrollTop = containerMessages.scrollHeight;
        },

        // this function resets the contacts search bar
        resetSearch() {
            if (this.showResetButton) {
                this.contactSearched = '';
                this.showResetButton = false;
            }
        },

        // this function generates a random integer
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

    },

    mounted : function() {
        moment.locale('it');

        this.scrollMessages();
    }
});

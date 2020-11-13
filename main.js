var app = new Vue({
    el: '#root',

    data: {
        currentIndex: 0,

        newMessage: '',

        contactSearched : '',

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
            }
        ],

        showDropdown : undefined
    },

    methods: {
        // this function adds a new message to the currently displayed conversation
        // the message will appear (inside the div with id "messages") to the right and within a green box
        // the message will not be sent if it is an empty string
        sendMessage() {
            this.newMessage = this.newMessage.trim();
            if (this.newMessage != '') {
                let myMessage = this.getMessageObject(this.newMessage, 'sent');

                this.contacts[this.currentIndex].messages.push(myMessage);

                this.newMessage = '';

                setTimeout(this.answer, 1000);
            }
        },

        // this function simulates an answer to the message sent by the user
        // the answer will appear after one second
        // moreover, the ansew will be displayed (inside the div with id "messages") to the left and within a white box
        answer() {
            let receivedMessage = this.getMessageObject('ok', 'received');

            this.contacts[this.currentIndex].messages.push(receivedMessage);
        },

        // this function creates a new object representing a new message
        getMessageObject(messageText, status) {
            moment.locale('it');
            let day = moment().format('L');
            let hour = moment().format('LTS');
            let messageObject = {
                date: day + ' ' + hour,
                message: messageText,
                status: status
            };
            return messageObject;
        },

        deleteMessage(index) {
            this.contacts[this.currentIndex].messages.splice(index, 1);
            this.showDropdown = undefined;
        },

        // this function takes as input an object representing a message
        // and returns as output a string corresponding to the hour the message was sent
        // this returned string is a substring of message.date
        getHour(message) {
            let firstIndex = message.date.indexOf(' ') + 1;
            let lastIndex = message.date.length - 3;
            return message.date.slice(firstIndex, lastIndex);
        },

        capitalize(string) {
            string = string.trim();
            if (string != '') {
                return string[0].toUpperCase() + string.slice(1).toLowerCase();
            } else {
                return '';
            }
        }
    }
});

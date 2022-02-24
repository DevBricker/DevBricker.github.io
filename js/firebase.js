import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js'
import {
    doc,
    collection,
    getFirestore,
    query,
    orderBy,
    getDocs,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'


export function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function init() {

    // //var firebaseConfig = {
    // apiKey: "API_KEY",
    //     authDomain: "PROJECT_ID.firebaseapp.com",
    //         databaseURL: "https://PROJECT_ID.firebaseio.com",
    //             projectId: "PROJECT_ID",
    //                 storageBucket: "PROJECT_ID.appspot.com",
    //                     messagingSenderId: "SENDER_ID",
    //                         appId: "APP_ID",
    //                             measurementId: "G-MEASUREMENT_ID",
    // };

    const firebaseConfig = {
        apiKey: 'AIzaSyAZJqlmVVyumeN49AqBQYM0hpeRCG8qbOQ',
        authDomain: 'asher-3cb98.firebaseapp.com',
        projectId: 'asher-3cb98',
        storageBucket: 'asher-3cb98.appspot.com',
        messagingSenderId: '265099220199',
        appId: '1:265099220199:web:42f44a84a696d49d333e42',
        measurementId: 'G-X5JMCK7G2T',
    }
    const app = initializeApp(firebaseConfig)
    return app
}

export function getDb() {
    const db = getFirestore()
    return db
}

export async function LeaveComment(db, table, name, comment) {
    try {
        const ref = doc(db, table, name).withConverter(MessageConverter)
        const res = await setDoc(ref, new Message(name, comment))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export async function QueryComment(db, table) {
    try {
        const ref = collection(db, table)
        const q = await query(ref, orderBy("date", 'desc'))

        const querySnapshot = await getDocs(q)
        if (querySnapshot) {
            return querySnapshot
        } else {
            return null
        }
    } catch (e) {
        console.error(e)
        return false
    }
}

export async function ReplyComment(db, table, name, reply) {
    if (!db || !table || !name || !reply) return
    const replyRef = doc(db, table, name);
    try {
        await updateDoc(replyRef, {
            reply: reply
        });
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export class Message {
    constructor(name, comment) {
        this.id = _uuid()
        this.name = name
        this.comment = comment
        this.date = Timestamp.fromDate(new Date())
        this.reply = []
    }
    toString() {
        return this.id + ',' + this.name + ', ' + this.comment + ',' + this.date + ',' + this.reply
    }
}

export const MessageConverter = {
    toFirestore: (x) => {
        return {
            id: x.id,
            name: x.name,
            comment: x.comment,
            date: x.date,
            reply: x.reply
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)
        return new Message(data.id, data.name, data.comment, data.date, data.reply)
    },
}

export function showNotifications() {
    const dom = document.createElement('div') // is a node
    dom.innerHTML = `<div id="notification" class="bg-white fixed right-5 top-5 rounded-lg border-gray-300 border p-3 shadow-lg">
      <div class="flex flex-row">
        <div class="px-2">
          <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
            <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/>
            </svg>
        </div>
        <div class="ml-2 mr-6">
          <span class="font-semibold">已提交!</span>
          <span class="block text-gray-500">順利的提交了～等待回覆吧！</span>
        </div>
      </div>`
    window.document.getElementsByTagName('body')[0].appendChild(dom)
}

export function showAlert(e) {
    const dom = document.createElement('div') // is a node
    dom.innerHTML = `<div id="alert-32532662362" class=" fixed top-5 left-1/2 alert flex flex-row items-center bg-red-500 p-5 rounded border-b-2 border-red-500">
    <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span class="text-red-500">
            <svg fill="currentColor"
                viewBox="0 0 20 20"
                class="h-6 w-6">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>
    <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-gray-900">
            Error
        </div>
        <div class="alert-description text-sm text-gray-900">
           `+ e + `
        </div>
    </div>
</div>`
    window.document.getElementsByTagName('body')[0].appendChild(dom)
}


export function showTemplate(name, comment, date, reply, db, table) {
    const dom = document.createElement('div') // is a node
    dom.innerHTML = `  <div class="w-full mt-2 border-b-2">
             <div class="bg-gray-50 rounded px-3 py-2 mb-2">
                <p class="text-gray-800 text-md font-medium mb-1">
                   <span class="text-lg"> 稱呼：`+ name + `</span>
                </p>
                <p class="text-gray-800 text-md font-medium ">
                    留言內容：`+ comment + `
                </p>
                </div>
                 <p class="bg-gray-50 text-md font-medium px-3 py-2 mb-2 broder-radius-25 text-right rounded">
                    <span class="text-gray-800" id="reply-`+ date + `">` + reply + `</span> : <span class="text-lg font-medium">版主回覆</span>
                </p>
                <div id="show-`+ date + `" class="flex items-center mb-2">
                    <textarea type="text" name="comment" id="comment-`+ date + `" autocomplete="comment"
                            class="w-3/5 showinput px-2 py-2 mt-1 min-h-50  border border-gray-900 focus:ring-gray-500 focus:border-gray-500 block shadow-md rounded-md"></textarea>
                    <button id=button-` + date + `
                        class="min-h-40px h-40px inline-flex ml-2  py-2 px-4 border border-gray-900 shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        回覆
                    </button>
                </div >
            </div>`
    window.document.getElementById('message-container').appendChild(dom)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('admin')
    const messageBox = document.getElementById('show-' + date)
    if (!code) {
        document.getElementById('show-' + date).parentElement.removeChild(messageBox)
    } else {
        window.document.getElementById('button-' + date).addEventListener('click', function (e) {
            const inputText = document.getElementById('comment-' + date).value
            ReplyComment(db, table, name, inputText)
            document.getElementById('comment-' + date).value = null
            document.getElementById('reply-' + date).innerText = inputText
        })
    }
}

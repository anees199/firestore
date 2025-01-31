import { database } from "./firestore.js";
import { addDoc, collection, getDocs , deleteDoc , doc , updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

const description = document.querySelector("#description");
const text = document.querySelector("#text");
const div = document.querySelector(".div");
const form = document.querySelector("#form");
const dbArr = [];

async function getData() {
    const querySnapshot = await getDocs(collection(database, "todos"));
    dbArr.length = 0; 
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        dbArr.push(doc.data());
    });
    renderItems();
}

function renderItems() {
    div.innerHTML = "";  
    dbArr.forEach((item) => {
        div.innerHTML += `<div class="container">
            <h1>Title: ${item.title}</h1>
            <p>Description: ${item.description}</p>  
            <div class="btns">
              <button class="editBtn">Edit</button>
              <button class="deleteBtn">Delete</button>
            </div>
        </div>`;
    });
    const editbtn = document.querySelectorAll(".editBtn")
    const deletebtn = document.querySelectorAll(".deleteBtn")

    deletebtn.forEach((btn, index)=>{
        btn.addEventListener('click', async(event)=>{
        event.preventDefault()
        console.log("delete chal raha hai",dbArr[index]);
        await deleteDoc(doc(dbArr, "todos", dbArr[index].id));
        dbArr.splice(index, 1)
        renderItems()
        })
    })
}
    
        

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(text.value);
    console.log(description.value);


    try {
        const docRef = await addDoc(collection(database, "todos"), {
            title: text.value,
            description: description.value,
        });

        console.log("Document written with ID: ", docRef.id);
        text.value = "";
        description.value = "";
        updateData();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


getData();

async function updateData() {
    await getData();  
}

import { db } from "./firestore.js";
    import {  getFirestore, getDocs, doc, addDoc  , collection, deleteDoc, getDoc , updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 

const form = document.getElementById('userForm');
let container = document.querySelector("#container")

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;


    function toEmptyinputFiled(){
       title = document.querySelector("#title").value = '';
       description = document.querySelector("#description").value = '';
   };
    try {
        const docRef = await addDoc(collection(db, "todos"), {
         title:title,
         description:description
        });
        console.log("Document written with ID: ", docRef.id);
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      renderData()
      // container.innerHTML = `<p>Edited Sucessfully</p>`
       toEmptyinputFiled()
  });

 async function renderData(){
   
    try {


     const docRef = await getDocs(collection(db,'todos'));

      let html = ""
      let table = document.querySelector("table");

     docRef.forEach(element => {
         const userData = element.data();
         const docid = element.id; 
        //  console.log(globalArray);
          html+= `
          <tr>
          <td>${userData.title}</td>
          <td>${userData.description}</td>
           <td> <button id="delbtn" onclick="deletMethod('${docid}')">Delete</button></td>
           <td> <button id="delbtn" onclick="UpdatedtMethod('${docid}')">Edit</button></td>
           </tr>
       `
     });
   
     table.innerHTML = html
      
    } catch (error) {
        console.log(error)
    }
     
     
}
 
window.deletMethod = async function(docid){
  container.innerHTML = ''

  const docRef = doc(db,'todos',docid);
  await deleteDoc(docRef)
  renderData()
  // container.innerHTML = `<p>Deleted Sucessfully.</p>`

}

window.UpdatedtMethod =  async function(id){
   try {
    const docRef = await  getDoc(doc(db,'todos',id))
    const currentUser = docRef.data();

    console.log(currentUser) 

      document.querySelector("#title").value = currentUser.title;
      document.querySelector("#description").value =currentUser.description;

      let sumbitbtn = document.querySelector('.sumbit');
       let btn = document.querySelector(".updatedbtn");

       btn.classList.add('show');
      sumbitbtn.classList.add('hide');

      btn.addEventListener('click', async()=>{
          const newtilte = document.querySelector("#title").value;
          const newdescription = document.querySelector("#description").value;

          if(newtilte !== null && newdescription !== null){
              await updateDoc(doc(db,'todos',id),{
                   title:newtilte,
                   description:newdescription
              });
              
              renderData()
      // container.innerHTML = ` <p>Data Updated  Suceessfully/<p>`

              sumbitbtn.classList.remove('hide');
              btn.classList.remove('show');

          }
      })

   } catch (error) {
     console.log(error)
   }
}


renderData()
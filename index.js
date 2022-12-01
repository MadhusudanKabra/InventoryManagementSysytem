getTotal = () => {
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;  
        var total = ( price * quantity);
        document.querySelector('#total').value = total;
}

addToInventory = () =>{
    var currinventory = JSON.parse(localStorage.getItem("currinventory"));
    // Checking If it is first Entry if Yes Then it sets the value of currinventory to none
    if(currinventory == null){       
        currinventory = [] ;
    }
    
    let product = document.querySelector('#product').value;
    let price = document.querySelector('#price').value;
    let quantity = document.querySelector('#quantity').value;
    let total=( price * quantity ) ;

    // Creating new object of data received from user
    let newInventory = {
        product : product,
        price : price,
        quantity : quantity,
        total : total
    }

    // pushing the object in to currInventory
    currinventory.push(newInventory) ;

    // Setting the object in local storage after converting it to string
    localStorage.setItem("currinventory", JSON.stringify(currinventory))
    window.location.reload()  ;

}

getFinalTotal = () =>{
    var FinalTotal = 0;
    var currinventory = JSON.parse(localStorage.getItem("currinventory"));
    if (currinventory != null) {
        
        for (let i = 0; i < currinventory.length; i++) {
            FinalTotal  += (currinventory[i]["total"]);
            FinalTotal = FinalTotal; 
        }
    }
    document.querySelector('#FinalTotal').innerHTML = FinalTotal;  
}

// ShowInventory = () =>{
//     var currinventory= JSON.parse(localStorage.getItem("currinventory")) ;
//     if(currinventory != null && currinventory.length > 0){
//         var table = document.querySelector('#TableBody');
//         for(let i=0 ; i < currinventory.length ; i++){
//             let row = `<tr>
//                         <td>${currinventory[i]["product"]}</td>
//                         <td>${currinventory[i].price}</td>
//                         <td>${currinventory[i].quantity}</td>
//                         <td>${currinventory[i].total}</td>
//                        </tr>
//                        `
//                     table.value += row;
//         }        
//     }
// }

DisplayInventory = () =>{
   getFinalTotal();
    let currinventory = JSON.parse(localStorage.getItem("currinventory"));
    currinventory.sort(function(a, b){
        return b.quantity - a.quantity;
    });
    if (currinventory != null ) {
        let table = document.querySelector('#TableBody');
        for (let i = 0; i < currinventory.length; i++) {
            let row = table.insertRow(1);
            let inventoryProduct = row.insertCell(0);
            let inventoryPrice = row.insertCell(1);
            let inventoryQuantity = row.insertCell(2);
            let inventoryTotal = row.insertCell(3);
            let inventoryAction = row.insertCell(4);

            inventoryAction.className = "Addbtn";
            inventoryProduct.className = "tcenter"
            inventoryPrice.className = "tcenter"
            inventoryQuantity.className = "tcenter"
            inventoryTotal.className = "tcenter"
            inventoryAction.className = "tcenter";


            inventoryProduct.innerHTML = currinventory[i]["product"];
            inventoryPrice.innerHTML = currinventory[i]["price"];
            inventoryQuantity.innerHTML = currinventory[i]["quantity"];
            inventoryTotal.innerHTML = currinventory[i]["total"];

           getFinalTotal();
           let btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn";
            btn.value = "delete";
            btn.onclick = (function(i) {
                return function() {

                    if (confirm("Do you want to delete this data ?")) {
                        currinventory.splice(i, 1) 
                        window.location.reload();
                        localStorage.setItem("currinventory", JSON.stringify(currinventory)); 
                    }                        
                }
            })(i);
            inventoryAction.appendChild(btn);
        }
    }
}


getDate = () => {
    let today = new Date();
    return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + '  '  + today.getHours() + ":" + today.getMinutes() + "<br>" ;
}


printData = () => { 
    var divContents = document.getElementById("TableBody").innerHTML; 
    var a = window.open('', '', 'height=11000, width=1000'); 
    a.document.write('<html>'); 
    a.document.write('<body > <h1>Your Inventory Records As At : ' + getDate() + '<br>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
} 

function removeSelectedRow(){
    var rIndex,
    table = document.getElementById("table");
    table.deleteRow(rIndex);
    // clear input text
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
}
DisplayInventory();

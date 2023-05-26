var itemList = document.getElementById('items');
var sum = 0;

function saveToLocalStorage(event)
{
    event.preventDefault();
    
    const price = event.target.sellingPrice.value;
    const name = event.target.productName.value;
   
    const myObj = {
        price,
        name
    }
    sendPost(myObj);
}

async function sendPost(myObj) {
    try {
        const response = await axios.post('http://localhost:3000/seller/add-product', myObj)
        showAmountOnScreen(response.data.newProductDetail);
        showTotal();
    }
    catch(err) {
        console.error(err);
    }
}

function showTotal() {
    console.log('inside total');
    var total = document.getElementById('sum');
    total.innerHTML = sum;
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:3000/seller/get-Products")
        sum=0;
        for(let i=0; i<response.data.allProducts.length; i++) {
            showAmountOnScreen(response.data.allProducts[i]);
            showTotal();
        }
    } catch(error) {
        console.error(error)
    }
})

function showAmountOnScreen(obj) {
    const parentElem = document.getElementById('items');
    const childElem = document.createElement('li');
    childElem.class = "list-group-item";
    childElem.textContent = obj.price+'-'+obj.name;
    sum = sum + parseInt(obj.price);
    console.log('sum is '+sum);

    let deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value ="Delete Product ";
    deleteBtn.onclick = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/seller/delete-Product/${obj.id}`)
             parentElem.removeChild(childElem);
             sum = sum - parseInt(obj.price);
             showTotal();
         }
         catch(error) {
            console.error(error)
         }
    }

    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
}

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
    axios.post('http://localhost:3000/seller/add-product', myObj)
    .then((response) => {
        showAmountOnScreen(response.data.newProductDetail);
        var total = document.getElementById('total');
        total.innerHTML += sum;
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something is wrong</h4>"
        console.error(err);
    })   
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/seller/get-Products")
        .then((response) => {
            console.log(response)

            for(let i=0; i<response.data.allProducts.length; i++)
                showAmountOnScreen(response.data.allProducts[i]);
        })
        .catch(error => console.error(error))
})

function showAmountOnScreen(obj) {
    const parentElem = document.getElementById('items');
    const childElem = document.createElement('li');
    childElem.class = "list-group-item";
    childElem.textContent = obj.price+'-'+obj.name;
    sum = sum + obj.price;

    let deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value ="Delete Product ";
    deleteBtn.onclick = () => {
        console.log('for delete '+obj.id);
        axios.delete(`http://localhost:3000/seller/delete-Product/${obj.id}`)
         .then((response) => {
             parentElem.removeChild(childElem);
         })
         .catch(error => console.error(error))
    }

    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
}

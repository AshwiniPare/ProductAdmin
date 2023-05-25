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
        showTotal();
       // var total = document.getElementById('total');
       // total.innerHTML += sum;
        console.log(response)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> something is wrong</h4>"
        console.error(err);
    })   
}

function showTotal() {
    console.log('inside total');
    var total = document.getElementById('sum');
    total.innerHTML = sum;
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/seller/get-Products")
        .then((response) => {
            console.log(response)
            sum=0;
            for(let i=0; i<response.data.allProducts.length; i++) {
                showAmountOnScreen(response.data.allProducts[i]);
                showTotal();
            }
        })
        .catch(error => console.error(error))
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
    deleteBtn.onclick = () => {
        console.log('for delete '+obj.id);
        axios.delete(`http://localhost:3000/seller/delete-Product/${obj.id}`)
         .then((response) => {
             parentElem.removeChild(childElem);
             sum = sum - parseInt(obj.price);
             showTotal();
         })
         .catch(error => console.error(error))
    }

    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
}

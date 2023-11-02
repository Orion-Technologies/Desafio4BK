const socket = io('http://localhost:8080')

const form = document.getElementById('form')

form.addEventListener('submit', async e => {
    e.preventDefault()

    const formData = {
        title: document.querySelector('input[name="title"]').value,
        description: document.querySelector('input[name="description"]').value,
        price: parseFloat(document.querySelector('input[name="price"]').value),
        thumbnail: document.querySelector('input[name="thumbnail"]').value,
        code: document.querySelector('input[name="code"]').value,
        stock: parseInt(document.querySelector('input[name="stock"]').value)
    }

    try {
        //enviando POST al server
        const res = await fetch ('/api/products', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const result = await res.json()
        if(result.status === 'error') {
            throw new Error(result.error)
        } else {
            // emit addProduct a travez de Socket.io
            socket.emit('addProduct', formData);

            // Reset al formulario despues de enviarlo
            form.reset()
        }
    } catch (error) {
        console.error(error)
    }
})

socket.on('updatedProducts', products => {
    const productListElement = document.getElementById('product-list')
    // esto limpia la lista anterior
    productListElement.innerHTML = ''

    products.forEach( product => {
        productListElement.innerHTML += `
        <div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
            <h3>${product.thumbnail}</h3>
            <h3>${product.code}</h3>
            <h3>${product.stock}</h3>
        </div>
        `
    })
})
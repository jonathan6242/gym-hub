function App() {
  const checkout = async () => {
    fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ]
      })
    }).then(res => {
      if(res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url;
    }).catch((e) => {
      console.log(e)
    })
  }

  const getAllItems = async () => {
    console.log(123)
    const items = await fetch('http://localhost:5000/storeitems')
    .then(res => {
      if(res.ok) return res.json();
    }).catch((e) => {
      console.log(e)
    })
    console.log('Items:', items)
  }

  return (
    <div className="App min-h-screen w-full flex justify-center items-center space-x-4">
      <button
        onClick={checkout}
        className="px-6 py-4 text-xl bg-blue-400 hover:bg-blue-500 duration-100 text-white font-semibold rounded-lg"
      >
        Checkout
      </button>
      <button
        onClick={getAllItems}
        className="px-6 py-4 text-xl bg-blue-400 hover:bg-blue-500 duration-100 text-white font-semibold rounded-lg"
      >
        Get All Items
      </button>
    </div>
  );
}

export default App;

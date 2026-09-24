  import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
const [customer, setCustomer] = useState({
  name: "",
  mobile: "",
  address: "",
});

const addToCart = (medicine) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (item) => item.name === medicine.name
    );

    if (existingItem) {
      return prevCart.map((item) =>
        item.name === medicine.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prevCart, { ...medicine, quantity: 1 }];
  });

setShowCart(true);
};

const increaseQty = (name) => {
  setCart(prevCart =>
    prevCart.map(item =>
      item.name === name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQty = (name) => {
  setCart(prevCart =>
    prevCart
      .map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
};

const removeFromCart = (name) => {
  setCart(prevCart =>
    prevCart.filter(item => item.name !== name)
  );
};
  const medicines = [
    { name: "Paracetamol 500mg", price: 25, icon: "💊" },
    { name: "Vitamin C Tablets", price: 120, icon: "🟠" },
    { name: "Cough Syrup", price: 95, icon: "🧴" },
    { name: "First Aid Kit", price: 299, icon: "🩹" },
  ];

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>💊 MediCare</div>

  

        <div style={styles.links}>

  <span
    onClick={() =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  >
    Home
  </span>

  <span
    onClick={() =>
      document.getElementById("medicines")?.scrollIntoView({
        behavior: "smooth"
      })
    }
  >
    Medicines
  </span>

  <span
    onClick={() =>
      document.getElementById("health-products")?.scrollIntoView({
        behavior: "smooth"
      })
    }
  >
    Health Products
  </span>

  <span
    onClick={() =>
      document.getElementById("orders")?.scrollIntoView({
        behavior: "smooth"
      })
    }
  >
    Orders
  </span>
<button onClick={() => setShowCart(true)}>
  🛒 Cart ({cart.length})
</button>
</div>
      </nav>
{showCart && (
  <div style={styles.cartBox}>
    <h2>🛒 Your Cart</h2>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        {cart.map((item, index) => (
  <div key={index} style={styles.cartItem}>
    <span>{item.icon} {item.name}</span>

    <span>₹{item.price * item.quantity}</span>

    <button onClick={() => decreaseQty(item.name)}>−</button>

    <span>{item.quantity}</span>

    <button onClick={() => increaseQty(item.name)}>+</button>

    <button onClick={() => removeFromCart(item.name)}>
      Remove
    </button>
  </div>
))}

        <h3>
         Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h3>
        <button
  style={styles.checkoutButton}
  onClick={()=>
    setShowCheckout(true)}
  }}
>
  Checkout
</button>
      </>
    )}
  </div>
)}
      {/* Hero */}
      <section style={styles.hero}>
        <div>
          <h1 style={styles.title}>
            Your Health, <br />
            <span style={styles.green}>Our Priority.</span>
          </h1>

          <p style={styles.subtitle}>
            Order medicines and healthcare products online
            safely and conveniently.
          </p>

          <button
  style={styles.shopButton}
  onClick={() =>
    document.getElementById("medicines").scrollIntoView({ behavior: "smooth" })
  }
>
  Shop Now →
</button>
        </div>

        <div style={styles.heroEmoji}>🩺💊</div>
      </section>

      {/* Search */}
      <section style={styles.searchSection}>
        <h2>Find Your Medicines</h2>

        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </section>

      {/* Products */}
      <section id="medicines" style={styles.products}>
        <h2>Popular Products</h2>

        <div style={styles.grid}>
          {filteredMedicines.map((medicine) => (
            <div style={styles.card} key={medicine.name}>
              <div style={styles.productIcon}>{medicine.icon}</div>

              <h3>{medicine.name}</h3>

              <p style={styles.price}>₹{medicine.price}</p>
              <button
  style={styles.addButton}
  onClick={() => addToCart(medicine)}
>
  Add to Cart
</button>

              
            </div>
          ))}
        </div>
      </section>
{/* Health Products */}
<section id="health-products" style={styles.products}>
  <h2>Health Products</h2>

  <div style={styles.grid}>

    <div style={styles.card}>
      <div style={styles.productIcon}>🌡️</div>
      <h3>Digital Thermometer</h3>
      <p style={styles.price}>₹199</p>
      <button
        style={styles.addButton}
        onClick={() =>
          addToCart({
            name: "Digital Thermometer",
            price: 199,
            icon: "🌡️"
          })
        }
      >
        Add to Cart
      </button>
    </div>

    <div style={styles.card}>
      <div style={styles.productIcon}>🩹</div>
      <h3>Bandage Pack</h3>
      <p style={styles.price}>₹99</p>
      <button
        style={styles.addButton}
        onClick={() =>
          addToCart({
            name: "Bandage Pack",
            price: 99,
            icon: "🩹"
          })
        }
      >
        Add to Cart
      </button>
    </div>

    <div style={styles.card}>
      <div style={styles.productIcon}>😷</div>
      <h3>Face Masks</h3>
      <p style={styles.price}>₹149</p>
      <button
        style={styles.addButton}
        onClick={() =>
          addToCart({
            name: "Face Masks",
            price: 149,
            icon: "😷"
          })
        }
      >
        Add to Cart
      </button>
    </div>

  </div>
</section>

{/* Orders */}
<section id="orders" style={styles.products}>
  <h2>My Orders</h2>
  <p>Your orders will appear here.</p>
</section>
      {/* Features */}
      <section style={styles.features}>
        <div>🚚 <b>Fast Delivery</b><br />Quick doorstep delivery</div>
        <div>🔒 <b>Secure Payment</b><br />100% secure checkout</div>
        <div>👨‍⚕️ <b>Trusted Products</b><br />Quality healthcare</div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2026 MediCare Online Pharmacy | All Rights Reserved
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    background: "#f5fbf8",
    color: "#173b32",
    minHeight: "100vh",
  },

  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 7%",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  logo: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#0b8f68",
  },

  links: {
    display: "flex",
    gap: "30px",
    fontSize: "15px",
  },

  cart: {
    background: "#0b8f68",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
checkoutButton: {
  padding: "12px 25px",
  background: "#0b8f68",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "15px",
},
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "70px 10%",
    background:"#dff6ec",
  },

  title: {
    fontSize: "52px",
    margin: 0,
  },

  green: {
    color: "#0b8f68",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "550px",
    lineHeight: 1.6,
    color: "#55736a",
  },

  shopButton: {
    background: "#0b8f68",
    color: "white",
    border: "none",
    padding: "14px 25px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  heroEmoji: {
    fontSize: "130px",
  },

  searchSection: {
    textAlign: "center",
    padding: "45px 10% 20px",
  },

  search: {
    width: "70%",
    maxWidth: "650px",
    padding: "15px",
    border: "1px solid #c8ddd5",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
  },

  products: {
    padding: "30px 10% 60px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "22px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  productIcon: {
    fontSize: "55px",
    marginBottom: "10px",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0b8f68",
  },

  addButton: {
    width: "100%",
    padding: "11px",
    background: "#0b8f68",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    padding: "35px 7%",
    background: "white",
    lineHeight: 1.8,
  },

  footer: {
    textAlign: "center",
    padding: "25px",
    background: "#173b32",
    color: "white",
  },
};

export default App;
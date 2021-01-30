
import '../App.css';
import Background from '../palm-tree.jpg';
import Hendrix from '../hendrix.jpg';
import React, {useState } from 'react'
import {useSpring, animated} from 'react-spring'









function Guitars() {
  
  const props = useSpring({
config:{duration:2000},
from: {rotate:"540deg"} ,
to: { rotate:"540deg" }

  })

    const [products] = useState([
      {
      
          name: "Fender Stratocaster",
          price: "105.99",
          image: "https://images-na.ssl-images-amazon.com/images/I/61Jtkzywa3L._AC_SX425_.jpg"


      },
      {
  
          name: "Ovation Acoustic",
          price: "125.99",
          image: "https://cdn.shopify.com/s/files/1/0052/0326/3577/products/CE44-5_hqw_2048x.jpg?v=1579589263"
      }

  ])



return (


  <animated.div class = "guitar-div" style={{opacity:props.opacity, marginTop:props.marginTop}}>



      <h1> PRODUCTS -- Guitars </h1>
     
        {products.map((product) => (
      <div>
        
                <h3>{product.name}</h3> 
                <h3>{product.price}</h3>
                <img class = "guitar-img" src = {product.image} alt ={product.name} ></img>
          <button>Add to Cart</button>

              </div>
          ))}
              
          
       


  








          
      </animated.div>

      
     
)
}


export default Guitars;

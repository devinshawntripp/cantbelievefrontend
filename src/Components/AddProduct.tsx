import React from 'react'









interface IAddProductProps {
    name: String;
    url: String;
    desc: String;
    imgUrl: String;
  }
  
  const AddProduct: React.FC<IAddProductProps> = (props: {
    name: String;
    url: String;
    desc: String;
    imgUrl: String;
  }) => {

        return(
            <div>Add Product page</div>
            
        )






   }


  export default AddProduct;

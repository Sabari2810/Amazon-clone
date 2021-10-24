import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  console.log(`products`, products);
  return (
    <div className="grid grid-flow-row-dense z-50 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
      {products
        .slice(0, 4)
        .map(({ id, title, category, description, price, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            description={description}
            price={price}
            image={image}
            category={category}
          />
        ))}

      <img
        src="https:links.papareact.com/dyz"
        className="md:col-span-full"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, category, description, price, image }) => (
            <Product
              key={id}
              title={title}
              description={description}
              price={price}
              image={image}
              category={category}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, category, description, price, image }) => (
          <Product
            key={id}
            title={title}
            description={description}
            price={price}
            image={image}
            category={category}
          />
        ))}
    </div>
  );
};

export default ProductFeed;

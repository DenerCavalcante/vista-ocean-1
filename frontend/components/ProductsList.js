import NextImage from "./Image"
import Link from "next/link"

const ProductsList = ({ products }) => {

 
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-0 mt-8">
      {products.map((_product) => (
        <div
          key={_product.id}
          className=" border   bg-gray-200"
        >
          
          <Link href={`/products/${_product.slug}`}>
            <a>
              <div className="w-full   bg-gray-100">
                <div className=" pt-2 pb-2 w-1/2 mx-auto">
                  <NextImage media={_product.image} />
                </div>
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4  border-t border-blue-800">
              <div class="flex">
              {_product.categories.map((row, index) => <span 
               key={index}
               className="bg-blue-900 text-xs uppercase font-light text-white px-3 h-5 flex items-center justify-items-center 
               rounded-lg mr-2  ">{row.name}</span>)}
              </div>
                
                <h4 className="mt-2 font-semibold text-base leading-tight truncate text-gray-700">
                {_product.title}
                </h4>
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-blue-900">
                 R$  {_product.price}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_product.description}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductsList

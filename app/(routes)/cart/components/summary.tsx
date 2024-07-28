import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const calculateDiscountPrice = (price, offer) => {
    return price - (price * (offer / 100));
  };

  const totalPrice = items.reduce((total, item) => {
    const itemPrice = item.offer > 0 ? calculateDiscountPrice(item.price, item.offer) : item.price;
    return total + itemPrice * (item.quantity || 1); // Consider quantity
  }, 0);

  // const onCheckout = async () => {
  //   console.log("ITEMS: ", items);
  //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
  //     products: items.map((item) => ({
  //       id: item.id,
  //       quantity: item.quantity || 1,
  //       price: item.offer > 0 ? calculateDiscountPrice(item.price, item.offer) : item.price, // Send discounted price
  //       offer: item.offer || 0 // Include offer information if available
  //     }))
  //   });
  
  //   window.location = response.data.url;
  // };
  
  const onCheckout = async () => {
    console.log("ITEMS: ", items);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      products: items.map((item) => ({
        id: item.id,
        quantity: item.quantity || 1,
        price: item.offer > 0 ? calculateDiscountPrice(item.price, item.offer) : item.price, // Send discounted price
        offer: item.offer || 0, // Include offer information if available
        size: item.selectedSize // Include selected size information
      }))
    });
  
    window.location = response.data.url;
  };
  

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              {item.name} ({item.quantity || 1})
            </div>
            <div className="flex items-end">
              {item.offer > 0 ? (
                <>
                  <Currency value={calculateDiscountPrice(item.price, item.offer) * (item.quantity || 1)} />
                  <span className="line-through text-gray-500 text-sm ml-2">
                    <Currency value={item.price * (item.quantity || 1)} />
                  </span>
                  {/* <span className="text-sm text-red-500 font-semibold ml-2">
                    {item.offer}% OFF - Save <Currency value={(item.price * (item.quantity || 1)) - (calculateDiscountPrice(item.price, item.offer) * (item.quantity || 1))} />
                  </span> */}
                </>
              ) : (
                <Currency value={item.price * (item.quantity || 1)} />
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}

export default Summary;

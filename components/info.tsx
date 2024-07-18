"use client";

import { useState } from "react";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();
    const [quantity, setQuantity] = useState(1);

    const onAddToCart = () => {
        // Check if quantity exceeds available stock
        if (quantity > data.stock) {
            toast.error(`Only ${data.stock} items available.`);
            return;
        }

        // Add items to cart
        for (let i = 0; i < quantity; i++) {
            cart.addItem(data);
        }

        toast.success("Item(s) added to cart.");
    }

    const incrementQuantity = () => {
        // Prevent incrementing beyond available stock
        if (quantity < data.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            toast.error(`Maximum stock reached.`);
        }
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    }
    // window.alert(JSON.stringify(data,null,2));
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>
                        {data?.size?.name} ({data?.size?.value})
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                    <Button onClick={decrementQuantity} className="flex items-center gap-x-2">
                        -
                    </Button>
                    <span>{quantity}</span>
                    <Button onClick={incrementQuantity} className="flex items-center gap-x-2">
                        +
                    </Button>
                </div>
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add to Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
}

export default Info;

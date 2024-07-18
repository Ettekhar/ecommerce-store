import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, Minus, Plus } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
    data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    const onAddQuantity = () => {
        if (data.stock > cart.getItemQuantity(data.id)) {
            cart.addItem(data);
        } else {
            toast.error("Not enough stock available.");
        }
    };

    const onReduceQuantity = () => {
        cart.reduceItem(data.id);
    };

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">
                            {data.name}
                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">
                            {data.color.name}
                        </p>
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
                            {data.size.name}
                        </p>
                    </div>
                    <Currency value={data.price} />
                    <div className="flex items-center mt-2">
                        <IconButton onClick={onReduceQuantity} icon={<Minus size={15} />} />
                        <span className="mx-2">{cart.getItemQuantity(data.id)}</span>
                        <IconButton onClick={onAddQuantity} icon={<Plus size={15} />} />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        Stock: {data.stock}
                    </p>
                </div>
            </div>
        </li>
    );
};

export default CartItem;

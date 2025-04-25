import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number, size: string, color: string) => void;
    removeFromCart: (productId: string, size: string, color: string) => void;
    updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load cart from localStorage on initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart from localStorage', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        // Calculate totals
        const items = cart.reduce((sum, item) => sum + item.quantity, 0);
        const price = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        setTotalItems(items);
        setTotalPrice(price);
    }, [cart]);

    const addToCart = (product: Product, quantity: number, size: string, color: string) => {
        setCart(prevCart => {
            // Check if the product with the same size and color already exists in the cart
            const existingItemIndex = prevCart.findIndex(
                item => item.product.id === product.id && item.size === size && item.color === color
            );

            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Add new item
                return [...prevCart, { product, quantity, size, color }];
            }
        });
    };

    const removeFromCart = (productId: string, size: string, color: string) => {
        setCart(prevCart =>
            prevCart.filter(
                item => !(item.product.id === productId && item.size === size && item.color === color)
            )
        );
    };

    const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
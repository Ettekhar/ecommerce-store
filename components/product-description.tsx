'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Review {
    author: string;
    comment: string;
    rating: number;
}

interface ProductDescriptionProps {
    description: string; // This should be HTML or rich text format
    reviews?: Review[];
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description, reviews = [] }) => {
    const [activeTab, setActiveTab] = useState('description');
    const hasReviews = reviews.length > 0;

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="mt-4 text-gray-700 leading-relaxed">
                        <ReactQuill
                            value={description}
                            readOnly
                            theme="bubble" // Use 'bubble' or 'snow' theme, 'bubble' is more compact
                        />
                    </div>
                );
            case 'reviews':
                return reviews.length === 0 ? (
                    <p className="mt-2 text-gray-600">No reviews yet.</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-t border-gray-200 pt-4">
                                <p className="text-gray-800 font-medium">{review.author}</p>
                                <div className="mt-1 text-yellow-500">
                                    {Array(review.rating).fill('★').join('')} {Array(5 - review.rating).fill('☆').join('')}
                                </div>
                                <p className="mt-2 text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform">
            <div className="flex justify-around border-b mb-4">
                <button
                    className={`py-2 px-4 focus:outline-none transition-colors duration-300 ${activeTab === 'description' ? 'border-b-2 border-green-500 text-green-500 font-semibold' : 'text-gray-600 hover:text-green-500'}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`py-2 px-4 focus:outline-none transition-colors duration-300 ${activeTab === 'reviews' ? 'border-b-2 border-green-500 text-green-500 font-semibold' : 'text-gray-600 hover:text-green-500'}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
            </div>
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProductDescription;

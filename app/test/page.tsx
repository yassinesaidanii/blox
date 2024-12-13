// app/page.tsx
'use client'

import { useEffect, useState } from 'react';

interface Trade {
  id: number;
  title: string;
  description: string;
  offeredItems: string[];
  requestedItems: string[];
  user: {
    name: string;
  };
}

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [newTrade, setNewTrade] = useState({
    title: '',
    description: '',
    offeredItems: '',
    requestedItems: '',
    userId: 1, // Hardcoded user ID for now
  });

  // Fetch trades
  useEffect(() => {
    const fetchTrades = async () => {
        try {
          const res = await fetch('/api/trades');
          
          if (!res.ok) {
            console.log(`Failed to fetch trades, status: ${res.status}`);
            return; // Early return if the response is not OK
          }
      
          // Check if the response body is not empty
          const text = await res.text();
          if (!text) {
            console.error("Received empty response body");
            return;
          }
      
          const data = JSON.parse(text); // Use JSON.parse here for better error handling
          setTrades(data);
        } catch (error) {
          console.error("Error fetching trades:", error);
        }
      };

    fetchTrades();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrade((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  // Handle the form submission
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch('/api/trades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newTrade.title,
        description: newTrade.description,
        offeredItems: newTrade.offeredItems, // Make sure this is a string, comma-separated
        requestedItems: newTrade.requestedItems, // Same for requestedItems
        userId: newTrade.userId, // Ensure userId is handled properly
      }),
    });
  
    if (response.ok) {
      const createdTrade = await response.json();
      setTrades((prev) => [createdTrade, ...prev]); // Add the new trade to the list
      setNewTrade({
        title: '',
        description: '',
        offeredItems: '',
        requestedItems: '',
        userId: 1, // Ensure userId is dynamically set
      });
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Trade Listings</h1>

      {/* Trade Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Trade</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newTrade.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={newTrade.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Offered Items</label>
            <input
              type="text"
              name="offeredItems"
              value={newTrade.offeredItems}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Item1, Item2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Requested Items</label>
            <input
              type="text"
              name="requestedItems"
              value={newTrade.requestedItems}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Item3, Item4"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create Trade
          </button>
        </form>
      </div>

      {/* Display Trades */}
      <div className="space-y-6">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{trade.title}</h2>
            <p>{trade.description}</p>
            <p className="mt-2 font-bold">Offered Items:</p>
            <ul>
              {trade.offeredItems.map((item, idx) => (
                <li key={idx} className="list-disc pl-6">{item}</li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Requested Items:</p>
            <ul>
              {trade.requestedItems.map((item, idx) => (
                <li key={idx} className="list-disc pl-6">{item}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-600">Posted by: {trade.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

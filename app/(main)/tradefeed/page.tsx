"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const TradingPage = () => {
  const { user } = useUser(); // Get the currently authenticated user
  const [trades, setTrades] = useState<any[]>([]);
  const [newTrade, setNewTrade] = useState({
    title: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
    status: "open",
  });

  // Fetch the list of trades from the API
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get("/api/trades");
        setTrades(response.data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchTrades();
  }, []);

  // Handle submitting a new trade
  const handleSubmitTrade = async () => {
    if (!user) {
      alert("You need to be signed in to create a trade!");
      return;
    }

    try {
      const response = await axios.post("/api/trades", {
        ...newTrade,
        userId: user.id, // Include the user's ID with the trade data
      });
      setTrades([response.data, ...trades]); // Add the new trade to the list
      setNewTrade({ name: "", description: "", category: "", quantity: 0, price: 0, status: "open" }); // Reset form
    } catch (error) {
      console.error("Error creating trade:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-white">Item Trade Feed</h1>

      {user ? (
        <div className="bg-purple-950 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Create New Trade</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newTrade.name}
              onChange={(e) => setNewTrade({ ...newTrade, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={newTrade.description}
              onChange={(e) => setNewTrade({ ...newTrade, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category"
              value={newTrade.category}
              onChange={(e) => setNewTrade({ ...newTrade, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Quantity"
              value={isNaN(newTrade.quantity) ? "" : newTrade.quantity}
              onChange={(e) => setNewTrade({ ...newTrade, quantity: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Price"
              value={isNaN(newTrade.price) ? "" : newTrade.price}
              onChange={(e) => setNewTrade({ ...newTrade, price: parseFloat(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <select
              value={newTrade.status}
              onChange={(e) => setNewTrade({ ...newTrade, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            onClick={handleSubmitTrade}
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600"
          >
            Create Trade
          </button>
        </div>
      ) : (
        <p className="text-center text-lg">You need to be signed in to create a trade.</p>
      )}

      <div className="bg-purple-950 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Active Trades</h2>
        <ul>
          {trades.map((trade) => (
            <li key={trade.id} className="mb-4 p-4 border-b border-gray-300">
              <div className="flex justify-between">
                <div className="text-lg font-semibold text-white">{trade.name}</div>
                <div className="text-sm text-gray-600">{trade.status}</div>
              </div>
              <p>{trade.description}</p>
              <p>Category: {trade.category}</p>
              <p>Quantity: {trade.quantity}</p>
              <p>Price: ${trade.price}</p>
              <p className="text-sm text-gray-500">Created by: {trade.user.firstName} {trade.user.lastName}</p>
              <p className="text-xs text-gray-400">Created at: {new Date(trade.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradingPage;

"use client";

import { useState } from "react";

function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const generateJoke = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error.message);
      return;
    }

    setLoading(false);
    // setPrompt("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    generateJoke(prompt);
  };

  return (
    <div className="bg-zinc-950 h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-zinc-900 p-10 w-3/12">
        <h1 className="text-2xl font-bold text-slate-200 mb-5">
          Programmer Jokes Generator
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Enter an programming language"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 rounded-md block bg-neutral-700 text-white w-full"
          value={prompt}
          autoFocus
        />
        <button
          type="submit"
          className="bg-green-500 p-2 rounded-md block mt-2 disabled:opacity-50 text-white"
          disabled={!prompt || loading}
        >
          {loading
            ? "Thinking..."
            : "Generate"
          }
        </button>
        {result && (
          <p className="text-xl font-bold text-white max-w-xs my-10">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

export default HomePage;

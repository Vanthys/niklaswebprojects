import { pipeline } from "@huggingface/transformers";
import { useEffect, useState } from "react";
import CodeInput from "../../components/CodeInput";

export default function SentimentAnalysis() {
  const [text, setText] = useState("I love this demo!");
  const [sentiment, setSentiment] = useState(null);
  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const cls = await pipeline("sentiment-analysis");
        setClassifier(() => cls);
      } catch (error) {
        console.error("Error loading pipeline", error);
      }
    }
    load();
  }, []);

  
  useEffect(() => {
    async function analyze() {
      if (classifier && text) {
        try {
          const sent = await classifier(text);
          setSentiment(sent);
        } catch (error) {
          console.error("Error analyzing", error);
        }
      }
      if (!text){
        setSentiment([])
      }
    }

    analyze();
  }, [text, classifier]);

  const renderSentimentCapsule = () => {
    if (!sentiment || sentiment.length === 0) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm">
          Analyzing...
        </div>
      );
    }

    const { label, score } = sentiment[0];
    const normalizedLabel = label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    const accuracy = Math.round(score * 100 * 100) / 100;
    const isPositive = normalizedLabel === "Positive";

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-shadow duration-300 hover:shadow-md ${
          isPositive 
            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
        }`}
      >
        {normalizedLabel} {accuracy}%
      </div>
    );
  };

  return (
    <>
      <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100">Sentiment Analyisis</h4>
      <p className="py-4 text-gray-700 dark:text-gray-300">This will perform sentiment analysis on the provided text using <a href="https://github.com/huggingface/transformers.js"><code>transformer.js</code></a>.</p>
      <CodeInput value={text} onChange={(e) => setText(e.target.value)} />
      {/* <p>{JSON.stringify(sentiment)}</p> */}
      <div className="mt-4">{renderSentimentCapsule()}</div>
    </>
  );
}
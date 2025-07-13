import { useState, useEffect } from "react";
import CodeInput from "../../components/CodeInput";
import Select from "../../components/Select";

export default function TokenizerComparison() {
  const [text, setText] = useState("Hello world! This is a test sentence, with a comma, and some long words like 'supercalifragilisticexpialidocious' and numbers 12345.");
  const [selectedTokenizer, setSelectedTokenizer] = useState(null);
  const [tokens, setTokens] = useState([]);

  const tokenizerOptions = [
    { id: '1', value: 'GPT-2 Tokenizer' },
    { id: '2', value: 'BERT Tokenizer' },
    { id: '3', value: 'T5 Tokenizer' },
    { id: '4', value: 'GPT-4 Tokenizer' },
    { id: '5', value: 'Claude Tokenizer' },
    { id: '6', value: 'SuperBPE Tokenizer' }
  ];

  useEffect(() => {
    if (tokenizerOptions.length > 0 && !selectedTokenizer) {
      const firstTokenizer = tokenizerOptions[0];
      setSelectedTokenizer(firstTokenizer);
      handleTokenizerChange(firstTokenizer);
    }
  }, [tokenizerOptions, selectedTokenizer]);

  const getTokenType = (word, tokenizer) => {

    if (!word || word.length === 0) {
      return 'normal';
    }

    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'];
    
    const specialTokens = {
      'BERT Tokenizer': ['[CLS]', '[SEP]', '[MASK]', '[PAD]', '[UNK]'],
      'T5 Tokenizer': ['<pad>', '</s>', '<unk>', '▁'],
      'GPT-4 Tokenizer': ['<|endoftext|>', '<|fim_prefix|>', '<|fim_middle|>', '<|fim_suffix|>'],
      'Claude Tokenizer': ['<|endoftext|>', '<|im_start|>', '<|im_end|>'],
      'SuperBPE Tokenizer': ['<|endoftext|>', '▁']
    };

    if (specialTokens[tokenizer]?.includes(word)) {
      return 'special-token';
    }

    if (/^\d+$/.test(word)) {
      return 'number';
    }

    if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(word)) {
      return 'punctuation';
    }

    if (/^[A-Z]/.test(word) && word.length > 1) {
      return 'proper-noun';
    }

    if (commonWords.includes(word.toLowerCase())) {
      return 'common-word';
    }

    if (word.length > 8) {
      return 'long-word';
    }

    if (word.length <= 2) {
      return 'short-word';
    }

    return 'normal';
  };

  const getTokenColor = (type) => {
    const colors = {
      'special-token': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
      'number': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
      'punctuation': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600',
      'proper-noun': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
      'common-word': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700',
      'long-word': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700',
      'short-word': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700',
      'normal': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600'
    };
    return colors[type] || colors['normal'];
  };

  const processTokens = (inputText, tokenizer) => {
    if (!inputText || !tokenizer) {
      return [];
    }

    let mockTokens = [];
    
    if (tokenizer.value === 'SuperBPE Tokenizer') {
      mockTokens = inputText.split(/\s+/).filter(word => word.length > 0).map((word, index) => {
        const type = getTokenType(word, tokenizer.value);
        return {
          id: index,
          text: word,
          type: type,
          tokenId: index + 1
        };
      });
    } else {
      const words = inputText.split(/\s+/).filter(word => word.length > 0);
      let tokenId = 1;
      mockTokens = words.flatMap((word, wordIndex) => {
        const type = getTokenType(word, tokenizer.value);
        
        if (word.length > 6 && type !== 'special-token') {
          const parts = word.match(/.{1,3}/g) || [word];
          return parts.map((part, partIndex) => ({
            id: `${wordIndex}-${partIndex}`,
            text: part,
            type: partIndex === 0 ? type : 'subword',
            tokenId: tokenId++
          }));
        } else {
          return [{
            id: wordIndex,
            text: word,
            type: type,
            tokenId: tokenId++
          }];
        }
      });
    }
    
    return mockTokens;
  };

  const handleTokenizerChange = (tokenizer) => {
    setSelectedTokenizer(tokenizer);
    const newTokens = processTokens(text, tokenizer);
    setTokens(newTokens);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    if (selectedTokenizer) {
      const newTokens = processTokens(newText, selectedTokenizer);
      setTokens(newTokens);
    }
  };

  const renderToken = (token) => {
    const colorClasses = getTokenColor(token.type);
    
    return (
      <span 
        key={token.id} 
        className={`inline-block px-2 py-1 mx-1 mb-2 rounded text-sm font-mono border ${colorClasses} hover:scale-105 transition-transform duration-200`}
        title={`Token ${token.tokenId}: ${token.type}`}
      >
        {token.text}
      </span>
    );
  };

  const getTokenStats = () => {
    if (tokens.length === 0) return null;
    
    const typeCounts = tokens.reduce((acc, token) => {
      acc[token.type] = (acc[token.type] || 0) + 1;
      return acc;
    }, {});
    
    const totalChars = tokens.reduce((sum, token) => sum + token.text.length, 0);
    const avgTokenLength = (totalChars / tokens.length).toFixed(1);
    
    return { typeCounts, totalChars, avgTokenLength };
  };

  const stats = getTokenStats();

  return (
    <>
      <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100">Tokenizer Comparison</h4>
      <p className="py-4 text-gray-700 dark:text-gray-300">
        Compare how different tokenizers break down text into tokens. Each tokenizer has its own vocabulary and tokenization strategy. 
      </p>
      
      <div className="space-y-6">
        <div>
          <Select 
            label="Tokenizer" 
            items={tokenizerOptions} 
            className="w-full"
            onChange={handleTokenizerChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Input Text
          </label>
          <CodeInput 
            value={text} 
            onChange={handleTextChange}
            placeholder="Enter text to tokenize..."
          />
        </div>

        {selectedTokenizer && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                Tokens {tokens.length > 0 ? `(${tokens.length} tokens)` : ''}
              </label>
              <div className="text-sm text-gray-600 dark:text-gray-400">
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md p-6 min-h-[200px]">
              {tokens.length > 0 ? (
                <>
                  <div className="flex flex-wrap">
                    {tokens.map(renderToken)}
                  </div>
                  
                  {stats && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Tokenizer</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{selectedTokenizer.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Token count</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{tokens.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Avg token length</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{stats.avgTokenLength}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Total characters</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{stats.totalChars}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Token types:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(stats.typeCounts).map(([type, count]) => (
                            <span 
                              key={type}
                              className={`px-2 py-1 rounded text-xs font-medium ${getTokenColor(type)}`}
                            >
                              {type}: {count}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                  <p className="text-lg">No tokens, input something</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

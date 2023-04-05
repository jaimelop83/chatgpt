import { useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userContent, setUserContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/chat", {
        prompt: userContent,
      });
      setMessages([...messages, response.data.data]);
      setUserContent("");
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const renderMessages = () => {
    if (loading) {
      return <p>loading</p>;
    }
    return messages.map((message, index) => (
      <p key={index}>{message}</p>
    ));
  };

  return (
    <div className="App">
      <h1>CHAT 5000</h1>
      {renderMessages()}
      <form onSubmit={handleSubmit}>
        <input
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
        />
        <button>{loading ? "loading" : "ask"}</button>
      </form>
    </div>
  );
}

export default App;

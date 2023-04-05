import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userContent, setUserContent] = useState("");
  const getDataDemo = async () => {
    try {
      setLoading(true);
      let res = await axios.get("http://localhost:8080/basic/test");
      setMessages([res.data.completion]);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // getDataDemo();
  }, []);

  const renderMessages = () => {
    if (loading) {
      return <p>loading</p>;
    }
    return <p>{JSON.stringify(messages)}</p>;
  };

  // post '/basic' => {message:{user:string, content:string}}
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    try {
      setLoading(true);
      let res = await axios.post("http://localhost:8080/chat", {
        message: { role: "user", content: userContent },
      });
      console.log(res);
      setMessages([res.data.completion]);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
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
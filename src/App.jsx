import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const url = "https://api.api-ninjas.com/v1/quotes?category=";
  const [qoutesData, setQoutes] = useState("")


  function getCatetory(){
    try {
      let allCategaries = ["Age", "Alone", "Amazing", "Anger", "Architecture", "Art", "Attitude", "Beauty", "Best", "Birthday",
      "Business", "Car", "Change", "Communication", "Computers", "Cool", "Courage", "Dad", "Dating", "Death",
      "Design", "Dreams", "Education", "Environmental", "Equality", "Experience", "Failure", "Faith", "Family",
      "Famous", "Fear", "Fitness", "Food", "Forgiveness", "Freedom", "Friendship", "Funny", "Future", "God",
      "Good", "Government", "Graduation", "Great", "Happiness", "Health", "History", "Home", "Hope", "Humor",
      "Imagination", "Inspirational", "Intelligence", "Jealousy", "Knowledge", "Leadership", "Learning", "Legal",
      "Life", "Love", "Marriage", "Medical", "Men", "Mom", "Money", "Morning", "Movies", "Success"]
      let randomeCatSelected= allCategaries[Math.floor(Math.random()*allCategaries.length)]
      return randomeCatSelected
    } catch (error) {
      console.log("Error",error)
    }
  }


  const handlerNextQoutes = async () => {
    try {
      let category = getCatetory()
      const response = await fetch(url + category, {
        method: "GET",
        headers: {
          "X-Api-Key": "2CZdXDRy2bWD7hl2hWlsLQ==UxovIPITpdlAWl0V",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQoutes(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    handlerNextQoutes()
  }, []);

 



  console.log(qoutesData);

  return (
    <div className="flex justify-center items-center h-screen bg-red-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl min-w-1/4 max-h-80 min-h-24">
      {qoutesData.length > 0 ? (
        <>
          <div className="text-lg font-semibold text-green-600"> " {qoutesData[0]?.quote} "</div>
          <div className="text-gray-600">{qoutesData[0]?.author}</div>
        </>
      ) : (
        <div className="text-blue-600">Loading...</div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        onClick={handlerNextQoutes}
      >
        New Quote
      </button>
    </div>
  </div>
  );
}

export default App;

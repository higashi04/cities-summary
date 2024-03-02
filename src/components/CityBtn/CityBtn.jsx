import React, { useState } from "react";
import "./CityBtn.css";

const CityBtn = ({ city, handleCitySet, handleAIresponse }) => {
  const [aiResponse, setAiResponse] = useState("");

  const handleClick = () => {
    handleCitySet(city);
    fetchFromOpenAi();
    handleAIresponse(aiResponse);
  };

  const fetchFromOpenAi = async () => {
    const prompt = `write a summary of ${city.city}, ${city.region}. Include data such as
        lifestyle and a quircky anecdote of the city.`;
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt,
          max_tokens: 210,
        }),
      });

      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      handleAIresponse(data.choices[0].text);
      setAiResponse(data.choices[0].text);
    } catch (error) {
      console.error(error);
      setAiResponse("Something is wrong with me.");
    }
  };

  return (
    <div className="m-3">
      <div
        className="btnCity"
        onClick={handleClick}
      >{`${city.city}, ${city.region}`}</div>
    </div>
  );
};

export default CityBtn;

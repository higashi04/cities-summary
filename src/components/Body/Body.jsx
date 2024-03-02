import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Body.css";

import ToastMessage from "../ToastMessage/ToastMessage";
import CityBtn from "../CityBtn/CityBtn";
import PromptText from "../PromptText/PromptText";

const Body = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [openAi, setOpenAi] = useState("");
  const [toastMessage, setToastMessage] = useState({});
  const [showToaster, setShowToaster] = useState(false);

  const fetchData = async () => {
    const data = await handleHttpRequest();
    setCities(data);
  };

  const handleSearchCityChange = (text) => {
    try {
      const inputValue = text;
      if (/[^a-zA-Z]/.test(inputValue)) {
        throw new Error("Search value must only contain letters.");
      }
      setSearchCity(inputValue);
    } catch (error) {
      const message = {
        type: "danger",
        title: "Error!",
        body: error.message,
      };
      setToastMessage(message);
      setShowToaster(true);
    }
  };

  const handleCitySet = (clickedCity) => {
    setCity(clickedCity);
  };

  const handleAIresponse = (openai) => {
    setOpenAi(openai);
  };

  useEffect(() => {
    if (searchCity.length === 0) {
      setCities([]);
      setCity(null);
      setOpenAi("");
    }
  }, [searchCity]);

  const handleHttpRequest = async () => {
    try {
      if(/[^a-zA-Z]/.test(document.getElementById("txtSearchCitiesBox").value)) {
        throw new Error("Search value must only contain letters.");
      }
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=us&namePrefix=${searchCity}&limit=10`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_GEO_CITIES_API,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      };
      if (searchCity.length < 3) {
        throw new Error(
          "you need to write at least three letters before searching for cities!"
        );
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw response;
      }
      const result = await response.json();

      if(result.data.length === 0) {
        throw new Error("Search returned no results.");
      }

      return result.data;
    } catch (error) {
      const message = {
        type: "danger",
        title: "Error!",
        body: error.message,
      };
      setToastMessage(message);
      setShowToaster(true);
      return [];
    }
  };

  return (
    <div className="body-container">
      <div className="container">
        <div className="input-group pt-2">
          <label className="input-group-text">Type an US city</label>
          <input
            type="text"
            id="txtSearchCitiesBox"
            className="form-control"
            onInput={(event) => handleSearchCityChange(event.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={fetchData}
            disabled={showToaster}
          >
            Search <BsSearch />
          </button>
        </div>
      </div>

      <div className="bodyGrid">
        {cities?.length > 0 &&
          cities.map((city) => (
            <CityBtn
              key={city.id}
              city={city}
              handleCitySet={(e) => handleCitySet(e)}
              handleAIresponse={(e) => handleAIresponse(e)}
            />
          ))}
      </div>
      {city && <PromptText text={openAi} city={city} />}
      <ToastMessage
        message={toastMessage}
        showToaster={showToaster}
        onToasterClose={(e) => {
          setShowToaster(e);
        }}
      />
    </div>
  );
};

export default Body;

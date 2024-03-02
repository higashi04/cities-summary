import React from "react";
import "./PromptText.css";

import MapBio from "../MapBio/MapBio";

const PromptText = ({ text, city }) => {
  return (
    <div id="promptContainer">
      <h3 id="promptTitle">
        {city?.city}, {city?.region}
      </h3>
      <div>
          <div className="row">
            <p id="promptParagraph" className="mt-2">
              {text}
            </p>
          </div>
          
          <div id="promptMapBoxElement" className="row">
            <MapBio lng={city?.longitude} lat={city?.latitude} />
          </div>
        </div>
    </div>
  );
};

export default PromptText;

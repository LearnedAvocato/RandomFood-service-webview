import React, { Component }  from 'react';

import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {

  const cardsNum = 30;
  var initialized = false;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    className: "center",
    centerPadding: "60px",
    slidesToShow: 5,
    adaptiveHeight: true,
    //initialSlide: 3,
    onReInit: () => {
      console.log("reInit");
      initialized = true;
    },
    onInit: async () => {
      console.log("init");
      //if (!initialized)
      //  return;

      try {
        var url = new URL("http://127.0.0.1:3001/getRandomFood"),
        params = {latitude:55.696233, longitude:37.570431, cardsNum:cardsNum, getTags:true}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result = await response.json();
  
        //console.log('result is: ', JSON.stringify(result, null, 4));

        var foodCards = result["foodCards"];
        for (var i = 0; i < foodCards.length; i++){
          var card = foodCards[i];
          var id = "food" + i.toString();
          var foodImg = document.getElementById(id);

          if (foodImg == null) {
            continue;
          }

          var imageUrl = card["imageUrl"];
          if (!imageUrl.includes("{w}")) {
            continue;
          } else {
            imageUrl = imageUrl.replace("{w}", "200");
            imageUrl = imageUrl.replace("{h}", "200");
            console.log("imageUrl: ", imageUrl);
            foodImg.src = imageUrl;  
          }
        /*
          var foodTitle = document.getElementById("title" + i.toString());
          if (foodTitle != null) {
            foodTitle.innerText = card["name"];
          }

          var foodDescription = document.getElementById("description" + i.toString());
          if (foodTitle != null) {
            foodDescription.innerText = card["description"];
          }
          */
        } 
      } catch (err) {
        console.log('err: ', err)
      }
    }
  }

  const renderSlides = () =>
  [...Array(cardsNum).keys()].map(num => (
  <div class="card">
    <img id={"food"+num.toString()}  src="src/avocat.svg" />
  </div>
  ));

  return (
    <div id="foodCarousel">
    <Slider {...settings}>{renderSlides()}</Slider>
  </div>
  );
}

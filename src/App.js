import React, { Component }  from 'react';

import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import yandexFoodIcon from './res/yandex_food.ico'

export default function App() {

  const cardsNum = 10;
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
          var foodImageWithDuplicates = document.getElementsByName("image" + i.toString());
          var foodTitleWithDuplicates = document.getElementsByName("title" + i.toString());
          var foodDescriptionWithDuplicates = document.getElementsByName("description" + i.toString());
          var foodUrlWithDuplicates = document.getElementsByName("url" + i.toString());
          for (var j = 0; j < foodImageWithDuplicates.length; j++) {
            var foodImg = foodImageWithDuplicates[j];
            if (foodImg != null) {            
              var imageUrl = card["imageUrl"];
              if (!imageUrl.includes("{w}")) {
                continue;
              } else {
                imageUrl = imageUrl.replace("{w}", "200");
                imageUrl = imageUrl.replace("{h}", "200");
                //console.log("imageUrl: ", imageUrl);
                foodImg.src = imageUrl;  
              }
            }
            var foodTitle = foodTitleWithDuplicates[j];
            if (foodTitle != null) {
              foodTitle.innerText = card["name"];
            }
            var foodDescription = foodDescriptionWithDuplicates[j];
            if (foodDescription != null) {
              foodDescription.innerText = card["description"];
            }
            var foodUrl = foodUrlWithDuplicates[j];
            if (foodUrl != null) {
              foodUrl.href = card["restarauntUrl"];
            }
          }
        }
      } catch (err) {
        console.log('err: ', err)
      }
    }
  }

  const renderSlides = () =>
  [...Array(cardsNum).keys()].map(num => (
    <Card style={{ width: '400px', height: '400px' }}>
      <Card.Img name={"image"+num.toString()} variant="top" src="" />
      <Card.Body>
        <Card.Title name={"title"+num.toString()}></Card.Title>
        <Card.Text name={"description"+num.toString()}>
        </Card.Text>
        <a name={"url"+num.toString()} href="" target="_blank">
          <Button variant="primary">
            <img src={yandexFoodIcon} style={{display: "inline-block"}} />
            <div style={{display: "inline-block", color: "#000000"}}>В ресторан!</div>
          </Button>
        </a>
      </Card.Body>
    </Card>
  ));

  return (
    <div id="foodCarousel">
    <Slider {...settings}>{renderSlides()}</Slider>
  </div>
  );
}

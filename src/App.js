import React, { Component }  from 'react';

import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import yandexFoodIcon from './res/yandex_food.ico';

const maxCardsNum = 30;
const leftCardsNumToRequestNew = 15;
const cardsNumToRequest = 10;
const cardsNumToPreloadBeforeFirst = 5;
var lastLoadedCardIdx = -1;
var processingCardRequest = false;

function CardIndicesToSet(last, num) {
  if (last + num > maxCardsNum) {
      return Array.from({length:maxCardsNum-last-1},(v,k)=>k+last+1).concat(Array.from({length:num+last-maxCardsNum+1},(v,k)=>k));
  } else {
      return Array.from({length:num},(v,k)=>k+last+1);
  }
}

async function RequestCards(cardsNum, defaultIndicesOffset = 0) {
  try {
    // var url = new URL("https://learned-avocato.ru/getRandomFood"),
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
    var indicesToSet;
    if (lastLoadedCardIdx < 0) {
      indicesToSet = CardIndicesToSet(maxCardsNum+1, foodCards.length);
      lastLoadedCardIdx = 0;
    } else {
      indicesToSet = CardIndicesToSet(lastLoadedCardIdx, foodCards.length);
    }
    lastLoadedCardIdx = (lastLoadedCardIdx + foodCards.length - 1) % maxCardsNum;

    // update to preload before first
    for (var i = 0; i < indicesToSet.length; i++){
        indicesToSet[i] = (indicesToSet[i] - defaultIndicesOffset + maxCardsNum) % maxCardsNum;
    }
    lastLoadedCardIdx = (lastLoadedCardIdx - defaultIndicesOffset + maxCardsNum) % maxCardsNum;
    
    for (var i = 0; i < foodCards.length; i++){
      var card = foodCards[i];
      var foodImageWithDuplicates = document.getElementsByName("image" + indicesToSet[i].toString());
      var foodTitleWithDuplicates = document.getElementsByName("title" + indicesToSet[i].toString());
      var foodDescriptionWithDuplicates = document.getElementsByName("description" + indicesToSet[i].toString());
      var foodUrlWithDuplicates = document.getElementsByName("url" + indicesToSet[i].toString());
      var foodPriceWithDuplicates = document.getElementsByName("price" + indicesToSet[i].toString());
      var foodRestarauntNameWithDuplicates = document.getElementsByName("restarauntName" + indicesToSet[i].toString());
      for (var j = 0; j < foodImageWithDuplicates.length; j++) {
        var foodImg = foodImageWithDuplicates[j];
        if (foodImg != null) {            
          var imageUrl = card["imageUrl"];
          if (!imageUrl.includes("{w}")) {
            continue;
          } else {
            imageUrl = imageUrl.replace("{w}", "200");
            imageUrl = imageUrl.replace("{h}", "200");
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
        var foodPrice = foodPriceWithDuplicates[j];
        if (foodPrice != null) {
          foodPrice.innerText = card["price"] + " \u20bd";
        }
        var foodRestarauntName = foodRestarauntNameWithDuplicates[j];
        if (foodRestarauntName != null) {
          foodRestarauntName.innerText = card["restarauntName"];
        }
      }
    }
  } catch (err) {
    console.log('err: ', err)
  }
  processingCardRequest = false;
}

export default function App() {
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
    onInit: () => RequestCards(maxCardsNum, cardsNumToPreloadBeforeFirst),
    afterChange: index => {
      var indexWithOffset = lastLoadedCardIdx - index;
      if (indexWithOffset < 0) {
        indexWithOffset = indexWithOffset + maxCardsNum;
      }
      if (!processingCardRequest && indexWithOffset <= leftCardsNumToRequestNew) {
        RequestCards(cardsNumToRequest);
        processingCardRequest = true;
      }
    }
  }

  const renderSlides = () =>
  [...Array(maxCardsNum).keys()].map(num => (
    <Card style={{ width: '400px', height: '400px' }}>
      <Card.Img name={"image"+num.toString()} variant="top" src="" />
      <Card.Body>
        <Card.Title name={"title"+num.toString()}></Card.Title>
        <Card.Text name={"description"+num.toString()} > 
        </Card.Text>
         <Card.Subtitle name={"price"+num.toString()}> </Card.Subtitle>
        <a name={"url"+num.toString()} href="" target="_blank">
          <Button variant="primary">
            <div style={{display: "inline-block", color: "#000000"}}>В ресторан!</div>
          </Button>
        </a>
      </Card.Body>
      <Card.Footer className="text-muted" name={"restarauntName"+num.toString()}></Card.Footer>
    </Card>
  ));

  return (
    <div id="foodCarousel">
    <Slider {...settings}>{renderSlides()}</Slider>
  </div>
  );
}

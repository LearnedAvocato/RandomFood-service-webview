import React, { Component }  from 'react';

import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {

  //onInit = () => {
  //  console.log('test')
  //}

  /*
  const onInit = async () => {
    try {
      var url = new URL("http://127.0.0.1:3001/getRandomFood"),
      params = {latitude:55.696233, longitude:37.570431}
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

      console.log('result is: ', JSON.stringify(result, null, 4));

      //setData(result);
    } catch (err) {
      console.log('err: ', err)
    }
  };
  */


  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    //responsive: [
    //  {
    //    breakpoint: 600,
    //    settings: {
    //      variableWidth: false,
    //      centerMode: false
    //    }
    //  }
    //],
    onInit: async () => {
      try {
        var url = new URL("http://127.0.0.1:3001/getRandomFood"),
        params = {latitude:55.696233, longitude:37.570431}
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

          var foodTitle = document.getElementById("title" + i.toString());
          if (foodTitle != null) {
            foodTitle.innerText = card["name"];
          }

          var foodDescription = document.getElementById("description" + i.toString());
          if (foodTitle != null) {
            foodDescription.innerText = card["description"];
          }
        } 
  
        //setData(result);
      } catch (err) {
        console.log('err: ', err)
      }
    }
    //onInit: onInit()
  }

  // const renderSlides = () =>
  //   [0, 1, 2, 3, 4].map(num => (
  //     <div>
  //       <figure>
  //       <img id={"food"+num.toString()} src="src/avocat.svg" />
  //       <figcaption id={"title"+num.toString()} ></figcaption>
  //     </figure>  
  //     </div>
  //   ));

  //     <div class="card">
  //   <img src="img_avatar.png" alt="Avatar" style="width:100%">
  //   <div class="container">
  //     <h4><b>HTML CSS</b></h4>
  //     <p>Architect & Engineer</p>
  //   </div>
  // </div>

  const renderSlides = () =>
  [0, 1, 2, 3, 4].map(num => (
  <div class="card">
    <img id={"food"+num.toString()}  src="src/avocat.svg" />
    <div class="container">
      <h4 id={"title"+num.toString()}></h4>
      <p id={"description"+num.toString()}></p>
    </div>
  </div>
  ));

  return (
    <div id="foodCarousel">
    <Slider {...settings}>{renderSlides()}</Slider>
  </div>
  );
      /*
      <div>
      <img id="food2" src="http://placekitten.com/g/200/200" />
      </div>
      <div>
      <img id="food3" src="http://placekitten.com/g/200/200" />
      </div>
      <div>
      <img id="food4" src="http://placekitten.com/g/200/200" />
      </div>
      <div>
      <img id="food5" src="http://placekitten.com/g/200/200" />
      </div>
      */
/*  
  return (
    <div className="container" id="foodCarousel">
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "red" }}>1</div>
        </div>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "blue" }}>2</div>
        </div>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "yellow" }}>3</div>
        </div>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "green" }}>4</div>
        </div>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "brown" }}>5</div>
        </div>
        <div style={{ width: 600 }}>
          <div style={{ height: 400, background: "pink" }}>6</div>
        </div>
      </Slider>
    </div>
  );
  */
}

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

/*
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    */
    //responsive: [
    //  {
    //    breakpoint: 600,
    //    settings: {
    //      variableWidth: false,
    //      centerMode: false
    //    }
    //  }
    //],
    /*
    onInit: async () => {
      try {
        var url = new URL("http://127.0.0.1:3001/getRandomFood"),
        params = {latitude:55.696233, longitude:37.570431, cardsNum:10, getTags:true}
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
    */
    //onInit: onInit()
  //}

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
  //   <img src="img_avatar.png" alt="Avatar" style="width:100">
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

  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    className: "center",
    centerPadding: "60px",
    slidesToShow: 3
  };

  return (
     <div>
      <h2>;Center Mode</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>

    /*
    <div id="foodCarousel">
    <Slider {...settings}>{renderSlides()}</Slider>
  </div>
  */
 /*
  <div>
  <h2>Center Mode</h2>
  <div class="slick-slider center slick-initialized" dir="ltr"><button type="button" data-role="none"
      class="slick-arrow slick-prev" style={{display: 'block'}}>
    </button>
    <div class="slick-list" style={{paddingTop: 0, paddingRight: 60}}>
      <div class="slick-track"
        style={{width: 2752, opacity: 1, transform: 'translate3d(-860, 0, 0)'}}>
        <div data-index="-4" tabindex="-1" class="slick-slide slick-center slick-cloned"
          aria-hidden="true" style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>3</h3>
            </div>
          </div>
        </div>
        <div data-index="-3" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>4</h3>
            </div>
          </div>
        </div>
        <div data-index="-2" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>5</h3>
            </div>
          </div>
        </div>
        <div data-index="-1" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>6</h3>
            </div>
          </div>
        </div>
        <div data-index="0" class="slick-slide" tabindex="-1" aria-hidden="true"
          style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>1</h3>
            </div>
          </div>
        </div>
        <div data-index="1" class="slick-slide slick-active" tabindex="-1" aria-hidden="false"
          style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>2</h3>
            </div>
          </div>
        </div>
        <div data-index="2" class="slick-slide slick-active slick-center slick-current" tabindex="-1"
          aria-hidden="false" style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>3</h3>
            </div>
          </div>
        </div>
        <div data-index="3" class="slick-slide slick-active" tabindex="-1" aria-hidden="false"
          style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>4</h3>
            </div>
          </div>
        </div>
        <div data-index="4" class="slick-slide" tabindex="-1" aria-hidden="true"
          style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>5</h3>
            </div>
          </div>
        </div>
        <div data-index="5" class="slick-slide" tabindex="-1" aria-hidden="true"
          style={{outline: 'current-color none medium', width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>6</h3>
            </div>
          </div>
        </div>
        <div data-index="6" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>1</h3>
            </div>
          </div>
        </div>
        <div data-index="7" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>2</h3>
            </div>
          </div>
        </div>
        <div data-index="8" tabindex="-1" class="slick-slide slick-center slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>3</h3>
            </div>
          </div>
        </div>
        <div data-index="9" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>4</h3>
            </div>
          </div>
        </div>
        <div data-index="10" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>5</h3>
            </div>
          </div>
        </div>
        <div data-index="11" tabindex="-1" class="slick-slide slick-cloned" aria-hidden="true"
          style={{width: 172}}>
          <div>
            <div tabindex="-1" style={{width: 100, display: 'inline-block'}}>
              <h3>6</h3>
            </div>
          </div>
        </div>
      </div>
    </div><button type="button" data-role="none" class="slick-arrow slick-next" style={{display: 'block'}}>
    </button>
  </div>
</div>*/
  );

}

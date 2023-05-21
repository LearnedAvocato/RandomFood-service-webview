import React, { useState, useEffect } from 'react';
import "./styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

const maxCardsNum = 30;
const leftCardsNumToRequestNew = 15;
const cardsNumToRequest = 15;
const cardsNumToPreloadBeforeFirst = 6;

const useSyncState = (initialValue) => {
  const stateRef = useRef(initialValue);

  const getState = () => stateRef.current;

  const setState = (newValue) => {
    stateRef.current = newValue;
  };

  return [getState, setState];
};

const App = () => {
  const [getUserLatitude, setUserLatitude] = useSyncState(55.696233);
  const [getUserLongitude, setUserLongitude] = useSyncState(37.570431);
  const [getLastLoadedCardIdx, setLastLoadedCardIdx] = useSyncState(-1);
  const [getProcessingCardRequest, setProcessingCardRequest] = useSyncState(false);
  const [getRequestAllCardsOnSetLocation, setRequestAllCardsOnSetLocation] = useSyncState(false);

  useEffect(() => {
    setLocation();
  }, []);

  const cardIndicesToSet = (last, num) => {
    if (last + num > maxCardsNum) {
      return Array.from({ length: maxCardsNum - last - 1 }, (v, k) => k + last + 1).concat(Array.from({ length: num + last - maxCardsNum + 1 }, (v, k) => k));
    } else {
      return Array.from({ length: num }, (v, k) => k + last + 1);
    }
  };

  const requestCards = async (cardsNum, defaultIndicesOffset = 0) => {
    try {
      const url = new URL("https://learned-avocato.ru/getRandomFood");
      const params = { latitude: getUserLatitude(), longitude: getUserLongitude(), cardsNum: cardsNum };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

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
      const foodCards = result["foodCards"];

      if (foodCards == null) {
        toast.warn('Нет ресторанов поблизости');
        console.log('Food data is not available');
        setProcessingCardRequest(false);
        return;
      } else {
        processFoodResponse(foodCards, defaultIndicesOffset);
      }
    } catch (err) {
      setProcessingCardRequest(false);
      console.log('err:', err);
    }
  };

  const processFoodResponse = (foodCards, defaultIndicesOffset) => {
    const indicesToSet = getLastLoadedCardIdx() < 0
      ? cardIndicesToSet(maxCardsNum + 1, foodCards.length)
      : cardIndicesToSet(getLastLoadedCardIdx(), foodCards.length);

    setLastLoadedCardIdx((getLastLoadedCardIdx() + foodCards.length - 1) % maxCardsNum);

    const updatedIndicesToSet = indicesToSet.map(index => (index - defaultIndicesOffset + maxCardsNum) % maxCardsNum);
    setLastLoadedCardIdx((getLastLoadedCardIdx() - defaultIndicesOffset + maxCardsNum) % maxCardsNum);

    for (let i = 0; i < foodCards.length; i++) {
      const indexToSet = updatedIndicesToSet[i];
      setFoodCard(indexToSet, foodCards[i]);
    }

    setProcessingCardRequest(false);
  };

  function setLocation() {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "prompt") {
            console.log("Geolocation permission prompted");
            requestCards(maxCardsNum, cardsNumToPreloadBeforeFirst);
            setRequestAllCardsOnSetLocation(false);
          } else {
            setRequestAllCardsOnSetLocation(true);
            if (result.state !== "granted") {
              toast.warn(
                "Предоставьте доступ к местоположению для получения актуальных данных"
              );
              requestCards(maxCardsNum, cardsNumToPreloadBeforeFirst);
            }
          }
        })
        .catch((error) => {
          console.error("Error checking geolocation permission:", error);
          toast.warn(
            "Предоставьте доступ к местоположению для получения актуальных данных"
          );
          requestCards(maxCardsNum, cardsNumToPreloadBeforeFirst);
        });
  
      navigator.geolocation.getCurrentPosition(
        onSetLocationSuccess,
        onSetLocationFailure
      );
    } else {
      requestCards(maxCardsNum, cardsNumToPreloadBeforeFirst);
      console.log("Unable to set location");
      toast.warn(
        "Предоставьте доступ к местоположению для получения актуальных данных"
      );
    }
  }  

  const onSetLocationSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  
    setProcessingCardRequest(true);
    if (getRequestAllCardsOnSetLocation()) {
      requestCards(maxCardsNum, cardsNumToPreloadBeforeFirst)
    } else {
      setLastLoadedCardIdx(-1)
      requestCards(cardsNumToRequest, 5)
      toast.success('Местоположение и блюда обновлены');
    }
  
    console.log('Set location successfully');
  }

  const onSetLocationFailure = () => {
    toast.error('Не удалось получить геопозицию');
    console.log('Error getting user location');
  };

  const setFoodCard = (index, foodCardData) => {
    const foodImageWithDuplicates = document.getElementsByName(`image${index}`);
    const foodTitleWithDuplicates = document.getElementsByName(`title${index}`);
    const foodDescriptionWithDuplicates = document.getElementsByName(`description${index}`);
    const foodUrlWithDuplicates = document.getElementsByName(`url${index}`);
    const foodPriceWithDuplicates = document.getElementsByName(`price${index}`);
    const foodRestarauntNameWithDuplicates = document.getElementsByName(`restarauntName${index}`);
  
    for (let j = 0; j < foodImageWithDuplicates.length; j++) {
      const foodImg = foodImageWithDuplicates[j];
      if (foodImg) {
        let imageUrl = foodCardData.imageUrl;
        if (imageUrl.includes("{w}")) {
          imageUrl = imageUrl.replace("{w}", "200").replace("{h}", "200");
          foodImg.src = imageUrl;
        }
      }
  
      const foodTitle = foodTitleWithDuplicates[j];
      if (foodTitle) {
        foodTitle.innerText = foodCardData.name;
      }
  
      const foodDescription = foodDescriptionWithDuplicates[j];
      if (foodDescription && foodCardData.description) {
        foodDescription.innerText = foodCardData.description;
      }
  
      const foodUrl = foodUrlWithDuplicates[j];
      if (foodUrl) {
        foodUrl.href = foodCardData.restarauntUrl;
      }
  
      const foodPrice = foodPriceWithDuplicates[j];
      if (foodPrice && foodCardData.price) {
        foodPrice.innerText = `${foodCardData.price} \u20bd`;
      }
  
      const foodRestarauntName = foodRestarauntNameWithDuplicates[j];
      if (foodRestarauntName) {
        foodRestarauntName.innerText = foodCardData.restarauntName;
      }
    }
  };

  const renderSlides = () =>
    [...Array(maxCardsNum).keys()].map(num => (
      <Card style={{ width: '400px', height: '400px' }}>
        <Card.Img name={"image" + num.toString()} variant="top" src="" />
        <Card.Body>
          <Card.Title name={"title" + num.toString()}></Card.Title>
          <Card.Text name={"description" + num.toString()}></Card.Text>
          <Card.Subtitle name={"price" + num.toString()}></Card.Subtitle>
          <a name={"url" + num.toString()} href="" target="_blank">
            <Button variant="primary">
              <div
                style={{ display: 'inline-block', color: '#000000' }}
              >
                В ресторан!
              </div>
            </Button>
          </a>
        </Card.Body>
        <Card.Footer
          className="text-muted"
          name={"restarauntName" + num.toString()}
        ></Card.Footer>
      </Card>
    ));

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    className: 'center',
    centerPadding: '60px',
    slidesToShow: 5,
    adaptiveHeight: true,
    afterChange: index => {
      let indexWithOffset = getLastLoadedCardIdx() - index;
      if (indexWithOffset < 0) {
        indexWithOffset += maxCardsNum;
      }
      if (!getProcessingCardRequest() && indexWithOffset <= leftCardsNumToRequestNew) {
        requestCards(cardsNumToRequest);
        setProcessingCardRequest(true);
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div id="foodCarousel">
      <Slider {...settings}>{renderSlides()}</Slider>
      <ToastContainer />
    </div>
  );
};

export default App;

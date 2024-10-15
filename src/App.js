import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MapComponent from './MapComponent';

// styled-components 정의
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const MapContainer = styled.div`
  width: 85%;
  height: 600px;
`;

function App() {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 사용자의 위치를 가져옵니다.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const handleCenterOnUser = () => {
    if (userLocation) {

    }
  };

  return (
    <Container>
      <MapContainer>
        <MapComponent 
          markers={places.map(place => ({
            lat: parseFloat(place.mapy) / 10000000,
            lng: parseFloat(place.mapx) / 10000000,
          }))}
          userLocation={userLocation}
          onCenterUser={handleCenterOnUser}
        />
      </MapContainer>
    </Container>
  );
}

export default App;
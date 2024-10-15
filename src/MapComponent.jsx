import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Container as MapDiv,
    NavermapsProvider,
    NaverMap,
    Marker,
    useNavermaps,
} from "react-naver-maps";
import styled from "styled-components";

const CenterButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background-color: white;
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 1000;
`;

const Message = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 4px;
    z-index: 1000;
`;

const UserMarker = ({ position }) => {
    const navermaps = useNavermaps();
    return (
        <Marker
            position={position}
            icon={{
                content: `
                    <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #4285F4; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,.3);">
                        
                    </div>
                `,
                anchor: new navermaps.Point(15, 15),
            }}
        />
    );
};

const MapComponent = ({ markers }) => {
    const [userLocation, setUserLocation] = useState(null);
    const mapRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const watchIdRef = useRef(null);

    const getUserLocation = useCallback(() => {
        if ("geolocation" in navigator) {
            setMessage("위치 정보를 가져오는 중...");
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setIsLoading(false);
                    setMessage("");
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setIsLoading(false);
                    setMessage(
                        "위치 정보를 가져오는데 실패했습니다. 위치 서비스가 활성화되어 있는지 확인해주세요."
                    );
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setMessage("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getUserLocation();
        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, [getUserLocation]);

    const handleCenterOnUser = useCallback(() => {
        if (mapRef.current && userLocation) {
            const navermaps = window.naver.maps;
            mapRef.current.setCenter(
                new navermaps.LatLng(userLocation.lat, userLocation.lng)
            );
            mapRef.current.setZoom(15);
        } else {
            getUserLocation();
        }
    }, [userLocation, getUserLocation]);

    return (
        <NavermapsProvider
            ncpClientId={"13lmt62yuw"}
            error={<p>네이버 지도를 불러오는데 실패했습니다.</p>}
            loading={<p>네이버 지도를 불러오는 중입니다...</p>}
        >
            <MapDiv
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                }}
            >
                <NaverMap
                    mapDivId={"naver-map"}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    defaultCenter={userLocation}
                    defaultZoom={13}
                    ref={mapRef}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    ))}
                    {userLocation && <UserMarker position={userLocation} />}
                </NaverMap>
                <CenterButton onClick={handleCenterOnUser}>
                    내 위치
                </CenterButton>
                {message && <Message>{message}</Message>}
            </MapDiv>
        </NavermapsProvider>
    );
};

export default MapComponent;

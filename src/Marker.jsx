import React from "react";

const Marker = ({ lat, lng, title }) => (
    <div
        style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
        }}
        lat={lat}
        lng={lng}
    >
        <div
            style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "red",
            }}
        />
        <div
            style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                fontSize: "12px",
                padding: "2px",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "2px",
            }}
        >
            {title}
        </div>
    </div>
);

export default Marker;

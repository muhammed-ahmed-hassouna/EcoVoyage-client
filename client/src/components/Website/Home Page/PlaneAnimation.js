import React from 'react';

const PlaneAnimation = () => {
    return (
        <>
            <style>
                {`
          body {
            margin: 0;
            overflow: hidden scroll
          }

          .spline-viewer-container {
            position: absolute;
            top: 50%;
            width: 400px; /* Adjust the width as needed */
            height: 400px; /* Adjust the height as needed */
            transform: translate(-50%, -50%);
            animation: moveLeft 5s linear infinite;
            pointer-events: none;
          }

          @keyframes moveLeft {
            0% {
              left: 200%;
            }
            50% {
              left: 100%;
            }
            75% {
              left: 50%;
            }
            100% {
              left: -20%;
            }
          }
        `}
            </style>

            <div className="spline-viewer-container">
                <spline-viewer url="https://prod.spline.design/6jvX-osL-iEjDKGh/scene.splinecode"></spline-viewer>
            </div>
        </>
    );
};

export default PlaneAnimation;

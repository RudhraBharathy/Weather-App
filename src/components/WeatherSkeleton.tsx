import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="rgb(225 139 161 / 26%)" highlightColor="#efefef">
      <div className="weather-card">
        <h2 className="cityname">
          <Skeleton width={200} height={30} />
        </h2>
        <h3 className="temprature-value">
          <Skeleton width={100} height={60} />
        </h3>
        <div className="humidity-speed-icon-desc">
          <div className="humidity-speed">
            <p className="humidity">
              <Skeleton width={120} />
            </p>
            <p className="speed">
              <Skeleton width={80} />
            </p>
          </div>
          <div>
            <div className="weather-icon-desc-container">
              <p className="weather-icon-desc">
                <Skeleton width={100} height={30} />
              </p>
            </div>
            <p className="cloudspercent">
              <Skeleton width={80} style={{ marginTop: "1.4rem" }} />
            </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default WeatherSkeleton;

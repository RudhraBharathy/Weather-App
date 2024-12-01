import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherForecastSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="rgb(225 139 161 / 26%)" highlightColor="#efefef">
      <div className="daywiseforecast">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="weekly-weather">
            <Skeleton width={50} height={20} />
            <Skeleton width={40} height={40} circle={true} />
            <Skeleton width={40} height={20} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default WeatherForecastSkeleton;

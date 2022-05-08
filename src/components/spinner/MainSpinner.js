import React from "react";
import { BallTriangle } from  'react-loader-spinner';

const MainSpinner = () => {
  const style = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 50,
    cursor: 'pointer'
  }

  return (
    <div>
      <BallTriangle wrapperStyle={{justifyContent: "center", zIndex: 51}} color="#00BFFF" height={100} width={100} />
      <div style={style}></div>
    </div>
  );
};

export default MainSpinner;

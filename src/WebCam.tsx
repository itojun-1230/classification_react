import { useRef, useState } from "react";
import Webcam from "react-webcam";

export const WebCam = (props: {
  imgSrc: string | undefined,
  setImgSrc: React.Dispatch<React.SetStateAction<string | undefined>>,
  Classification: (src: string) => void
}) => {
  const [facingMode, setFacingMode] = useState<ConstrainDOMString>("user");
  const webcamRef = useRef<Webcam>(null);

  const changeCam = () => {
    setFacingMode(facingMode == "user" ? { exact: "environment" } : "user");
  }

  const capture = () => {
    const ImageSrc = webcamRef.current!.getScreenshot();
    if (ImageSrc) {
      props.setImgSrc(ImageSrc);
      props.Classification(ImageSrc);
    }
  }

  return (
    <>
      {props.imgSrc ? (
        <>
          <button onClick={() => props.setImgSrc(undefined)}>リセット</button >
          <img
            src={props.imgSrc}
            width={200}
            height={200}
          />
        </>
      ) : (
        <>
          <button onClick={changeCam}>カメラ切り替え</button >
          <Webcam
            ref={webcamRef}
            audio={false}
            width={200}
            height={200}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 200,
              height: 200,
              facingMode
            }}
          />
          <button onClick={capture}>撮影</button>
        </>
      )}
    </>
  )
}
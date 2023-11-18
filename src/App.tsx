import { useEffect, useRef, useState } from 'react'
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import Webcam from 'react-webcam';
import { WebCam } from './WebCam';

type resultType = {
  className: string,
  probablity: number
}

export const App = () => {

  const [net, setNet] = useState<mobilenet.MobileNet>();
  const [imgSrc, setImgSrc] = useState<string>();
  const [result, setResult] = useState<resultType>();


  useEffect(() => { //初期実行時二回実行されるが、問題なし
    if( tf.getBackend() ) { //すでにバックエンドが定義されている場合、return
      return;
    }
    const initLoad = async () => {
      tf.setBackend("cpu"); //バックエンドをcpuに定義

      console.log("Loading mobilenet...");
      const MobileNet: mobilenet.MobileNet = await mobilenet.load(); //モデル読み込み
      setNet(MobileNet);  //モデルをStateに保存
      console.log("Successfully loaded model");
    };
    initLoad();
  }, []);

  const Classification = () => {

  }

  return (
    <>
      { net ? (
        <>
          <WebCam imgSrc={imgSrc} setImgSrc={setImgSrc} Classification={Classification} />
        </>
      ) : (
        <>
        <p>Now Loading...</p>
        </>
      )
    }
    </>
  )
}
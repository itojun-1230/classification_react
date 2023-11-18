import { useEffect, useState } from 'react'
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { WebCam } from './WebCam';
import { Result, resultType } from './Result';

import style from "./app.module.css"

export const App = () => {

  const [net, setNet] = useState<mobilenet.MobileNet>();
  const [imgSrc, setImgSrc] = useState<string>();
  const [result, setResult] = useState<resultType[]>([]);


  useEffect(() => { //初期実行時二回実行されるが、問題なし
    if (tf.getBackend()) { //すでにバックエンドが定義されている場合、return
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

  const Classification = (src: string) => {
    //img要素を作成し、srcに代入
    let imageElem = document.createElement('img');

    imageElem.onload = async () => {
      //分類実行
      setResult(await net!.classify(imageElem));
    }
    imageElem.src = src!;
  }

  return (
    <>
      {net ? (
        <div className={style.main_div}>
          <div className={style.content}>
            <WebCam 
              imgSrc={imgSrc} setImgSrc={setImgSrc}
              setResult={setResult}   
              Classification={Classification}
            />
          </div>
          <div className={style.content}>
            <Result result={result}/>
          </div>
        </div>
      ) : (
        <>
          <p>Now Loading...</p>
        </>
      )
      }
    </>
  )
}
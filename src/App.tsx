import { useEffect, useState } from 'react'
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

export const App = () => {

  const [net, setNet] = useState<mobilenet.MobileNet>();

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

  return (
    <>
      { !net ? (
        <>
          <p>Now Loading...</p>
        </>
      ) : (
        <>
          <p>Ready</p>
        </>
      )
    }
    </>
  )
}
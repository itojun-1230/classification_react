import style from "./app.module.css";

export type resultType = {
  className: string,
  probability: number
}

export const Result = (props: {
  result: resultType[]
}) => {
  return (
    <>
      {props.result.length > 0 && props.result.map(e => (
        <div key={e.className} className={style.result}>
          <p>{e.className}</p>
          <span>{parseFloat((e.probability * 100).toFixed(5))} % 類似</span>
        </div>
      ))}
    </>
  )
}
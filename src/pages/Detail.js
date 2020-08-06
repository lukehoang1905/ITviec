import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const apiAddress = process.env.REACT_APP_SEVER_URL;

export default function Detail({ props }) {
  //param is a mandatory value
  let { id } = useParams();
  const [job, setJob] = useState(null);

  let getDetailData = async () => {
    let url = `${apiAddress}/jobs/${id}`; //alerat
    let response = await fetch(url);
    let data = await response.json();
    setJob(data);
    console.log(data);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  if (job == null) {
    return (
      <>
        <h1>"loading..."</h1>
        <img
          src="https://thumbs.gfycat.com/ArcticCharmingHeterodontosaurus-max-1mb.gif"
          alt="loading"
        />
      </>
    );
  }
  return (
    <>
      <h1>{job.title}</h1>
      <h2>this is id: {id} </h2>
      <h4>detail: {job.description}</h4>
    </>
  );
}

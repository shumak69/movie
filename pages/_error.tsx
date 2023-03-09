import React from "react";

export async function getServerSideProps(context: any) {
  return {
    props: { value: "x-error" }, // will be passed to the page component as props
  };
}

function Error({ statusCode }: any) {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</p>;
}

export default Error;

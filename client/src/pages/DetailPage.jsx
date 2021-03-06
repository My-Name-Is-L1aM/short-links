import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LinkCard } from "../components/LinkCard";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { api } from "../api";

export function DetailPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [ link, setLink ] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await api.links.goForLink(linkId, token);

      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink()
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  );
}
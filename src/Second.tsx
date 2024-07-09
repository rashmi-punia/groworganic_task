import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetch from "./Fetch";
import Sidebar from "./Sidebar";

interface Data {
  useId: number;
  id: number;
  title: string;
  body: string;
}

const Second: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string | null>(null);
  const [posts, setPosts] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!res.ok) {
          setError("Failed to fetch data");
        }

        console.log(res);
        const data: Data[] = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const loginDetails = localStorage.getItem("userDetail");
    if (!loginDetails) {
      setMsg("First you must register to proceed further");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate]);

  console.log(msg);

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        {msg ? (
          <Typography>{msg}</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap:3 }}>
                <Sidebar />
              {loading && <CircularProgress />}
              {error && <Alert severity="error">{error}</Alert>}

              <Fetch posts={posts} />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default Second;

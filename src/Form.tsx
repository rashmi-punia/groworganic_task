import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Form:React.FC = () => {
    const [userData,setUserData] = useState({
        name:'',
        email:'',
        phoneNumber:''
    });
    const navigate = useNavigate()


    const handleSubmit= (e: React.FormEvent) =>{
        e.preventDefault();

        localStorage.setItem('userDetail',JSON.stringify(userData))
navigate('/second')
    }

  return (
    <Container maxWidth="sm" sx={{height:'100vh',width:"100%", display:'flex',alignItems:'center'}}>
      <Box sx={{boxShadow:3 , padding:5}} onSubmit={handleSubmit} >
        <Typography variant="h3" component="h1" gutterBottom>
          Fill details
        </Typography>
        <TextField
          label="Name"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          value={userData.email}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={userData.phoneNumber}
          onChange={(e) =>
            setUserData((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }
          fullWidth
          inputProps={{ maxLength: 10 }}
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default Form
